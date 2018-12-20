/* eslint-disable */

const fs = require('fs')
const path = require('path')
const ejs = require('ejs')
const config = require('./config')

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
      const images = fs
        .readdirSync(config.outputPath)
        .filter(i => i.match(/png/))

      ejs.renderFile(
        path.resolve(__dirname, './template.ejs'),
        { images },
        (err, output) => {
          if (err) return
          fs.writeFileSync(
            path.resolve(config.outputPath, 'index.html'),
            output
          )
        }
      )
    }
  }
}

module.exports = ImageReporter
