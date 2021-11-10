const { RemoteBrowserTarget } = require('happo.io')
const happoStorybookPlugin = require('happo-plugin-storybook')

module.exports = {
  project: 'Picasso',
  apiKey: process.env.HAPPO_API_KEY,
  apiSecret: process.env.HAPPO_API_SECRET,
  prerender: false,
  targets: {
    'chrome-desktop': new RemoteBrowserTarget('chrome', {
      viewport: '1280x1024',
      useFullPageFallbackForTallScreenshots: false
    })
  },
  plugins: [
    happoStorybookPlugin({
      outputDir: '.happo'
    })
  ]
}
