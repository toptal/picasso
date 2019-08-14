const { JSDOM } = require('jsdom')

const dom = new JSDOM('', { pretendToBeVisual: true })

global.document = dom.window.document
// This is needed for rendering tooltips
// can be removed once https://github.com/jsdom/jsdom/issues/317 is fixed
global.document.createRange = () => ({
  setStart: () => {},
  setEnd: () => {},
  commonAncestorContainer: {
    nodeName: 'BODY',
    ownerDocument: dom.window.document
  }
})
