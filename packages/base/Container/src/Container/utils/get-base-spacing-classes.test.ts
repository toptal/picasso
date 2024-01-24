import {
  SPACING_1,
  SPACING_2,
  SPACING_3,
  SPACING_4,
  SPACING_6,
  SPACING_8,
} from '@toptal/picasso-provider'

import getBaseSpacingClasses from './get-base-spacing-classes'

describe('getBaseSpacingClasses', () => {
  describe('when spacing properties are provided as BASE spacings', () => {
    it('returns list of matching CSS classes', () => {
      const result = getBaseSpacingClasses(
        {
          gap: SPACING_1,
          padded: SPACING_2,
          top: SPACING_3,
          right: SPACING_4,
          bottom: SPACING_6,
          left: SPACING_8,
          randomProperty: SPACING_6,
        },
        {
          spacing1Gap: 'spacing1Gap-class',
          spacing2Padding: 'spacing2Padding-class',
          topSpacing3Margin: 'topSpacing3Margin-class',
          rightSpacing4Margin: 'rightSpacing4Margin-class',
          bottomSpacing6Margin: 'bottomSpacing6Margin-class',
          leftSpacing8Margin: 'leftSpacing8Margin-class',
        }
      )

      expect(result).toEqual([
        'spacing2Padding-class',
        'spacing1Gap-class',
        'topSpacing3Margin-class',
        'rightSpacing4Margin-class',
        'bottomSpacing6Margin-class',
        'leftSpacing8Margin-class',
      ])
    })
  })
})
