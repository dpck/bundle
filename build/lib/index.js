const { dirname, join, relative } = require('path');
const { read, write, ensurePath } = require('@wrote/wrote');
let transpileJSX = require('@a-la/jsx'); if (transpileJSX && transpileJSX.__esModule) transpileJSX = transpileJSX.default;
const { collect } = require('catchment');
const { c } = require('erte');
const BundleTransform = require('./BundleTransform');

       const processFile = async (entry, config, cache) => {
  const { cachedNodeModules, cachedFiles } = cache
  const { tempDir, preact } = config
  const source = await read(entry)
  const isJSX = entry.endsWith('.jsx')

  const dir = relative('', dirname(entry))
  const to = join(tempDir, dir)
  const bt = new BundleTransform(entry, to)

  const T = preact && isJSX ? `import { h } from 'preact'
${source}` : source
  bt.end(T)
  const transformed = await collect(bt)
  const transpiled = isJSX ? transpileJSX(transformed, {
    quoteProps: 'dom',
    warn(message) {
      console.warn(c(message, 'yellow'))
      console.log(entry)
    },
  }): transformed
  const tto = join(tempDir, entry)
  await ensurePath(tto)

  await write(tto, transpiled)

  // now deal with dependencies
  const depPaths = bt.deps
    .map(d => join(dir, d))
    .filter(d => !(d in cachedFiles))
  const nodeModules = bt.nodeModules
    .map(d => relative('', d))
    .filter(d => !(d in cachedNodeModules))

  nodeModules.forEach(nm => { cachedNodeModules[nm] = 1 })
  depPaths.forEach(dp => { cachedFiles[dp] = 1 })

  await depPaths.reduce(async (acc, depPath) => {
    await acc
    await processFile(depPath, config, cache)
  }, {})
}

module.exports.processFile = processFile