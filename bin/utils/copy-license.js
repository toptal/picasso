const path = require('path')
const fs = require('fs')

const { log } = require('./log')
const { BUILD_FOLDER } = require('./constants')

const copyLicense = packageRootDir => {
  log('')
  log(
    `Copying LICENSE file to the build folder "${BUILD_FOLDER}" of the package: ${packageRootDir}`,
    'magenta'
  )

  const licenseFile = path.resolve(__dirname, '../../LICENSE')

  const outputLicenseFile = path.resolve(
    packageRootDir,
    `./${BUILD_FOLDER}/LICENSE`
  )

  fs.copyFileSync(licenseFile, outputLicenseFile)
  log('')
}

module.exports = {
  copyLicense
}
