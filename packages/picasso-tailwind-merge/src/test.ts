import * as picassoTailwindConfig from '@toptal/picasso-tailwind'

import {
  CONFIG,
  PICASSO_TW_FONT_SIZES,
  PICASSO_TW_SHADOWS,
  twMerge,
} from './twMerge'

describe('twMerge', () => {
  it('merges font size classes correctly', () => {
    expect(twMerge('font-inherit-size text-button-large text-2xs')).toBe(
      'text-2xs'
    )
  })

  it('merges box shadow classes correctly', () => {
    expect(twMerge('shadow-1 shadow-5')).toBe('shadow-5')
    expect(twMerge('shadow-5 shadow-none')).toBe('shadow-none')
    expect(twMerge('shadow-1 shadow-[0_0_4px_red]')).toBe(
      'shadow-[0_0_4px_red]'
    )
    // a shadow color is not a box shadow conflict
    expect(twMerge('shadow-5 shadow-blue-500/[.48]')).toBe(
      'shadow-5 shadow-blue-500/[.48]'
    )
  })

  describe('PICASSO_TW_FONT_SIZES', () => {
    it('contains all font sizes from picasso-tailwind', () => {
      expect(PICASSO_TW_FONT_SIZES).toStrictEqual(
        Object.keys(picassoTailwindConfig.theme.fontSize).map(
          key => `text-${key}`
        )
      )
    })
  })

  describe('PICASSO_TW_SHADOWS', () => {
    it('contains all box shadows from picasso-tailwind', () => {
      expect(PICASSO_TW_SHADOWS).toStrictEqual(
        Object.keys(picassoTailwindConfig.theme.boxShadow).map(
          key => `shadow-${key}`
        )
      )
    })
  })

  describe('Tailwind v4 class vocabulary', () => {
    it('merges utilities that only exist in Tailwind v4', () => {
      expect(twMerge('min-h-0 min-h-auto')).toBe('min-h-auto')
      expect(twMerge('outline-none outline-hidden')).toBe('outline-hidden')
      expect(twMerge('translate-x-0 translate-px')).toBe('translate-px')
    })

    it('merges arbitrary numeric values against scale values', () => {
      expect(twMerge('delay-200 delay-225')).toBe('delay-225')
    })

    it('keeps a gradient direction separate from a background color', () => {
      expect(twMerge('bg-white bg-linear-to-b')).toBe('bg-white bg-linear-to-b')
    })

    it('passes unknown classes through untouched', () => {
      expect(twMerge('min-h-auto dellay-225')).toBe('min-h-auto dellay-225')
    })
  })

  describe('Config', () => {
    // This test should detect if the config was changed to
    // help identify cases when major update is needed
    it('was not changed', () => {
      expect(CONFIG).toMatchSnapshot()
    })
  })
})
