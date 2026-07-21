import { describe, expect, it } from '@jest/globals'

import { getTrackStyles } from './index'

describe('getTrackStyles function', () => {
  describe('when the slider has a single value', () => {
    it('stops the indicator and the end rail at the thumb edge', () => {
      const { railStart, railEnd, indicator } = getTrackStyles({
        values: [50],
        min: 0,
        max: 100,
        hasThumbGap: true,
      })

      expect(railStart).toEqual({
        insetInlineStart: 0,
        width: 'calc(50% - 9.5px)',
      })
      expect(railEnd).toEqual({
        insetInlineStart: 'calc(50% + 9.5px)',
        insetInlineEnd: 0,
      })
      expect(indicator).toEqual({ width: 'calc(50% - 9.5px)' })
    })
  })

  describe('when the slider has a range value', () => {
    it('insets the indicator from both thumbs and the rails from the outer sides', () => {
      const { railStart, railEnd, indicator } = getTrackStyles({
        values: [25, 75],
        min: 0,
        max: 100,
        hasThumbGap: true,
      })

      expect(railStart.width).toBe('calc(25% - 9.5px)')
      expect(railEnd.insetInlineStart).toBe('calc(75% + 9.5px)')
      expect(indicator).toEqual({
        insetInlineStart: 'calc(25% + 9.5px)',
        width: 'calc(50% - 19px)',
      })
    })
  })

  describe('when the thumb gap is disabled', () => {
    it('keeps the track continuous', () => {
      const { railStart, railEnd, indicator } = getTrackStyles({
        values: [50],
        min: 0,
        max: 100,
        hasThumbGap: false,
      })

      expect(railStart.width).toBe('calc(50% - 0px)')
      expect(railEnd.insetInlineStart).toBe('calc(50% + 0px)')
      expect(indicator).toEqual({ width: 'calc(50% - 0px)' })
    })
  })

  describe('when min and max are custom', () => {
    it('maps values to percents of the range', () => {
      const { indicator } = getTrackStyles({
        values: [15],
        min: 10,
        max: 20,
        hasThumbGap: true,
      })

      expect(indicator).toEqual({ width: 'calc(50% - 9.5px)' })
    })
  })
})
