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
exec(`rm -rf ${outputPath}`)
exec(`mkdir -p ${outputPath}`)

const snapShotDir = storyPath =>
  path.resolve(path.dirname(storyPath), '../', config.storyShotsDirName)

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
