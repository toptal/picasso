const path = require('path')
const fs = require('fs')

const { log } = require('./log')
const { BUILD_FOLDER } = require('./constants')

const copyLicense = packageDir => {
  log('')
  log(
    `Copying LICENSE file to the build folder "${BUILD_FOLDER}" of the package: ${packageDir}`,
    'magenta'
  )

  const licenseFile = path.resolve(packageDir, '../../LICENSE')

  const outputLicenseFile = path.resolve(
    packageDir,
    `./${BUILD_FOLDER}/LICENSE`
  )

  fs.copyFileSync(licenseFile, outputLicenseFile)
  log('')
}

module.exports = {
  copyLicense,
}
