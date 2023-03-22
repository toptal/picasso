const ICON_CLEANUP_CONFIG = {
  '/logo.svg': {
    mergePaths: false,
    removeFill: false,
    replaceColors: {
      '#262d3d': 'var(--logo-text-color)',
      '#204ecf': 'var(--logo-emblem-color)',
    },
  },
}

const getCleanupConfig = svgPath => {
  for (const [key, value] of Object.entries(ICON_CLEANUP_CONFIG)) {
    if (svgPath.indexOf(key) > -1) {
      return value
    }
  }

  return
}

const replaceColorsInLogo = (doc, params, extra) => {
  const config = getCleanupConfig(extra.path)

  if (!config) {
    return doc
  }

  const svg = doc.querySelector('svg')
  const paths = svg.querySelectorAll('path')

  const replaceColor = node => {
    const color = node.attr('fill')
    const currentColor = color && color.value.toLowerCase()

    if (color && config.replaceColors && config.replaceColors[currentColor]) {
      color.value = config.replaceColors[currentColor]
    }
  }

  paths.forEach(replaceColor)
  svg.children = paths

  return doc
}

module.exports = {
  svgoConfig: {
    plugins: [
      {
        name: 'preset-default',
        params: {
          overrides: {
            removeViewBox: false,
          },
        },
      },

      {
        name: 'removeDimensions',
        active: true,
      },
      {
        name: 'removeXMLNS',
        active: true,
      },
      {
        name: 'prefixIds',
        active: true,
      },
      {
        name: 'replaceColorsInLogo',
        type: 'full',
        description: 'Replace colors in Logo',
        fn: replaceColorsInLogo,
      },
    ],
  },
}
