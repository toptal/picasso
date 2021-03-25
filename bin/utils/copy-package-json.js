const path = require('path')
const fs = require('fs')

const { log } = require('./log')
const { BUILD_FOLDER } = require('./constants')

const copyPackageJson = packageRootDir => {
  log('')
  log(
    `Copying package.json to the build folder "${BUILD_FOLDER}" of the package: ${packageRootDir}`
  )

  const rootPackageJson = path.resolve(packageRootDir, './package.json')

  const outputPackageJson = path.resolve(
    packageRootDir,
    `./${BUILD_FOLDER}/package.json`
  )

  fs.copyFileSync(rootPackageJson, outputPackageJson)

  log('')
}

module.exports = {
  copyPackageJson
}
