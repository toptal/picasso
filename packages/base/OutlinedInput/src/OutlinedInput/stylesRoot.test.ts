import type { FieldLayout } from '@toptal/picasso-form'

import {
  getRootClassName,
  spacingBySize,
  heightClasses,
  fontColorClass,
  cursorClass,
  bgClasses,
  widthClasses,
  rootBasicClasses,
} from './stylesRoot'
import type { WidthType, Size } from './types'

describe('getRootClassName', () => {
  const baseProps = {
    isDark: false,
    layout: 'vertical' as FieldLayout,
    isError: false,
    size: 'medium' as Size,
    width: 'auto' as WidthType,
  }

  describe('when determining spacing by size', () => {
    it.each([
      ['small', spacingBySize.small],
      ['medium', spacingBySize.medium],
      ['large', spacingBySize.large],
    ])(
      'returns the correct spacing class for size "%s"',
      (size, expectedClass) => {
        const result = getRootClassName({ ...baseProps, size: size as Size })

        expect(result).toContain(expectedClass)
      }
    )
  })

  describe('when determining height classes', () => {
    describe('when multiline is false', () => {
      it.each([
        ['small', heightClasses.singleline.small],
        ['medium', heightClasses.singleline.medium],
        ['large', heightClasses.singleline.large],
      ])(
        'returns the correct height class for singleline "%s"',
        (size, expectedClass) => {
          const result = getRootClassName({
            ...baseProps,
            multiline: false,
            size: size as Size,
          })

          expect(result).toContain(expectedClass)
        }
      )
    })

    describe('when multiline is true', () => {
      it('returns the correct class for multiline', () => {
        const result = getRootClassName({ ...baseProps, multiline: true })

        expect(result).toContain(heightClasses.multiline)
      })
    })
  })

  describe('when determining width classes', () => {
    describe('when layout is horizontal', () => {
      it('returns the correct width class for horizontal layout', () => {
        const result = getRootClassName({ ...baseProps, layout: 'horizontal' })

        expect(result).toContain(widthClasses.horizontal)
      })
    })

    it.each([
      ['full', widthClasses.full],
      ['shrink', widthClasses.shrink],
      ['auto', widthClasses.auto],
    ])('returns the correct width class for "%s"', (width, expectedClass) => {
      const result = getRootClassName({
        ...baseProps,
        width: width as WidthType,
      })

      expect(result).toContain(expectedClass)
    })
  })

  describe('when determining background color classes', () => {
    describe('when input is disabled', () => {
      it('returns the correct bg class for disabled', () => {
        const result = getRootClassName({ ...baseProps, disabled: true })

        expect(result).toContain(bgClasses.disabled)
      })
    })

    describe('when in dark mode', () => {
      it('returns the correct bg class for dark mode', () => {
        const result = getRootClassName({ ...baseProps, isDark: true })

        expect(result).toContain(bgClasses.dark)
      })
    })

    describe('when highlight is "autofill"', () => {
      it('returns the correct bg class for highlight "autofill"', () => {
        const result = getRootClassName({ ...baseProps, highlight: 'autofill' })

        expect(result).toContain(bgClasses.highlight)
      })
    })

    describe('in the default case', () => {
      it('returns the default bg class', () => {
        const result = getRootClassName(baseProps)

        expect(result).toContain(bgClasses.default)
      })
    })
  })

  describe('when determining border pseudo element classes', () => {
    // Example only, needs additional detail on how it is structured
    it('returns correct classes for default state', () => {
      const result = getRootClassName(baseProps)

      expect(result).toContainEqual(expect.arrayContaining(rootBasicClasses))
    })

    describe('when input is disabled', () => {
      it('returns correct classes for disabled state', () => {
        const result = getRootClassName({ ...baseProps, disabled: true })

        expect(result).toContainEqual(expect.arrayContaining(rootBasicClasses))
      })
    })

    describe('when there is an error', () => {
      it('returns correct classes for error state', () => {
        const result = getRootClassName({ ...baseProps, isError: true })

        expect(result).toContainEqual(expect.arrayContaining(rootBasicClasses))
      })
    })

    describe('when determining text color classes', () => {
      describe('when input is disabled', () => {
        it('returns correct text color class for disabled state', () => {
          const result = getRootClassName({ ...baseProps, disabled: true })

          expect(result).toContain(fontColorClass.disabled)
        })
      })

      describe('in the default case', () => {
        it('returns correct text color class for default state', () => {
          const result = getRootClassName(baseProps)

          expect(result).toContain(fontColorClass.default)
        })
      })
    })

    describe('when determining cursor classes', () => {
      describe('when input is disabled', () => {
        it('returns correct cursor class for disabled state', () => {
          const result = getRootClassName({ ...baseProps, disabled: true })

          expect(result).toContain(cursorClass.disabled)
        })
      })

      describe('in the default case', () => {
        it('returns correct cursor class for default state', () => {
          const result = getRootClassName(baseProps)

          expect(result).toContain(cursorClass.default)
        })
      })
    })

    describe('when determining visibility based on input type', () => {
      describe('when type is "hidden"', () => {
        it('returns "hidden" class for input type hidden', () => {
          const result = getRootClassName({ ...baseProps, type: 'hidden' })

          expect(result).toContain('hidden')
        })
      })
    })
  })
})
