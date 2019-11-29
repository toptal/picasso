const fs = require('fs-extra')
const path = require('path')

const { log } = require('./log')

const generatePackageJson = (
  sourceData,
  packageRootDir,
  entry = './index.js'
) => {
  log(`Creating package.json in: ${packageRootDir}/package.json`)
  fs.ensureDirSync(packageRootDir)
  const out = path.resolve(packageRootDir, './package.json')

  const data = {
    ...sourceData,
    main: entry,
    module: entry
  }

  fs.writeFileSync(out, JSON.stringify(data, null, 2) + '\n')
}

module.exports = {
  generatePackageJson
}
