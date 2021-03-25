const path = require('path')
const fs = require('fs')

const { log } = require('./log')
const { BUILD_FOLDER } = require('./constants')

const copyReadme = packageRootDir => {
  log('')
  log(
    `Copying README.md to build folder "${BUILD_FOLDER}" of the package: ${packageRootDir}`
  )

  const rootPackageJson = path.resolve(packageRootDir, './README.md')

  const outputPackageJson = path.resolve(
    packageRootDir,
    `./${BUILD_FOLDER}/README.md`
  )

  fs.copyFileSync(rootPackageJson, outputPackageJson)

  log('')
}

module.exports = {
  copyReadme
}
