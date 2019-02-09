import { processFile } from './lib'
import { join, relative } from 'path'

/**
 * Generates a temp directory for the given entry file and transpiles JSX files. Returns the list of all dependencies including in the `node_modules`.
 * @param {string} entry The path to the entry file.
 * @param {Config} [config] Options for the program.
 * @param {string} [config.tempDir="depack-temp"] The directory in which to place temp files. Default `depack-temp`.
 * @param {boolean} [config.preact=false] Whether to add `import { h } from 'preact'` automatically at the top of each JSX file. Default `false`.
 */
const generateTemp = async (entry, config = {}) => {
  const {
    tempDir = 'depack-temp',
    preact,
  } = config
  const cache = {
    cachedFiles: {
      [relative('', entry)]: 1,
    },
    cachedNodeModules: {},
  }
  await processFile(entry, {
    tempDir, preact,
  }, cache)
  const tempFiles = Object.keys(cache.cachedFiles)
    .map(f => join(tempDir, f))
  return [...tempFiles, ...Object.keys(cache.cachedNodeModules)]
}

export default generateTemp

/* documentary types/index.xml */
/**
 * @typedef {Object} Config Options for the program.
 * @prop {string} [tempDir="depack-temp"] The directory in which to place temp files. Default `depack-temp`.
 * @prop {boolean} [preact=false] Whether to add `import { h } from 'preact'` automatically at the top of each JSX file. Default `false`.
 */
