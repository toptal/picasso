const path = require('path')
const fs = require('fs')

const { log } = require('./log')
const { BUILD_FOLDER } = require('./constants')

const copyReadme = packageRootDir => {
  log('')
  log(
    `Copying README.md to the build folder "${BUILD_FOLDER}" of the package: ${packageRootDir}`
  )

  const packageReadmeDir = path.resolve(packageRootDir, './README.md')

  const outputReadmeDir = path.resolve(
    packageRootDir,
    `./${BUILD_FOLDER}/README.md`
  )

  fs.copyFileSync(packageReadmeDir, outputReadmeDir)

  log('')
}

module.exports = {
  copyReadme
}
