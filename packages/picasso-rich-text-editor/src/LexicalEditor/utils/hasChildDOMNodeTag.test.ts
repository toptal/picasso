import { JSDOM } from 'jsdom'

import hasChildDOMNodeTag from './hasChildDOMNodeTag'

describe('hasChildDOMNodeTag', () => {
  const { document } = new JSDOM('').window

  describe('when node has no children', () => {
    it('returns false', () => {
      const node = document.createElement('div')

      expect(hasChildDOMNodeTag(node, 'SPAN')).toBe(false)
    })
  })

  describe('when node does not have child with specific tag', () => {
    it('returns false', () => {
      const node = document.createElement('div')
      const child = document.createElement('p')

      node.appendChild(child)

      expect(hasChildDOMNodeTag(node, 'SPAN')).toBe(false)
    })
  })

  describe('when node has a child with the specific tag', () => {
    it('returns true', () => {
      const node = document.createElement('div')
      const child = document.createElement('span')

      node.appendChild(child)

      expect(hasChildDOMNodeTag(node, 'SPAN')).toBe(true)
    })
  })

  describe('when node has a nested child with the specific tag', () => {
    it('returns false', () => {
      const node = document.createElement('div')
      const child = document.createElement('p')
      const nestedChild = document.createElement('span')

      child.appendChild(nestedChild)
      node.appendChild(child)

      expect(hasChildDOMNodeTag(node, 'SPAN')).toBe(false)
    })
  })
})
