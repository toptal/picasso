const ModuleDependencyWarning = require('webpack/lib/ModuleDependencyWarning')

module.exports = class IgnoreNotFoundExportPlugin {
  constructor(exportsToIgnore = []) {
    this.exportsToIgnore = exportsToIgnore
  }

  getMessageRegExp() {
    if (this.exportsToIgnore.length > 0) {
      return new RegExp(
        `export '${this.exportsToIgnore.join(
          '|'
        )}'( \\(reexported as '.*'\\))? was not found in`
      )
    } else {
      return /export '.*'( \(reexported as '.*'\))? was not found in/
    }
  }

  apply(compiler) {
    const messageRegExp = this.getMessageRegExp()

    const doneHook = stats => {
      stats.compilation.warnings = stats.compilation.warnings.filter(warn => {
        if (
          warn instanceof ModuleDependencyWarning &&
          messageRegExp.test(warn.message)
        ) {
          return false
        }
        return true
      })
    }

    if (compiler.hooks) {
      compiler.hooks.done.tap('IgnoreNotFoundExportPlugin', doneHook)
    } else {
      compiler.plugin('done', doneHook)
    }
  }
}
