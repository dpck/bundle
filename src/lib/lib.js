import { dirname, join, resolve } from 'path'

export const checkIfLib = modName => /^[./]/.test(modName)

export const findPackage = (entry) => {
  let p = entry
  while (p != '.') {
    p = dirname(p)
    try {
      const resolved = resolve(p, 'package.json')
      const r = require(resolved)
      const rest = entry.replace(p, '')
      // require will resolve symlinks
      const j = join(r['name'], 'package.json')
      const actualPath = require.resolve(j, {
        paths: [process.cwd()],
      })
      if (resolved == actualPath) {
        // bingo
        return join(r['name'], rest)
      }
    } catch (err) {
    /**/}
  }
}
