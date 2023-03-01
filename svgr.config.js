const ICON_CLEANUP_CONFIG = {
  '/logo.svg': {
    mergePaths: false,
    removeFill: false,
    replaceColors: {
      '#262d3d': 'var(--logo-text-color)',
      '#204ecf': 'var(--logo-emblem-color)',
    },
  },
  '/picasso-pictograms/': {
    skip: true
  }
}

const getCleanupConfig = (svgPath) => {
  for (const [key, value] of Object.entries(ICON_CLEANUP_CONFIG)) {
    if (svgPath.indexOf(key) > -1) {
      return value
    }
  }

  return {}
}

const cleanupSketch = (doc, params, extra) => {
  const config = getCleanupConfig(extra.path)
  if (config.skip) {
    return doc
  }

  const svg = doc.querySelector('svg')
  let paths = null

  if (config.mergePaths !== false) {
    paths = svg.querySelector('path')
  } else {
    paths = svg.querySelectorAll('path')
  }

  const cleanupAttributes = node => {
    node.removeAttr('id')

    if (config.removeFill !== false) {
      node.removeAttr('fill')
    } else {
      // attempt to replace colors
      const color = node.attr('fill')
      const currentColor = color && color.value.toLowerCase()

      if (color && config.replaceColors && config.replaceColors[currentColor]) {
        color.value = config.replaceColors[currentColor]
      }
    }
  }

  if (config.mergePaths !== false) {
    cleanupAttributes(paths)
    svg.children = [paths]
  } else {
    paths.forEach(cleanupAttributes)
    svg.children = paths
  }

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
        name: 'removeAttrs',
        params: {
          attrs: '(stroke|width|height|xmlns.*)',
        },
      },
      {
        name: 'cleanupSketch',
        type: 'full',
        description: 'Cleanup svg after export from sketch',
        fn: cleanupSketch,
      },
    ],
  },
}
