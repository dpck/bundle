import { processFile } from './lib'
import { join, relative } from 'path'

/**
 * Generates a temp directory for the given entry file and transpiles JSX files. Returns the list of all dependencies including in the `node_modules`.
 * @param {string} entry The path to the entry file.
 * @param {{ tempDir: string, preact: boolean }} [config] The configuration.
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