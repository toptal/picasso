const path = require('path')

module.exports = {
  sourceFiles: path.resolve(__dirname, '../components'),
  ignoredFiles: ['components/**/test.jsx?', 'components/**/visual.test.jsx?'],
  outDir: path.resolve(__dirname, '../build')
}
