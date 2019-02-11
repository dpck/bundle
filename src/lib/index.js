import { dirname, join, relative } from 'path'
import { read, write, ensurePath } from '@wrote/wrote'
import transpileJSX from '@a-la/jsx'
import detect from '@depack/detect'
import { collect } from 'catchment'
import { c } from 'erte'
import resolveDependency from 'resolve-dependency'
import findPackageJson from 'fpj'
import BundleTransform from './BundleTransform'
import { checkIfLib } from './lib'

export const processFile = async (entry, config, cache) => {
  const { cachedNodeModules, cachedFiles } = cache
  const { tempDir, preact } = config
  const source = await read(entry)
  const isJSX = entry.endsWith('.jsx')

  const dir = relative('', dirname(entry))
  const to = join(tempDir, dir)
  const bt = new BundleTransform(entry, to)

  const T = preact && isJSX ? addPreact(source) : source
  bt.end(T)
  const transformed = await collect(bt)
  const transpiled = isJSX ? transpile(source, entry): transformed
  const tto = join(tempDir, entry)
  await ensurePath(tto)

  await write(tto, transpiled)

  // now deal with dependencies
  const depPaths = bt.deps
    .map(d => join(dir, d))
    .filter(d => !(d in cachedFiles))
  const nodeModules = bt.nodeModules
    .filter(d => !(d in cachedNodeModules))

  nodeModules.forEach(nm => { cachedNodeModules[nm] = 1 })
  depPaths.forEach(dp => { cachedFiles[dp] = 1 })

  await depPaths.reduce(async (acc, depPath) => {
    await acc
    await processFile(depPath, config, cache)
  }, {})

  await nodeModules.reduce(async (acc, nodeModule) => {
    await acc
    await processNodeModule(nodeModule, config, cache)
  }, {})
}

const addPreact = (source) => {
  return `import { h } from 'preact'
${source}`
}

const transpile = async (source, entry) => {
  return await transpileJSX(source, {
    quoteProps: 'dom',
    warn(message) {
      console.warn(c(message, 'yellow'))
      console.log(entry)
    },
  })
}

/**
 * This will ensure that JSX files referenced in the node_module dependency get transpiled first.
 */
const processNodeModule = async (entry, config, cache) => {
  const { cachedNodeModules } = cache
  const { preact } = config
  const source = await read(entry)

  const froms = detect(source)
  const dir = dirname(entry)
  const deps = []
  const nodeModules = []
  froms.forEach(from => {
    if (from.endsWith('.jsx'))
      throw new Error(`${entry} references JSX file with explicit .jsx extension. Depack will not be able to transpile it.`)
  })
  await Promise.all(froms.map(async (dep) => {
    if (checkIfLib(dep)) {
      const { path } = await resolveDependency(dep, entry)
      const relativePath = relative(dir, path)
      deps.push(relativePath)
      return
    }
    const { entry: e } = await findPackageJson(dir, dep)
    nodeModules.push(e)
  }))
  const files = await Promise.all(deps.map(async dep => {
    const js = dep.replace(/\.jsx$/, '.js')
    const jsPath = join(dir, js)

    let jsContent, isDepack = false
    try {
      jsContent = await read(jsPath)
      isDepack = /\/\/ _depack-jsx-bundled$/.test(jsContent)
    } catch (err) {/**/}

    if (dep == js && !isDepack) {
      return jsPath
    }
    // process jsx exported by node_module
    if (jsContent && !isDepack)
      throw new Error(`Cannot compile ${dep} over ${jsPath}.`)
    const p = join(dir, dep)
    const depSource = await read(`${p}x`)
    const t = await transpile(depSource, entry)
    console.log('Compiled %s', c(`${jsPath}x`, 'green'))
    const tt = preact ? addPreact(t) : t
    await write(jsPath, `${tt} // _depack-jsx-bundled`)
    return jsPath
  }))

  const all = [...files, ...nodeModules]
  const newDeps = all
    .filter(d => !(d in cachedNodeModules))

  newDeps.forEach(nm => { cachedNodeModules[nm] = 1 })

  await newDeps.reduce(async (acc, nodeModule) => {
    await acc
    await processNodeModule(nodeModule, config, cache)
  }, {})
}