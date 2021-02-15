const { RemoteBrowserTarget } = require('happo.io')
const happoStorybookPlugin = require('happo-plugin-storybook')

module.exports = {
  project: 'Picasso',
  apiKey: process.env.HAPPO_API_KEY,
  apiSecret: process.env.HAPPO_API_SECRET,

  targets: {
    'chrome-desktop': new RemoteBrowserTarget('chrome', {
      viewport: '1280x1024'
    }),
    'firefox-desktop': new RemoteBrowserTarget('firefox', {
      viewport: '1280x1024'
    }),
    'safari-desktop': new RemoteBrowserTarget('safari', {
      viewport: '1280x1024'
    })
  },
  plugins: [
    happoStorybookPlugin({
      outputDir: '.happo'
    })
  ]
}
