const path = require('path')

const { assertVisuals } = require('./index')
const config = require('./config')
const { createSnapshotName, createHumanName } = require('./utils')

const stories = global.__STORYSHOTS__

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
        customDiffDir: config.diffOutputPath
      })
    )
  })
})
