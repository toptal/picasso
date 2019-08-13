const { JSDOM } = require('jsdom')

const dom = new JSDOM('', { pretendToBeVisual: true })

global.document = dom.window.document
global.document.createRange = () => ({
  setStart: () => {},
  setEnd: () => {},
  commonAncestorContainer: {
    nodeName: 'BODY',
    ownerDocument: dom.window.document
  }
})
