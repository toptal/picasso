import { getBgColor, getTooltipHorizontalPosition } from './'
import type { GetBgColorType, GetTooltipHorizontalPosition } from './'

describe('getBgColor function', () => {
  describe('when markActive is true, hideTrack is false, and value is not undefined', () => {
    it('returns "bg-blue-500"', () => {
      const options: GetBgColorType = {
        markActive: true,
        hideTrack: false,
        value: 0,
      }
      const bgColor = getBgColor(options)

      expect(bgColor).toBe('bg-blue-500')
    })
  })

  describe('when markActive is true, hideTrack is false, and value is undefined', () => {
    it('returns "bg-gray-500"', () => {
      const options: GetBgColorType = {
        markActive: true,
        hideTrack: false,
        value: undefined,
      }
      const bgColor = getBgColor(options)

      expect(bgColor).toBe('bg-gray-500')
    })
  })

  describe('when markActive is true, hideTrack is true', () => {
    const options: GetBgColorType = { markActive: true, hideTrack: true }

    describe('and value is not undefined', () => {
      it('returns "bg-gray-500"', () => {
        const bgColor = getBgColor({ ...options, value: 10 })

        expect(bgColor).toBe('bg-gray-500')
      })
    })

    describe('and value is undefined', () => {
      it('returns "bg-gray-500"', () => {
        const bgColor = getBgColor({ ...options, value: undefined })

        expect(bgColor).toBe('bg-gray-500')
      })
    })
  })

  describe('when markActive is false', () => {
    const options: GetBgColorType = { markActive: false }

    describe('and hideTrack is false', () => {
      it('returns "bg-gray-500" regardless of value', () => {
        let bgColor = getBgColor({ ...options, hideTrack: false, value: 10 })

        expect(bgColor).toBe('bg-gray-500')

        bgColor = getBgColor({ ...options, hideTrack: false, value: undefined })

        expect(bgColor).toBe('bg-gray-500')
      })
    })

    describe('and hideTrack is true', () => {
      it('returns "bg-gray-500" regardless of value', () => {
        let bgColor = getBgColor({ ...options, hideTrack: true, value: 10 })

        expect(bgColor).toBe('bg-gray-500')

        bgColor = getBgColor({ ...options, hideTrack: true, value: undefined })

        expect(bgColor).toBe('bg-gray-500')
      })
    })
  })
})

describe('getPosition', () => {
  const options: GetTooltipHorizontalPosition = {
    shouldUpdatePosition: false,
    index: 0,
  }

  describe('when the value labels do not overflow', () => {
    it('exits the function', () => {
      const position = getTooltipHorizontalPosition(options)

      expect(position).toBeUndefined()
    })
  })

  describe('when the range slider is collapsed', () => {
    it('exits the function', () => {
      const position = getTooltipHorizontalPosition({
        ...options,
        isRangeSliderCollapsed: true,
      })

      expect(position).toBeUndefined()
    })
  })

  describe('when index is different than 0', () => {
    it('returns the left placement class', () => {
      const position = getTooltipHorizontalPosition({ ...options, index: -1 })

      expect(position).toBe('left-[calc(100%-13px)]')
    })
  })

  describe('when index is 0', () => {
    it('returns the right placement class', () => {
      const position = getTooltipHorizontalPosition({ ...options, index: 0 })

      expect(position).toBe('right-[calc(100%-13px)]')
    })
  })
})
