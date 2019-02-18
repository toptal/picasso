const path = require('path')

const { assertVisuals } = require('./index')
const config = require('./config')
const { createSnapshotName, createHumanName } = require('./utils')

const stories = global.__STORYSHOTS__

const snapShotDir = storyPath =>
  path.resolve(path.dirname(storyPath), '../__image_snapshots__')

stories.forEach(story => {
  story.tests.forEach(_test => {
    const humanName = createHumanName(story.name, _test)

    test(
      humanName,
      assertVisuals(story.name, _test, {
        customSnapshotsDir: snapShotDir(story.file),
        customSnapshotIdentifier: `${createSnapshotName(humanName)}`,
        customDiffDir: config.diffOutputPath
      })
    )
  })
})
