const { RemoteBrowserTarget } = require('happo.io')
const happoStorybookPlugin = require('happo-plugin-storybook')

const breakpoints = {
  xs: 0,
  sm: 480,
  md: 768,
  lg: 1024,
  xl: 1440,
}

const sortBy = field => (a, b) => a[field] - b[field]

const checkpoints = Object.entries(breakpoints)
  .map(([name, minWidth]) => ({ name, minWidth }))
  .sort(sortBy('minWidth'))
  .map((breakpoint, idx, breakpoints) => {
    const nextBreakpoint = breakpoints[idx + 1]

    const viewportWidth = nextBreakpoint
      ? nextBreakpoint.minWidth - 1 // Either next 1px lower than next breakpoint minimum
      : breakpoint.minWidth + 1 // Or 1px higher than current breakpoint, when the last one

    return {
      [`chrome-desktop-${breakpoint.name}`]: new RemoteBrowserTarget('chrome', {
        viewport: `${viewportWidth}x1024`,
        applyPseudoClasses: true,
      }),
    }
  })
  .reduce((a, b) => Object.assign(a, b))

module.exports = {
  project: process.env.HAPPO_PROJECT,
  apiKey: process.env.HAPPO_API_KEY,
  apiSecret: process.env.HAPPO_API_SECRET,

  targets: {
    'chrome-desktop': new RemoteBrowserTarget('chrome', {
      viewport: '1280x1024',
      applyPseudoClasses: true,
    }),
    ...process.env.SCREENSHOT_BREAKPOINTS && checkpoints,
  },
  plugins: [
    happoStorybookPlugin({
      outputDir: '.happo',
    }),
  ],
}
