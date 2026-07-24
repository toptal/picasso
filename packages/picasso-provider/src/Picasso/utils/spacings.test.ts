import { spacingToPx, spacingToRem } from './spacings'
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
    describe('when spacing is a number', () => {
      it('converts to rem', () => {
        expect(spacingToRem(1)).toBe('1rem')
        expect(spacingToRem(2.5)).toBe('2.5rem')
      })
    })

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

    describe('when spacing is a string Picasso spacing', () => {
      it('converts to rem', () => {
        expect(spacingToRem('xsmall')).toBe('0.5rem')
        expect(spacingToRem('small')).toBe('1rem')
        expect(spacingToRem('medium')).toBe('1.5rem')
        expect(spacingToRem('large')).toBe('2rem')
        expect(spacingToRem('xlarge')).toBe('2.5rem')
      })
    })
  })

  describe('spacingToPx', () => {
    it('converts each Picasso spacing to px against the 16px base', () => {
      expect(spacingToPx(SPACING_0)).toBe('0px')
      expect(spacingToPx(SPACING_1)).toBe('4px')
      expect(spacingToPx(SPACING_2)).toBe('8px')
      expect(spacingToPx(SPACING_3)).toBe('12px')
      expect(spacingToPx(SPACING_4)).toBe('16px')
      expect(spacingToPx(SPACING_6)).toBe('24px')
      expect(spacingToPx(SPACING_8)).toBe('32px')
      expect(spacingToPx(SPACING_10)).toBe('40px')
      expect(spacingToPx(SPACING_12)).toBe('48px')
    })

    it('treats a bare number as rem and scales it to px', () => {
      expect(spacingToPx(1)).toBe('16px')
      expect(spacingToPx(2.5)).toBe('40px')
    })

    it('resolves a string Picasso spacing to px', () => {
      expect(spacingToPx('xsmall')).toBe('8px')
      expect(spacingToPx('small')).toBe('16px')
      expect(spacingToPx('medium')).toBe('24px')
      expect(spacingToPx('large')).toBe('32px')
      expect(spacingToPx('xlarge')).toBe('40px')
    })

    it('stays consistent with spacingToRem', () => {
      expect(spacingToPx(SPACING_4)).toBe('16px')
      expect(spacingToRem(SPACING_4)).toBe('1rem')
    })

    describe('when a custom base font size is passed', () => {
      it('scales against that base instead of 16', () => {
        expect(spacingToPx(SPACING_4, 10)).toBe('10px')
        expect(spacingToPx(SPACING_8, 10)).toBe('20px')
        expect(spacingToPx(SPACING_0, 10)).toBe('0px')
      })
    })
  })
})
