const glob = require('glob')
const exec = require('child_process').execSync
const path = require('path')

const config = require('./config')

const SPECIAL_CHARS = /[^\w\s]/gi
const SPACES = /\s+/g

const normalize = name =>
  name
    .replace(SPECIAL_CHARS, '')
    .replace(SPACES, '-')
    .trim()
    .toLowerCase()

const createSnapshotName = name => {
  const [component, test] = parseHumanName(name)

  return `${normalize(component)}-${normalize(test)}`
}

const createHumanName = (component, test) => `${component}:${test}`
const parseHumanName = name => name.split(':')

const asyncGlob = pattern => {
  return new Promise((resolve, reject) => {
    glob(pattern, (error, result) => {
      if (error) {
        reject(error)
      }
      resolve(result)
    })
  })
}

const lastCommitHash = () => exec(`git rev-parse --short=8 HEAD`).toString()

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
