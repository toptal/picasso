/* eslint-disable jest/valid-title */
const path = require('path')
const fs = require('fs')

const { assertVisuals } = require('./index')
const config = require('./config')
const {
  createSnapshotName,
  createHumanName,
  assignOutputDir
} = require('./utils')

const stories = global.__STORYSHOTS__
const outputPath = assignOutputDir

fs.rmdirSync(outputPath, { recursive: true })

const snapShotDir = storyPath =>
  path.resolve(path.dirname(storyPath), '../', config.storyShotsDirName)

stories.forEach(story => {
  story.tests.forEach(({ exampleFilename, options }) => {
    const humanName = createHumanName(story.name, exampleFilename)

    describe(`Component ${story.name}`, () => {
      // eslint-disable-next-line jest/expect-expect
      it(
        humanName,
        assertVisuals(story.name, exampleFilename, {
          customSnapshotsDir: snapShotDir(story.file),
          customSnapshotIdentifier: `${createSnapshotName(humanName)}`,
          customDiffDir: outputPath,
          ...options
        })
      )
    })
  })
})
