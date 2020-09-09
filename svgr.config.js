const path = require('path')

const ICON_CONFIG = {
  'logo.svg': {
    mergePaths: false,
    removeFill: false,
    replaceColors: {
      '#262d3d': 'var(--logo-text-color)',
      '#204ecf': 'var(--logo-emblem-color)'
    }
  }
}

const cleanupSketch = (doc, params, extra) => {
  const fileName = path.basename(extra.path)
  const config = ICON_CONFIG[fileName] || {}

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
    svg.content = [paths]
  } else {
    paths.forEach(cleanupAttributes)
    svg.content = paths
  }

  return doc
}

module.exports = {
  svgoConfig: {
    plugins: [
      {
        cleanupSketch: {
          type: 'full',
          description: 'Cleanup svg after export from sketch',
          fn: cleanupSketch
        }
      },
      {
        removeAttrs: {
          attrs: '(stroke|width|height)'
        }
      },
      {
        removeViewBox: false
      },
      {
        removeDimensions: true
      }
    ]
  }
}
