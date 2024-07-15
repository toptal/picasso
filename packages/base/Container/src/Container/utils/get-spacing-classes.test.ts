import type { SpacingType } from '@toptal/picasso-provider'
import { describe, expect, it } from '@jest/globals'
import {
  isPicassoSpacing,
  isResponsiveSpacing,
  SPACING_0,
  SPACING_2,
  SPACING_4,
  SPACING_6,
  SPACING_8,
} from '@toptal/picasso-provider'

import { getSpacingStyles, getMappedClass, getResponsiveClasses } from '.'
import { SPACING_CLASSES, DEPRECATED_CLASSES } from './constants'

// Mocks for the type-checking functions
jest.mock('@toptal/picasso-provider', () => ({
  isPicassoSpacing: jest.fn(),
  isResponsiveSpacing: jest.fn(),
  SPACING_0: { baseTokenIndex: 0 },
  SPACING_2: { baseTokenIndex: 2 },
  SPACING_4: { baseTokenIndex: 4 },
  SPACING_6: { baseTokenIndex: 6 },
  SPACING_8: { baseTokenIndex: 8 },
}))

const mockedIsResposiveSpacing = isResponsiveSpacing as jest.MockedFunction<
  typeof isResponsiveSpacing
>

const mockedIsPicassoSpacing = isPicassoSpacing as jest.MockedFunction<
  typeof isPicassoSpacing
>

describe('getMappedClass', () => {
  describe('when spacing is undefined', () => {
    it('returns undefined', () => {
      expect(getMappedClass(undefined, 'gap')).toBeUndefined()
    })
  })

  describe('when spacing is a number', () => {
    it('returns undefined', () => {
      expect(getMappedClass(5, 'gap')).toBeUndefined()
    })
  })

  describe('when spacing is a Picasso spacing object', () => {
    it('returns the correct class for each type', () => {
      mockedIsPicassoSpacing.mockReturnValue(true)
      mockedIsResposiveSpacing.mockReturnValue(false)

      Object.entries(SPACING_CLASSES).forEach(([index, classes]) => {
        const spacing = { baseTokenIndex: parseInt(index) }

        Object.keys(classes).forEach(type => {
          const expectedClass = classes[type].default

          expect(
            getMappedClass(spacing as SpacingType, type as keyof typeof classes)
          ).toBe(expectedClass)
        })
      })
    })
  })

  describe('when spacing is a string (deprecated spacing)', () => {
    beforeEach(() => {
      ;(isPicassoSpacing as unknown as jest.Mock).mockReturnValue(false)
      ;(isResponsiveSpacing as unknown as jest.Mock).mockReturnValue(false)
    })

    it('returns the correct class for each type', () => {
      Object.entries(DEPRECATED_CLASSES).forEach(([spacing, classes]) => {
        Object.keys(classes).forEach(type => {
          const expectedClass = classes[type].default

          expect(
            getMappedClass(spacing as SpacingType, type as keyof typeof classes)
          ).toBe(expectedClass)
        })
      })
    })
  })
})

describe('getSpacingStyles', () => {
  describe('when provided with valid numeric gap spacing', () => {
    it('returns a style object', () => {
      const result = getSpacingStyles({
        gap: 2,
        top: 1,
        padded: 3,
        bottom: 4,
        right: 5,
      })

      expect(result).toEqual({
        gap: '2rem',
        padding: '3rem',
        marginTop: '1rem',
        marginBottom: '4rem',
        marginRight: '5rem',
        marginLeft: undefined,
      })
    })
  })

  describe('when gap spacing is undefined', () => {
    it('returns undefined', () => {
      const result = getSpacingStyles({})

      expect(result).toStrictEqual({})
    })
  })

  describe('when provided with non-numeric gap spacing', () => {
    it('returns undefined', () => {
      const result = getSpacingStyles({ gap: 'small' })

      expect(result).toStrictEqual({})
    })
  })
})

describe('getResponsiveClasses', () => {
  describe('when spacing is not responsive', () => {
    it('returns undefined', () => {
      mockedIsResposiveSpacing.mockReturnValue(false)

      expect(getResponsiveClasses(5, 'gap')).toBeUndefined()
    })
  })

  describe('when spacing is responsive', () => {
    it('returns the correct class for each type', () => {
      mockedIsResposiveSpacing.mockReturnValue(true)

      const spacing = {
        xs: SPACING_0,
        sm: SPACING_2,
        md: SPACING_4,
        lg: SPACING_6,
        xl: SPACING_8,
      }

      const expectedGapClass = [
        'xs:gap-0',
        'sm:gap-2',
        'md:gap-4',
        'lg:gap-6',
        'xl:gap-8',
      ]

      const expectedTopClass = [
        'xs:mt-0',
        'sm:mt-2',
        'md:mt-4',
        'lg:mt-6',
        'xl:mt-8',
      ]

      const expectedPaddedClass = [
        'xs:p-0',
        'sm:p-2',
        'md:p-4',
        'lg:p-6',
        'xl:p-8',
      ]

      expect(getResponsiveClasses(spacing, 'gap')).toEqual(expectedGapClass)
      expect(getResponsiveClasses(spacing, 'top')).toEqual(expectedTopClass)
      expect(getResponsiveClasses(spacing, 'padded')).toEqual(
        expectedPaddedClass
      )
    })
  })
})
