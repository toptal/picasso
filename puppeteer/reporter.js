/* eslint-disable */

const fs = require('fs')
const path = require('path')
const ejs = require('ejs')

const config = require('./config')
const { parseHumanName, createSnapshotName } = require('./utils')

class ImageReporter {
  constructor(globalConfig, options) {
    this._globalConfig = globalConfig
    this._options = options
  }

  onTestResult(test, testResult, aggregateResults) {
    if (
      testResult.numFailingTests &&
      testResult.failureMessage.match(/but was different/)
    ) {
      const images = []
      testResult.testResults.forEach(result => {
        const failures = result.failureMessages.join('')
        if (failures.match(/but was different/)) {
          const snapshotName = `${createSnapshotName(result.title)}-diff.png`

          images.push({
            path: snapshotName,
            title: result.title
          })
        }
      })

      ejs.renderFile(
        path.resolve(__dirname, './template.ejs'),
        { images },
        (err, output) => {
          if (err) throw new Error(err)
          fs.writeFileSync(
            path.resolve(config.diffOutputPath, 'index.html'),
            output
          )
        }
      )
    }
  }
}

module.exports = ImageReporter
