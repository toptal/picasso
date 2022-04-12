const fs = require('fs')
const glob = require('glob')
const path = require('path')

const sizeOf = file => fs.statSync(file).size

module.exports = config => {
  const groupIndex = parseInt(process.env.GROUP_INDEX || 0, 10)
  const total = parseInt(process.env.PARALLEL_GROUPS || 1, 10)

  if (groupIndex < 0 || total <= 1) {
    return
  }

  const { componentFolder, integrationFolder, testFiles, testingType } = config

  const filesFolder =
    testingType === 'component' ? componentFolder : integrationFolder

  const specPattern = Array.isArray(testFiles)
    ? `{${testFiles.join(',')}}`
    : testFiles
  const specs = glob.sync(path.join(filesFolder, specPattern))

  config.testFiles = specs
    .sort((lhs, rhs) => sizeOf(rhs) - sizeOf(lhs))
    .filter((_, index) => index % total === groupIndex)
}
