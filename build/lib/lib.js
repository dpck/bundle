const { dirname, join, resolve } = require('path');

const checkIfLib = modName => /^[./]/.test(modName)

const findPackage = (entry) => {
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


module.exports.checkIfLib = checkIfLib
module.exports.findPackage = findPackage