const path = require('path')
const config = require('./build.config.js')

module.exports = {
  ...config,
  outDir: path.resolve(__dirname, '../build/es')
}
