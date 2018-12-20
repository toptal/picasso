const { configureToMatchImageSnapshot } = require('jest-image-snapshot')
const config = require('./config')

const customConfig = {
  threshold: 0,
  customDiffDir: config.outputPath
}
const toMatchImageSnapshot = configureToMatchImageSnapshot({
  ...customConfig
})

expect.extend({ toMatchImageSnapshot })
