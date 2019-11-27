const path = require('path')
const fs = require('fs-extra')

const { log } = require('./log')
const { BUILD_FOLDER } = require('./constants')

const setVersion = (packageJson, version) => {
  const packageJsonContent = require(packageJson)

  log(`Updating version for package.json in: ${packageJson}`)

  const data = {
    ...packageJsonContent,
    version
  }

  fs.writeFileSync(packageJson, JSON.stringify(data, null, 2) + '\n')
}

const bumpPackageJsonVersion = packageRootDir => {
  log('')
  log(
    `Bumping package.json version inside build folder of the package: ${packageRootDir}`
  )

  const rootPackageJson = path.resolve(packageRootDir, './package.json')
  const rootPackageJsonContent = require(rootPackageJson)
  const nextVersion = rootPackageJsonContent.version

  log(`Next version: ${nextVersion}`)

  const outputPackageJson = path.resolve(
    packageRootDir,
    `./${BUILD_FOLDER}/package.json`
  )

  setVersion(outputPackageJson, nextVersion)

  log('')
}

module.exports = {
  bumpPackageJsonVersion
}
