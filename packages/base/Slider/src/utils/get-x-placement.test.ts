import { describe, expect, it } from '@jest/globals'

import { getXPlacement } from './get-x-placement' // Update your getXPlacement import

describe('getXPlacement', () => {
  const { innerWidth } = window

  beforeEach(() => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1000,
    })
  })

  afterEach(() => {
    window.innerWidth = innerWidth
  })

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
      const rect = { width: 20, left: 950, right: 970 } as DOMRect
      const isOverlaped = false
      const isFirstLabel = true
      const currentPlacement = 'center'

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
