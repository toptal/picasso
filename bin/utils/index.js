/* eslint-disable no-console */

const chalk = require('chalk')

// General logging
const log = function (text, color) {
  if (!color) color = 'blue'
  console.log(chalk[color](text))
}

module.exports = {
  log
}
