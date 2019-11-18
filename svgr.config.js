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
  const svg = doc.querySelector('svg')
  const path = svg.querySelector('path')

  path.removeAttr('id')
  svg.content = [path]

  return doc
}
