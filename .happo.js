const { RemoteBrowserTarget } = require('happo.io')
const happoStorybookPlugin = require('happo-plugin-storybook')

module.exports = {
  project: process.env.HAPPO_PROJECT,
  apiKey: process.env.HAPPO_API_KEY,
  apiSecret: process.env.HAPPO_API_SECRET,

  targets: {
    'chrome-desktop': new RemoteBrowserTarget('chrome', {
      viewport: '1280x1024',
      applyPseudoClasses: true
    })
  },
  plugins: [
    happoStorybookPlugin({
      outputDir: '.happo'
    })
  ]
}
