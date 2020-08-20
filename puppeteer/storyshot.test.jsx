const path = require('path')
// const exec = require('child_process').execSync

const { assertVisuals } = require('./index')
const config = require('./config')
const {
  createSnapshotName,
  createHumanName,
  assignOutputDir
} = require('./utils')

const stories = global.__STORYSHOTS__
const outputPath = assignOutputDir

// exec(`rm -rf ${outputPath}/*`)

const snapShotDir = storyPath =>
  path.resolve(path.dirname(storyPath), '../', config.storyShotsDirName)

stories.forEach(story => {
  story.tests.forEach(({ exampleFilename, options }) => {
    const humanName = createHumanName(story.name, exampleFilename)

    describe(`Component ${story.name}`, () => {
      test(
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
