const { processFile } = require('./lib');
const { join, relative } = require('path');

/**
 * Generates a temp directory for the given entry file and transpiles JSX files. Returns the list of all dependencies including in the `node_modules`.
 * @param {string} entry The path to the entry file.
 * @param {_depack.TempConfig} [config] Options for generating the temp directory.
 * @param {string} [config.tempDir="depack-temp"] The directory in which to place temp files. Default `depack-temp`.
 * @param {boolean} [config.preact=false] Whether to add `import { h } from 'preact'` automatically at the top of each JSX file. Default `false`.
 * @param {boolean} [config.preactExtern=false] Whether to add `import { h } from '@externs/preact'` automatically at the top of each JSX file, and rename preact imports into `@externs/preact` imports. See https://www.npmjs.com/package/@externs/preact. Default `false`.
 */
const generateTemp = async (entry, config = {}) => {
  const {
    tempDir = 'depack-temp',
    preact,
    preactExtern,
  } = config
  const cache = {
    cachedFiles: {
      [relative('', entry)]: 1,
    },
    cachedNodeModules: {},
  }
  await processFile(entry, {
    tempDir, preact, preactExtern,
  }, cache)
  const tempFiles = Object.keys(cache.cachedFiles)
    .map(f => join(tempDir, f))
  return [...tempFiles, ...Object.keys(cache.cachedNodeModules)]
}

module.exports=generateTemp

/* documentary types/index.xml */
/**
 * @suppress {nonStandardJsDocs}
 * @typedef {_depack.TempConfig} TempConfig Options for generating the temp directory.
 */
/**
 * @suppress {nonStandardJsDocs}
 * @typedef {Object} _depack.TempConfig Options for generating the temp directory.
 * @prop {string} [tempDir="depack-temp"] The directory in which to place temp files. Default `depack-temp`.
 * @prop {boolean} [preact=false] Whether to add `import { h } from 'preact'` automatically at the top of each JSX file. Default `false`.
 * @prop {boolean} [preactExtern=false] Whether to add `import { h } from '@externs/preact'` automatically at the top of each JSX file, and rename preact imports into `@externs/preact` imports. See https://www.npmjs.com/package/@externs/preact. Default `false`.
 */
