const path = require('path')
const fs = require('fs-extra')

const { log } = require('./log')
const { BUILD_FOLDER } = require('./constants')

const updateEntries = (packageJsonContent, entry) => {
  return {
    ...packageJsonContent,
    main: entry,
    module: entry
  }
}

const copyPackageJson = (packageRootDir, entry) => {
  log('')
  log(`Copying package.json to build folder of the package: ${packageRootDir}`)

  const rootPackageJson = path.resolve(packageRootDir, './package.json')
  const rootPackageJsonContent = require(rootPackageJson)

  const content = updateEntries(rootPackageJsonContent, entry)

  const outputPackageJson = path.resolve(
    packageRootDir,
    `./${BUILD_FOLDER}/package.json`
  )

  fs.writeFileSync(outputPackageJson, JSON.stringify(content, null, 2) + '\n')

  log('')
}

module.exports = {
  copyPackageJson
}
