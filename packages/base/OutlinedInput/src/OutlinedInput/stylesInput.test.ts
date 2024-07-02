import {
  getInputClassName,
  classesBySize,
  fontColorClasses,
  inputClasses,
  placeholderClasses,
  getFontColorClass,
} from './stylesInput'
import type { Size } from './types'

describe('getInputClassName', () => {
  const baseProps = {
    isDark: false,
    size: 'medium' as Size,
  }

  describe('when determining the basic input classes', () => {
    it('always includes basic input classes', () => {
      const result = getInputClassName(baseProps)

      expect(result).toContainEqual(inputClasses)
    })
  })

  describe('when determining classes based on size', () => {
    it.each([
      ['small', classesBySize.small],
      ['medium', classesBySize.medium],
      ['large', classesBySize.large],
    ])('returns the correct class for size "%s"', (size, expectedClass) => {
      const result = getInputClassName({ ...baseProps, size: size as Size })

      expect(result).toContain(expectedClass)
    })
  })

  describe('when determining font color', () => {
    describe('when isDark is true', () => {
      it('returns font color class as "text-white"', () => {
        const result = getInputClassName({ ...baseProps, isDark: true })

        expect(result).toContain(fontColorClasses.dark)
      })
    })

    describe('when type is "time" and inputPropsDisabled is true', () => {
      it('returns font color class as "text-black" for timepicker', () => {
        const result = getInputClassName({
          ...baseProps,
          type: 'time',
          inputProps: { disabled: true },
        })

        expect(result).toContain(fontColorClasses.timepicker)
      })
    })

    describe('when disabled is true', () => {
      it('returns font color class as "text-gray-600"', () => {
        const result = getInputClassName({ ...baseProps, disabled: true })

        expect(result).toContainEqual(fontColorClasses.disabled)
      })
    })

    describe('default case', () => {
      it('returns font color class as "text-black"', () => {
        const result = getInputClassName(baseProps)

        expect(result).toContain(fontColorClasses.default)
      })
    })
  })

  describe('when determining placeholder classes', () => {
    describe('when isDark is true', () => {
      it('returns dark mode placeholder classes', () => {
        const result = getInputClassName({ ...baseProps, isDark: true })

        expect(result).toContainEqual(placeholderClasses.dark)
      })
    })

    describe('default case', () => {
      it('returns default placeholder classes', () => {
        const result = getInputClassName(baseProps)

        expect(result).toContainEqual(placeholderClasses.default)
      })
    })
  })

  describe('when determining additional classes', () => {
    describe('when multiline and multilineResizable', () => {
      it('includes "resize-y" class', () => {
        const result = getInputClassName({
          ...baseProps,
          multiline: true,
          multilineResizable: true,
        })

        expect(result).toContain('resize-y')
      })
    })

    describe('default case', () => {
      it('does not include "resize-y" class', () => {
        const result = getInputClassName(baseProps)

        expect(result).not.toContain('resize-y')
      })
    })
  })
})

describe('getFontColorClass', () => {
  describe('when isDark is true', () => {
    it('returns "text-white"', () => {
      const result = getFontColorClass({ isDark: true })

      expect(result).toBe(fontColorClasses.dark)
    })
  })

  describe('when type is "time" and inputPropsDisabled is true', () => {
    it('returns "text-black" for timepicker', () => {
      const result = getFontColorClass({
        isDark: false,
        type: 'time',
        inputPropsDisabled: true,
      })

      expect(result).toBe(fontColorClasses.timepicker)
    })
  })

  describe('when disabled is true', () => {
    it('returns an array including "text-gray-600"', () => {
      const result = getFontColorClass({ isDark: false, disabled: true })

      expect(result).toEqual(fontColorClasses.disabled)
    })
  })

  describe('default case', () => {
    it('returns "text-black"', () => {
      const result = getFontColorClass({ isDark: false })

      expect(result).toBe(fontColorClasses.default)
    })
  })
})
