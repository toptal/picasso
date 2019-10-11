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
          attrs: '(fill|stroke|width|height)'
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

function cleanupSketch(doc) {
  let svg = doc.querySelector('svg')
  let path = svg.querySelector('path')

  path.removeAttr('id')
  svg.content = [path]

  return doc
}
