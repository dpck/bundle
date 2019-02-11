// obsolete
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