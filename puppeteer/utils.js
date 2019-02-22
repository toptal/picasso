const glob = require('glob')

const SPECIAL_CHARS = /[^\w\s]/gi
const SPACES = / /g

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

module.exports = {
  asyncGlob,
  normalize,
  createSnapshotName,
  createHumanName,
  parseHumanName
}
