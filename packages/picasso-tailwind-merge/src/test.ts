import * as picassoTailwindConfig from '@toptal/picasso-tailwind'

import { PICASSO_TW_FONT_SIZES, twMerge } from './twMerge'

describe('twMerge', () => {
  it('merges font size classes correctly', () => {
    expect(twMerge('font-inherit-size text-button-large text-2xs')).toBe(
      'text-2xs'
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
})
