const path = require('path')
const fs = require('fs-extra')

const { log } = require('./log')
const { BUILD_FOLDER } = require('./constants')

const copyReadme = packageRootDir => {
  log('')
  log(
    `Copying README.md file inside build folder of the package: ${packageRootDir}`
  )

  const rootReadme = path.resolve(__dirname, '../../README.md')
  const outputReadme = path.resolve(
    packageRootDir,
    `./${BUILD_FOLDER}/README.md`
  )

  fs.copySync(rootReadme, outputReadme)

  log('')
}

module.exports = {
  copyReadme
}
