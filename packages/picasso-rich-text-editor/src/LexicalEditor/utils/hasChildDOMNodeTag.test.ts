// eslint-disable-next-line import/no-extraneous-dependencies
import { JSDOM } from 'jsdom'

import hasChildDOMNodeTag from './hasChildDOMNodeTag'

describe('hasChildDOMNodeTag', () => {
  // Set up a JSDOM document and window objects
  const { document } = new JSDOM('').window

  // Test to check if function works with an empty node
  describe('when node has no children', () => {
    it('should return false', () => {
      const node = document.createElement('div')

      expect(hasChildDOMNodeTag(node, 'SPAN')).toBe(false)
    })
  })

  // Test to check if function works with a node that does not have a specific child tag
  describe('when node does not have child with specific tag', () => {
    it('should return false', () => {
      const node = document.createElement('div')
      const child = document.createElement('p')

      node.appendChild(child)

      expect(hasChildDOMNodeTag(node, 'SPAN')).toBe(false)
    })
  })

  // Test to check if function works with a node that has a specific child tag
  describe('when node has a child with the specific tag', () => {
    it('should return true', () => {
      const node = document.createElement('div')
      const child = document.createElement('span')

      node.appendChild(child)

      expect(hasChildDOMNodeTag(node, 'SPAN')).toBe(true)
    })
  })

  // Test to check if function works with a only direct child
  describe('when node has a nested child with the specific tag', () => {
    it('should return false', () => {
      const node = document.createElement('div')
      const child = document.createElement('p')
      const nestedChild = document.createElement('span')

      child.appendChild(nestedChild)
      node.appendChild(child)

      expect(hasChildDOMNodeTag(node, 'SPAN')).toBe(false)
    })
  })
})
