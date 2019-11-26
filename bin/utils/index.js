/* eslint-disable no-console */

const chalk = require('chalk')
const fs = require('fs-extra')
const path = require('path')

const BUILD_FOLDER = 'build'

// General logging
const log = function (text, color) {
  if (!color) color = 'blue'
  console.log(chalk[color](text))
}

const setVersionPackageJson = (dir, version) => {
  log('')
  const packageJsonContent = require(path.resolve(dir, './package.json'))
  const outputPackageJson = path.resolve(dir, `./${BUILD_FOLDER}/package.json`)

  log(`Updating version for package.json in: ${outputPackageJson}`)

  fs.ensureDirSync(dir)

  const data = {
    ...packageJsonContent,
    version
  }

  fs.writeFileSync(outputPackageJson, JSON.stringify(data, null, 2) + '\n')
}

const generatePackageJson = (
  sourceData,
  outDir,
  version = false,
  entry = './index.js'
) => {
  log(`Creating package.json in: ${outDir}/package.json`)
  fs.ensureDirSync(outDir)
  const out = path.resolve(outDir, './package.json')

  const data = {
    ...sourceData,
    main: entry,
    module: entry
  }

  if (version) {
    data.version = version
  }

  fs.writeFileSync(out, JSON.stringify(data, null, 2) + '\n')
}

module.exports = {
  log,
  generatePackageJson,
  setVersionPackageJson
}
