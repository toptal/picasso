import { getBackgroundAndTextColorClasses } from './get-background-and-text-color-classes'
import type { DayState } from '../types'

describe('getBackgroundAndTextColorClasses', () => {
  describe('when day is selected', () => {
    it('returns bg-blue-500 and text-white', () => {
      const state = { isSelected: true } as DayState

      expect(getBackgroundAndTextColorClasses(state)).toBe(
        'bg-blue-500 text-white'
      )
    })
  })

  describe('when weekend is disabled', () => {
    it('returns text-gray-500 and bg-gray-100', () => {
      const state = { isDisabled: true, isWeekend: true } as DayState

      expect(getBackgroundAndTextColorClasses(state)).toBe(
        'text-gray-500 bg-gray-100'
      )
    })
  })

  describe('when non-weekend is disabled', () => {
    it('returns text-gray-500 and bg-white for disabled non-weekend day', () => {
      const state = { isDisabled: true, isWeekend: false } as DayState

      expect(getBackgroundAndTextColorClasses(state)).toBe(
        'text-gray-500 bg-white'
      )
    })
  })

  describe('when day is a weekend', () => {
    it('returns bg-gray-100 and text-black for weekend day', () => {
      const state = { isWeekend: true } as DayState

      expect(getBackgroundAndTextColorClasses(state)).toBe(
        'bg-gray-100 text-black'
      )
    })

    describe('when weekend is outside', () => {
      it('returns bg-gray-100 and text-gray-600 for weekend outside day', () => {
        const state = { isWeekend: true, isOutside: true } as DayState

        expect(getBackgroundAndTextColorClasses(state)).toBe(
          'bg-gray-100 text-gray-600'
        )
      })
    })
  })

  describe('when day is part of range', () => {
    describe('when day is in range middle', () => {
      it('returns bg-blue-100 and text-black', () => {
        const state = { isRangeMiddle: true } as DayState

        expect(getBackgroundAndTextColorClasses(state)).toBe(
          'bg-blue-100 text-black'
        )
      })
    })

    describe('when day is range start', () => {
      it('returns bg-blue-500 and text-white', () => {
        const state = { isRangeStart: true } as DayState

        expect(getBackgroundAndTextColorClasses(state)).toBe(
          'bg-blue-500 text-white'
        )
      })
    })

    describe('when day is range end', () => {
      it('returns bg-blue-500 and text-white for range end', () => {
        const state = { isRangeEnd: true } as DayState

        expect(getBackgroundAndTextColorClasses(state)).toBe(
          'bg-blue-500 text-white'
        )
      })
    })
  })
})
