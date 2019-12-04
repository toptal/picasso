const path = require('path')
const fs = require('fs-extra')

const { log } = require('./log')
const { BUILD_FOLDER } = require('./constants')

const getPackageJsonVersion = packageRootDir => {
  const rootPackageJson = path.resolve(packageRootDir, './package.json')
  const rootPackageJsonContent = require(rootPackageJson)
  const nextVersion = rootPackageJsonContent.version

  log(`Next version: ${nextVersion}`)

  return nextVersion
}

const bumpReadmeVersion = (packageRootDir, outputReadmePath) => {
  log('')
  log(
    `Bumping README.md version inside build folder of the package: ${packageRootDir}`
  )

  const outputReadme = outputReadmePath
    ? path.resolve(outputReadmePath)
    : path.resolve(packageRootDir, `./${BUILD_FOLDER}/README.md`)

  const outputReadmeContent = fs.readFileSync(outputReadme, 'utf8')
  const nextVersion = getPackageJsonVersion(packageRootDir)

  // checks [![](https://img.shields.io/badge/npm-3.44.0-brightgreen.svg) part of
  // README content and extracts '3.44.0' version
  const prevVersion = /badge\/npm-(.*)-.*\.svg/.exec(outputReadmeContent)[1]

  log(`Prev version detected: ${prevVersion}`)

  const newReadmeContent = outputReadmeContent.replace(prevVersion, nextVersion)

  fs.writeFileSync(outputReadme, newReadmeContent + '\n')

  log('')
}

module.exports = {
  bumpReadmeVersion
}
