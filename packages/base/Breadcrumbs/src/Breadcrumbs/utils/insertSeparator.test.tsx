import React from 'react'
import { render } from '@toptal/picasso-test-utils'

import insertSeparator from './insertSeparator'

describe('insertSeparator', () => {
  describe('when given an empty array', () => {
    it('should return an empty array', () => {
      const items: React.ReactElement[] = []
      const result = insertSeparator(items)

      expect(result).toEqual([])
    })
  })

  describe('when the array has one item', () => {
    it('should return the same array with the item', () => {
      const items: React.ReactElement[] = [<div key='item-0'>Item 0</div>]
      const result = insertSeparator(items)

      expect(result).toEqual(items)
    })
  })

  describe('when the array contains multiple items', () => {
    it('should return an array with separators between the items', () => {
      const items: React.ReactElement[] = [
        <div key='item-0'>Item 0</div>,
        <div key='item-1'>Item 1</div>,
        <div key='item-2'>Item 2</div>,
      ]

      const result = insertSeparator(items)
      const { container } = render(<div>{result}</div>)

      // There should be two separators for three items
      const separators = container.querySelectorAll('li[aria-hidden]')

      expect(separators).toHaveLength(2)

      // Check if separators have the correct class
      container.querySelectorAll('li').forEach(li => {
        expect(li).toHaveClass('flex select-none mx-1')
      })
    })

    it('should not insert a separator after the last item', () => {
      const items: React.ReactElement[] = [
        <div key='item-0'>Item 0</div>,
        <div key='item-1'>Item 1</div>,
      ]
      const result = insertSeparator(items)
      const { container } = render(<div>{result}</div>)

      // The last element should be the second item, not a separator
      const lastElement = container.querySelector('div:last-child')

      expect(lastElement).toHaveTextContent('Item 1')
      expect(lastElement).not.toHaveAttribute('aria-hidden')
    })
  })
})
