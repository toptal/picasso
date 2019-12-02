const { log } = require('./log')
const { copyPackageJson } = require('./copy-package-json')
const { copyReadme } = require('./copy-readme')
const { bumpReadmeVersion } = require('./bump-readme-version')

module.exports = {
  log,
  copyPackageJson,
  copyReadme,
  bumpReadmeVersion
}
