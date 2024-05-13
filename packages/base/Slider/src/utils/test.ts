import { describe, expect, it } from '@jest/globals'

import { getBgColor } from './index'
import type { GetBgColorType } from './index'

describe('getBgColor function', () => {
  describe('when markActive is true, forceInactive is false, and value is not undefined', () => {
    it('returns "bg-blue-500"', () => {
      const options: GetBgColorType = {
        markActive: true,
        forceInactive: false,
        value: 0,
      }
      const bgColor = getBgColor(options)

      expect(bgColor).toBe('bg-blue-500')
    })
  })

  describe('when markActive is true, forceInactive is false, and value is undefined', () => {
    it('returns "bg-gray-500"', () => {
      const options: GetBgColorType = {
        markActive: true,
        forceInactive: false,
        value: undefined,
      }
      const bgColor = getBgColor(options)

      expect(bgColor).toBe('bg-gray-500')
    })
  })

  describe('when markActive is true, forceInactive is true', () => {
    const options: GetBgColorType = { markActive: true, forceInactive: true }

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

    describe('and forceInactive is false', () => {
      it('returns "bg-gray-500" regardless of value', () => {
        let bgColor = getBgColor({
          ...options,
          forceInactive: false,
          value: 10,
        })

        expect(bgColor).toBe('bg-gray-500')

        bgColor = getBgColor({
          ...options,
          forceInactive: false,
          value: undefined,
        })

        expect(bgColor).toBe('bg-gray-500')
      })
    })

    describe('and forceInactive is true', () => {
      it('returns "bg-gray-500" regardless of value', () => {
        let bgColor = getBgColor({ ...options, forceInactive: true, value: 10 })

        expect(bgColor).toBe('bg-gray-500')

        bgColor = getBgColor({
          ...options,
          forceInactive: true,
          value: undefined,
        })

        expect(bgColor).toBe('bg-gray-500')
      })
    })
  })
})
