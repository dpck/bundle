const { Replaceable } = require('restream');
const { join, relative, dirname } = require('path');
const resolveDependency = require('resolve-dependency');
const findPackageJson = require('fpj');
const split = require('@depack/split');
const { checkIfLib } = require('./lib');

class BundleTransform extends Replaceable {
  /**
   * @param {string} path Path to the file.
   * @param {string} to Where the file will be saved.
   */
  constructor(path, to) {
    super([])
    const replacement = this.replacement.bind(this)
    this.rules = [
      {
        re: /^( *import(?:\s+[^\s,]+\s*,?)?(?:\s*{(?:[^}]+)})?\s+from\s+)['"](.+)['"]/gm,
        replacement,
      },
      {
        re: /^( *import\s+['"](.+)['"])/gm,
        replacement,
      },
      {
        re: /^( *export\s+{[^}]+?}\s+from\s+)['"](.+?)['"]/gm,
        replacement,
      },
    ]
    this._nodeModules = []
    this.css = []
    this._deps = []
    this.path = path
    this.to = to
    this.preactExtern = false
  }
  /**
   * The paths to node_modules in the file.
   */
  get nodeModules() {
    return this._nodeModules
  }
  /**
   * The paths to dependencies.
   */
  get deps() {
    return this._deps
  }
  /**
   * The replacement function that adds extensions to required modules and resolves paths to packages from node_modules.
   */
  async replacement(m, pre, from) {
    const dir = dirname(this.path)
    if (from.endsWith('.css')) {
      this.css.push(from)
      return m
    }
    if (checkIfLib(from)) {
      const { path } = await resolveDependency(from, this.path)
      const relativePath = relative(dir, path)
      this.deps.push(relativePath)
      if (m == pre) return pre.replace(/(['"]).+\1/, `$1./${relativePath}$1`)
      const r = `${pre}'./${relativePath}'`
      return r
    }
    const { name: n } = split(from)
    if (n == 'preact' && this.preactExtern) {
      const { entry } = await findPackageJson(dir, '@externs/preact')
      this.nodeModules.push(entry)
      return `${pre}'@externs/preact'`
    }
    return m
    // this is not really doing anything
    // const { packageJson, entry } = await findPackageJson(dir, n)
    // if (paths) {
    //   const d = dirname(packageJson)
    //   const { path: p } = await resolveDependency(join(d, paths))
    //   this.nodeModules.push(p)
    //   const relativePath = relative(this.to, p)
    //   return `${pre}'${relativePath}'`
    // }
    // this.nodeModules.push(entry)
    // const modRel = relative(this.to, entry)
    // return `${pre}'${modRel}'`
  }
}

module.exports = BundleTransform