import * as picassoTailwindConfig from '@toptal/picasso-tailwind'

import { CONFIG, PICASSO_TW_FONT_SIZES, twMerge } from './twMerge'

describe('extendTailwindMerge call', () => {})

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

  describe('Config', () => {
    // This test should detect if the config was changed to
    // help identify cases when major update is needed
    it('was not changed', () => {
      expect(CONFIG).toMatchSnapshot()
    })
  })
})
