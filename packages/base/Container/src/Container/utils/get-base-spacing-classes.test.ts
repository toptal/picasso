import { describe, expect, it } from '@jest/globals'
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
          spacing1Gap: 'gap-1',
          spacing2Padding: 'p-2',
          topSpacing3Margin: 'mt-3',
          rightSpacing4Margin: 'mr-4',
          bottomSpacing6Margin: 'mb-6',
          leftSpacing8Margin: 'ml-8',
        }
      )

      expect(result).toEqual(['p-2', 'gap-1', 'mt-3', 'mr-4', 'mb-6', 'ml-8'])
    })
  })
})
