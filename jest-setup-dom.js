const { JSDOM } = require('jsdom')

const dom = new JSDOM('', { pretendToBeVisual: true })

global.document = dom.window.document
