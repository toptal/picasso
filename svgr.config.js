/**
 * @type {import('svgo').Config}
 */

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
    skip: true,
  },
}

const ATTRIBUTES_TO_REMOVE_IN_ICONS = '(stroke|width|height|xmlns.*)'
const ATTRIBUTES_TO_REMOVE_IN_PICTOGRAMS = '(width|height|xmlns.*)'

const getCleanupConfig = svgPath => {
  for (const [key, value] of Object.entries(ICON_CLEANUP_CONFIG)) {
    if (svgPath.indexOf(key) > -1) {
      return value
    }
  }

  return {}
}

const findChildWithName = (node, name) => {
  if (node.type === 'element' && node.name === name) {
    return node
  }

  if (node.children) {
    for (const child of node.children) {
      const found = findChildWithName(child, name)

      if (found) {
        return found
      }
    }
  }

  return null
}

const findAllChildrenWithName = (node, name) => {
  let result = []

  if (node.type === 'element' && node.name === name) {
    result.push(node)
  }

  if (node.children) {
    for (const child of node.children) {
      const found = findAllChildrenWithName(child, name)

      result = result.concat(found)
    }
  }

  return result
}

const updateAttributes = (node, attributeModifier) => {
  if (node.type === 'element') {
    node.attributes = attributeModifier(node.attributes)
  }

  if (node.children) {
    for (const child of node.children) {
      updateAttributes(child, attributeModifier)
    }
  }
}

const removeAttribute = attributeName => attributes => {
  // Make a copy of the attributes object to avoid mutating the original one
  const newAttributes = { ...attributes }

  // Remove the specified attribute from the copy
  delete newAttributes[attributeName]

  return newAttributes
}

const cleanupAttributes = config => node => {
  updateAttributes(node, removeAttribute('id'))

  if (config.removeFill !== false) {
    updateAttributes(node, removeAttribute('fill'))
  } else {
    // attempt to replace colors
    const replaceColors = attributes => {
      const color = attributes['fill']
      const currentColor = color && color.toLowerCase()

      if (color && config.replaceColors && config.replaceColors[currentColor]) {
        return {
          ...attributes,
          fill: config.replaceColors[currentColor],
        }
      }

      return attributes
    }

    updateAttributes(node, replaceColors)
  }
}

const cleanupSketch = (root, params, info) => {
  const config = getCleanupConfig(info.path)

  if (config.skip) {
    return root
  }

  const svg = root.children[0]

  let paths = null

  if (config.mergePaths !== false) {
    paths = findChildWithName(svg, 'path')
  } else {
    paths = findAllChildrenWithName(svg, 'path')
  }

  if (config.mergePaths !== false) {
    cleanupAttributes(config)(paths)
    svg.children = [paths]
  } else {
    paths.forEach(cleanupAttributes(config))
    svg.children = paths
  }

  return root
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
      },
      {
        name: 'removeAttrs',
        fn: (node, _, info) => {
          const isPictogram = info.path.indexOf('picasso-pictograms') > -1

          const attrsToRemove = isPictogram
            ? ATTRIBUTES_TO_REMOVE_IN_PICTOGRAMS
            : ATTRIBUTES_TO_REMOVE_IN_ICONS

          const traverse = (node) => {
            if (node.attributes) {
              Object.keys(node.attributes).forEach((attr) => {
                if (new RegExp(attrsToRemove).test(attr)) {
                  delete node.attributes[attr]
                }
              })
            }

            if (node.children) {
              node.children.forEach(traverse)
            }
          }

          traverse(node)

          return node
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
