const { log } = require('./log')
const { generatePackageJson } = require('./generate-package-json')
const { bumpPackageJsonVersion } = require('./bump-package-json-version')
const { copyReadme } = require('./copy-readme')
const { bumpReadmeVersion } = require('./bump-readme-version')

module.exports = {
  log,
  generatePackageJson,
  bumpPackageJsonVersion,
  copyReadme,
  bumpReadmeVersion
}
