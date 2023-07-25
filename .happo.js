const { RemoteBrowserTarget } = require('happo.io')
const happoStorybookPlugin = require('happo-plugin-storybook')

const responsiveTargets = [400, 600, 800, 1279, 1280, 1800].reduce((acc, width) => {
  acc[`chrome-desktop-width-${width}`] = new RemoteBrowserTarget('chrome', {
    viewport: `${width}x1024`,
    applyPseudoClasses: true
  })
    
  return acc
}, {})

module.exports = {
  project: process.env.HAPPO_PROJECT,
  apiKey: process.env.HAPPO_API_KEY,
  apiSecret: process.env.HAPPO_API_SECRET,

  targets: {
    'chrome-desktop': new RemoteBrowserTarget('chrome', {
      viewport: '1280x1024',
      applyPseudoClasses: true
    }),
    ...responsiveTargets
  },
  plugins: [
    happoStorybookPlugin({
      outputDir: '.happo'
    })
  ]
}
