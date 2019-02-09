const { Replaceable } = require('restream');
const { relative, dirname } = require('path');
let resolveDependency = require('resolve-dependency'); if (resolveDependency && resolveDependency.__esModule) resolveDependency = resolveDependency.default;
let findPackageJson = require('fpj'); if (findPackageJson && findPackageJson.__esModule) findPackageJson = findPackageJson.default;

const checkIfLib = modName => /^[./]/.test(modName)

               class BundleTransform extends Replaceable {
  /**
   * @param {string} path Path to the file.
   * @param {string} to Where the file will be saved.
   */
  constructor(path, to) {
    super()
    this.rules = [
      {
        re: /^( *import(?:\s+[^\s,]+\s*,?)?(?:\s*{(?:[^}]+)})?\s+from\s+)['"](.+)['"]/gm,
        replacement: this.replacement.bind(this),
      },
    ]
    this._nodeModules = []
    this._deps = []
    this.path = path
    this.to = to
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
    if (checkIfLib(from)) {
      const { path } = await resolveDependency(from, this.path)
      const relativePath = relative(dir, path)
      this.deps.push(relativePath)
      const r = `${pre}'./${relativePath}'`
      return r
    }
    const { entry } = await findPackageJson(dir, from)
    this.nodeModules.push(entry)
    const modRel = relative(this.to, entry)
    return `${pre}'${modRel}'`
  }
}

module.exports = BundleTransform