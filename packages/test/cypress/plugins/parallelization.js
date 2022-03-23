const fs = require('fs')
const glob = require('glob')
const path = require('path')

const sizeMap = new Map()
const sizeOf = file => {
  if (!sizeMap.has(file)) {
    sizeMap.set(file, fs.statSync(file).size)
  }
  return sizeMap.get(file)
}

module.exports = config => {
  const groupIndex = parseInt(process.env.GROUP_INDEX || 0, 10)
  const total = parseInt(process.env.PARALLEL_GROUPS || 1, 10)

  if (groupIndex < 0 || total <= 1) {
    return
  }

  const { integrationFolder, testFiles } = config

  const specPattern = Array.isArray(testFiles) ? `{${testFiles.join(',')}}` : testFiles
  const specs = glob.sync(path.join(integrationFolder, specPattern))

  config.testFiles = specs
    .sort((lhs, rhs) => sizeOf(rhs) - sizeOf(lhs))
    .filter((_, index) => index % total === groupIndex)
}
