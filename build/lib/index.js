const { dirname, join, relative } = require('path');
const { read, write, ensurePath } = require('@wrote/wrote');
let transpileJSX = require('@a-la/jsx'); if (transpileJSX && transpileJSX.__esModule) transpileJSX = transpileJSX.default;
const { collect } = require('catchment');
const { c } = require('erte');
let staticAnalysis = require('static-analysis'); if (staticAnalysis && staticAnalysis.__esModule) staticAnalysis = staticAnalysis.default;
const BundleTransform = require('./BundleTransform');

       const processFile = async (entry, config, cache) => {
  const { cachedNodeModules, cachedFiles } = cache
  const { tempDir, preact, preactExtern } = config
  const source = await read(entry)
  const isJSX = entry.endsWith('.jsx')

  const dir = relative('', dirname(entry))
  const to = join(tempDir, dir)
  const bt = new BundleTransform(entry, to)
  bt.preactExtern = preactExtern

  const T = (preact || preactExtern) && isJSX ? addPreact(source, preactExtern) : source
  bt.end(T)
  const transformed = await collect(bt)
  const transpiled = isJSX ? await transpile(transformed, entry): transformed
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

  await nodeModules.reduce(async (acc, entryPath) => {
    await acc
    const sa = await staticAnalysis(entryPath)
    sa.forEach(({ entry: e, packageJson }) => {
      if (packageJson) cachedNodeModules[packageJson] = 1
      cachedNodeModules[e] = 1
    })
  }, {})

  await depPaths.reduce(async (acc, depPath) => {
    await acc
    await processFile(depPath, config, cache)
  }, {})
}

const addPreact = (source, preactExtern) => {
  const t = preactExtern ? '@externs/preact' : 'preact'
  return `import { h } from '${t}'
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

module.exports.processFile = processFile