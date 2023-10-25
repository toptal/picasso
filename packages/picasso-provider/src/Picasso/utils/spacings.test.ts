import { spacingToRem } from './spacings'
import {
  SPACING_0,
  SPACING_1,
  SPACING_2,
  SPACING_3,
  SPACING_4,
  SPACING_6,
  SPACING_8,
  SPACING_10,
  SPACING_12,
} from '../config/spacings'

describe('spacingUtils', () => {
  describe('spacingToRem', () => {
    describe('when spacing is a valid Picasso spacing', () => {
      it('converts to rem', () => {
        expect(spacingToRem(SPACING_0)).toBe('0rem')
        expect(spacingToRem(SPACING_1)).toBe('0.25rem')
        expect(spacingToRem(SPACING_2)).toBe('0.5rem')
        expect(spacingToRem(SPACING_3)).toBe('0.75rem')
        expect(spacingToRem(SPACING_4)).toBe('1rem')
        expect(spacingToRem(SPACING_6)).toBe('1.5rem')
        expect(spacingToRem(SPACING_8)).toBe('2rem')
        expect(spacingToRem(SPACING_10)).toBe('2.5rem')
        expect(spacingToRem(SPACING_12)).toBe('3rem')
      })
    })
  })
})
