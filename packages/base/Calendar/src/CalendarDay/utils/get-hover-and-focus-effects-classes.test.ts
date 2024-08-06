import { getHoverAndFocusEffectsClasses } from './get-hover-and-focus-effects-classes'
import type { DayState } from '../types'

describe('getHoverAndFocusEffectsClasses', () => {
  describe('when day is not a weekend', () => {
    it('returns default classes', () => {
      const state = {} as DayState

      expect(getHoverAndFocusEffectsClasses(state).toString()).toBe(
        '[&]:hover:text-black [&]:focus:text-black,[&]:hover:bg-blue-500/25 [&]:focus:bg-blue-500/25,[&]:hover:rounded-sm [&]:focus:rounded-sm'
      )
    })
  })

  describe('when day is outside of displayed month', () => {
    it('returns gray text for hover and focus classes', () => {
      const state = { isOutside: true } as DayState

      expect(getHoverAndFocusEffectsClasses(state).toString()).toBe(
        '[&]:hover:text-gray-600 [&]:focus:text-gray-600,[&]:hover:bg-blue-500/25 [&]:focus:bg-blue-500/25,[&]:hover:rounded-sm [&]:focus:rounded-sm'
      )
    })
  })

  describe('when day is selected', () => {
    it('returns no classes', () => {
      const state = { isSelected: true } as DayState

      expect(getHoverAndFocusEffectsClasses(state)).toBe('')
    })
  })

  describe('when day is disabled', () => {
    it('returns no classes', () => {
      const state = { isDisabled: true } as DayState

      expect(getHoverAndFocusEffectsClasses(state)).toBe('')
    })
  })

  describe('when day is a weekend', () => {
    it('returns black text and pale blue background for hover and focus classes', () => {
      const state = { isWeekend: true } as DayState

      expect(getHoverAndFocusEffectsClasses(state).toString()).toBe(
        '[&]:hover:border-none [&]:focus:border-none,[&]:hover:border-white [&]:focus:border-white,[&]:hover:text-black [&]:focus:text-black,[&]:hover:bg-blue-500/25 [&]:focus:bg-blue-500/25,[&]:hover:rounded-sm [&]:focus:rounded-sm'
      )
    })
  })

  describe('when selection is made in the calendar', () => {
    describe('when day is a weekend and is inside of selection', () => {
      it('returns default selection classes', () => {
        const state = { isWeekend: true, isRangeMiddle: true } as DayState

        expect(getHoverAndFocusEffectsClasses(state).toString()).toBe(
          '[&]:hover:text-black [&]:focus:text-black,[&]:hover:bg-blue-500/25 [&]:focus:bg-blue-500/25,[&]:hover:rounded-sm [&]:focus:rounded-sm'
        )
      })
    })

    describe('when day is an end of selection', () => {
      it('returns white text and blue background', () => {
        const state = { isRangeEnd: true } as DayState

        expect(getHoverAndFocusEffectsClasses(state).toString()).toBe(
          '[&]:hover:text-white [&]:focus:text-white,[&]:hover:bg-blue-500 [&]:focus:bg-blue-500'
        )
      })
    })
  })
})
