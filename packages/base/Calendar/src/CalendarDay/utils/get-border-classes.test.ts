import { getBorderClasses } from './get-border-classes'
import type { DayState } from '../types'

describe('getBorderClasses', () => {
  describe('when day is selected', () => {
    it('returns border-none and rounded-sm for selected day', () => {
      const state = { isSelected: true } as DayState

      expect(getBorderClasses(state)).toBe('border-none rounded-sm')
    })
  })

  describe('when day is a weekend', () => {
    it('returns solid border with specific width and rounded-md', () => {
      const state = { isWeekend: true } as DayState

      expect(getBorderClasses(state)).toBe(
        'border-solid border-[0.25rem] border-white rounded-md'
      )
    })
  })

  describe('when day is not a weekend', () => {
    it('returns border-none and rounded-none', () => {
      const state = {} as DayState

      expect(getBorderClasses(state)).toBe('border-none rounded-none')
    })
  })

  describe('when day is part of range', () => {
    describe('when day is in range middle', () => {
      it('returns border-none and rounded-none', () => {
        const state = { isRangeMiddle: true } as DayState

        expect(getBorderClasses(state)).toBe('border-none rounded-none')
      })
    })

    describe('when day is range end', () => {
      it('returns border-none and rounded-sm', () => {
        const state = { isRangeEnd: true } as DayState

        expect(getBorderClasses(state)).toBe('border-none rounded-sm')
      })
    })

    it('returns border-none and rounded-sm for range start', () => {
      const state = { isRangeStart: true } as DayState

      expect(getBorderClasses(state)).toBe('border-none rounded-sm')
    })
  })
})
