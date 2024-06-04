import { describe, expect, it } from '@jest/globals'

import { getXPlacement } from './get-x-placement' // Update your getXPlacement import

describe('getXPlacement', () => {
  describe('when leftBoundary < gap', () => {
    it('returns right', () => {
      const rect = { width: 20, left: -5, right: 0 } as DOMRect
      const isOverlaped = false
      const isFirstLabel = true
      const currentPlacement = 'center'

      expect(
        getXPlacement({ rect, isOverlaped, isFirstLabel, currentPlacement })
      ).toBe('right')
    })
  })

  describe('when rightBoundary > window.innerWidth - gap', () => {
    it('returns left', () => {
      const rect = { width: 100, left: 920, right: 1020 } as DOMRect
      const isOverlaped = false
      const isFirstLabel = true
      const currentPlacement = 'center'

      expect(
        getXPlacement({ rect, isOverlaped, isFirstLabel, currentPlacement })
      ).toBe('left')
    })
  })

  describe('when rightBoundary < window.innerWidth - gap', () => {
    it('returns left', () => {
      const rect = { width: 100, left: 870, right: 970 } as DOMRect
      const isOverlaped = false
      const isFirstLabel = true
      const currentPlacement = 'center'

      expect(
        getXPlacement({ rect, isOverlaped, isFirstLabel, currentPlacement })
      ).toBe('center')
    })
  })

  describe('when currentPlacement is left and rightBoundary > window.innerWidth - gap', () => {
    it('returns left', () => {
      const rect = { width: 100, left: 870, right: 970 } as DOMRect
      const isOverlaped = true
      const isFirstLabel = false
      const currentPlacement = 'left'

      expect(
        getXPlacement({ rect, isOverlaped, isFirstLabel, currentPlacement })
      ).toBe('left')
    })
  })

  describe('when labels are overlapped', () => {
    const rect = { width: 20, left: 50, right: 70 } as DOMRect
    const isOverlaped = true

    it('returns left for the first label', () => {
      const isFirstLabel = true
      const currentPlacement = 'center'

      expect(
        getXPlacement({ rect, isOverlaped, isFirstLabel, currentPlacement })
      ).toBe('left')
    })

    it('returns right for the not first label', () => {
      const isFirstLabel = false
      const currentPlacement = 'center'

      expect(
        getXPlacement({ rect, isOverlaped, isFirstLabel, currentPlacement })
      ).toBe('right')
    })
  })

  describe('when none of conditions are met', () => {
    it('returns center', () => {
      const rect = { width: 20, left: 100, right: 120 } as DOMRect
      const isOverlaped = false
      const isFirstLabel = false
      const currentPlacement = 'center'

      expect(
        getXPlacement({ rect, isOverlaped, isFirstLabel, currentPlacement })
      ).toBe('center')
    })
  })
})
