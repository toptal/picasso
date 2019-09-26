const path = require('path')
const exec = require('child_process').execSync

const { assertVisuals } = require('./index')
const config = require('./config')
const {
  createSnapshotName,
  createHumanName,
  assignOutputDir
} = require('./utils')

const stories = global.__STORYSHOTS__
const outputPath = assignOutputDir

// Cleanup current output path
// eslint-disable-next-line no-console
console.time('Cleanup before tests')
exec(`rm -rf ${outputPath}`)
exec(`mkdir -p ${outputPath}`)
// eslint-disable-next-line no-console
console.timeEnd('Cleanup before tests')

const snapShotDir = storyPath =>
  path.resolve(path.dirname(storyPath), '../', config.storyShotsDirName)

// eslint-disable-next-line no-console
console.time('Visual tests preparations')
stories.forEach(story => {
  story.tests.forEach(testName => {
    const humanName = createHumanName(story.name, testName)

    test(
      humanName,
      assertVisuals(story.name, testName, {
        customSnapshotsDir: snapShotDir(story.file),
        customSnapshotIdentifier: `${createSnapshotName(humanName)}`,
        customDiffDir: outputPath
      })
    )
  })
})
// eslint-disable-next-line no-console
console.timeEnd('Visual tests preparations')
