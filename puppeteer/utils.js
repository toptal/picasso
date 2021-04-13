const glob = require('glob')
const path = require('path')

const config = require('./config')

const { env } = process
const SPECIAL_CHARS_OR_SPACES = /[^\w]+/gi

const normalize = name =>
  name
    .replace(SPECIAL_CHARS_OR_SPACES, '-')
    .trim()
    .toLowerCase()

const createSnapshotName = name => {
  const [component, test] = parseHumanName(name)

  return `${normalize(component)}-${normalize(test)}`
}

const createHumanName = (component, test) => `${component}:${test}`

const parseHumanName = name => name.split(':')

const asyncGlob = pattern => {
  new Promise((resolve, reject) => {
    glob(pattern, (error, result) => {
      if (error) {
        reject(error)
      }
      resolve(result)
    })
  })
}

const lastCommitHash = () => {
  if (env.GIT_SHA) {
    return env.GIT_SHA.toString()
  }

  return 'latest'
}

const assignOutputDir = () => {
  const hash = lastCommitHash().trim()

  return path.resolve(config.diffOutputPath, hash)
}

module.exports = {
  asyncGlob,
  normalize,
  createSnapshotName,
  createHumanName,
  parseHumanName,
  lastCommitHash,
  assignOutputDir: assignOutputDir()
}
