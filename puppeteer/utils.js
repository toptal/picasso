const normalize = name =>
  name
    .replace(/[^\w\s]/gi, '')
    .replace(/ /g, '-')
    .trim()
    .toLowerCase()

const createSnapshotName = name => {
  const [component, test] = parseHumanName(name)

  return `${normalize(component)}-${normalize(test)}`
}

const createHumanName = (component, test) => `${component}:${test}`
const parseHumanName = name => name.split(':')

module.exports = {
  normalize,
  createSnapshotName,
  createHumanName,
  parseHumanName
}
