const path = require('path')

module.exports = {
  diffOutputPath: path.resolve(__dirname, '../__diff_output__'),
  diffResultsTemplate: path.resolve(__dirname, './template.ejs'),
  storyShotsPattern: 'components/**/story/index.jsx',
  storyShotsDirName: '__image_snapshots__'
}
