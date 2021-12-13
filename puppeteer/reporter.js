/* eslint-disable */

const fs = require('fs')
const path = require('path')
const ejs = require('ejs')
const exec = require('child_process').execSync

const config = require('./config')
const { createSnapshotName, assignOutputDir } = require('./utils')

const DIFF_REGEX_PATTERN = /different/

const isTestFailed = test => test.match(DIFF_REGEX_PATTERN)
const STATES = {
  failure: 'FAILURE',
  success: 'SUCCESS'
}

function toBase64(path) {
  var bitmap = fs.readFileSync(path)
  return Buffer.from(bitmap).toString('base64')
}

class ImageReporter {
  constructor(globalConfig, options) {
    this._globalConfig = globalConfig
    this._options = options
  }

  onTestResult(test, testResult) {
    const { testResults } = testResult

    if (testResults.length === 0) {
      return
    }

    const tests = testResults.map(({ failureMessages, title, duration }) => {
      const diffFilename = `${createSnapshotName(title)}-diff.png`
      const testResult = {
        duration,
        path: diffFilename,
        base64: toBase64(diffFilename),
        title
      }

      const isFailed = failureMessages.some(message => isTestFailed(message))

      return {
        ...testResult,
        result: isFailed ? STATES.failure : STATES.success
      }
    })

    const totalDuration = tests.reduce((acc, test) => acc + test.duration, 0)
    const data = {
      suite: {
        tests,
        duration: (totalDuration / 1000).toFixed(2),
        total: tests.length,
        failed: tests.filter(test => test.result === STATES.failure).length
      }
    }

    this.renderDiffResultsIndex(data)
    this.writeResultsStats(data)
  }

  renderDiffResultsIndex(data) {
    ejs.renderFile(config.diffResultsTemplate, data, this.writeResultsHTML)
  }

  writeResultsHTML(error, output) {
    if (error) {
      console.error(error)
      process.exit(1)
    }

    if (!fs.existsSync(config.diffOutputPath)) {
      fs.mkdirSync(config.diffOutputPath)
    }

    const resultsFilePath = path.resolve(config.diffOutputPath, 'index.html')

    fs.writeFileSync(resultsFilePath, output)
  }

  writeResultsStats(data) {
    if (!fs.existsSync(config.diffOutputPath)) {
      fs.mkdirSync(config.diffOutputPath)
    }

    const resultsStatsFilePath = path.resolve(
      config.diffOutputPath,
      'stats.json'
    )

    fs.writeFileSync(resultsStatsFilePath, JSON.stringify(data, null, 2))
  }
}

module.exports = ImageReporter
