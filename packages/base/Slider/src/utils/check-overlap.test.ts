import { describe, expect, it } from '@jest/globals'

import { checkOverlap } from './check-overlap' // Update your checkOverlap import

describe('checkOverlap', () => {
  describe('when labels do not overlap', () => {
    it('returns false', () => {
      const firstLabelRect = { right: 0, width: 20 } as DOMRect
      const secondLabelRect = { left: 30, width: 20 } as DOMRect
      const isPartiallyOverlaped = false

      expect(
        checkOverlap({ firstLabelRect, secondLabelRect, isPartiallyOverlaped })
      ).toBe(false)
    })
  })

  describe('when labels do overlap', () => {
    it('returns true', () => {
      const firstLabelRect = { right: 30, width: 20 } as DOMRect
      const secondLabelRect = { left: 40, width: 20 } as DOMRect
      const isPartiallyOverlaped = false

      expect(
        checkOverlap({ firstLabelRect, secondLabelRect, isPartiallyOverlaped })
      ).toBe(true)
    })
  })

  describe('when labels partially overlaped in previous render', () => {
    it('returns true if they would still overlap in a non-overlapped state', () => {
      const firstLabelRect = { right: 10, width: 20 } as DOMRect
      const secondLabelRect = { left: 25, width: 20 } as DOMRect
      const isPartiallyOverlaped = true

      expect(
        checkOverlap({ firstLabelRect, secondLabelRect, isPartiallyOverlaped })
      ).toBe(true)
    })

    it('returns false if they would not overlap in a non-overlapped state', () => {
      const firstLabelRect = { right: 10, width: 20 } as DOMRect
      const secondLabelRect = { left: 30, width: 20 } as DOMRect
      const isPartiallyOverlaped = false

      expect(
        checkOverlap({ firstLabelRect, secondLabelRect, isPartiallyOverlaped })
      ).toBe(false)
    })
  })
})
