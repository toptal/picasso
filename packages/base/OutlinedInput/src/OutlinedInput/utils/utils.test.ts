import type { FieldLayout } from '@toptal/picasso-form'

import { getInputClassName, getRootClassName } from './utils'

describe('getInputClassName', () => {
  describe.each([
    { size: 'small', classes: 'text-xxs leading-4' },
    { size: 'medium', classes: 'text-md leading-4' },
    { size: 'large', classes: 'text-lg leading-4' },
  ])("when size is '$size'", ({ size, classes }) => {
    it('returns correct class name', () => {
      const result = getInputClassName({ isDark: false, size })

      expect(result).toContain(classes)
    })
  })

  describe('when disabled', () => {
    it('returns class name with correct text color', () => {
      const result = getInputClassName({ isDark: false, disabled: true })

      expect(result).toContain('text-gray-600')

      expect(result).toContain('[&::-webkit-text-fill-color]:text-gray-600')
    })

    it('returns class name with Safari specific text color', () => {
      const result = getInputClassName({ isDark: false, disabled: true })

      expect(result).toContain('[&::-webkit-text-fill-color]:text-gray-600')
    })
  })

  describe("when type is 'time' and inpuProps.disabled is true", () => {
    it('returns class name with correct text color', () => {
      const result = getInputClassName({
        inputProps: { disabled: true },
        type: 'time',
        isDark: false,
      })

      expect(result).toContain('text-black')
    })
  })

  describe('when isDark is true', () => {
    it('returns class name with correct text color', () => {
      const result = getInputClassName({
        type: 'time',
        isDark: true,
      })

      expect(result).toContain('text-white')
    })

    it('returns class name with correct placeholder text color', () => {
      const result = getInputClassName({
        type: 'time',
        isDark: true,
      })

      expect(result).toContain('[&::placeholder]:text-white')
    })

    it('returns class name with correct placeholder opacity', () => {
      const result = getInputClassName({
        type: 'time',
        isDark: true,
      })

      expect(result).toContain('[&::placeholder]:opacity-[0.64]')
    })

    describe('and disabled', () => {
      it('returns class name with correct text color', () => {
        const result = getInputClassName({
          type: 'time',
          isDark: true,
        })

        expect(result).toContain('text-white')
      })
    })
  })

  describe('when multiline is true', () => {
    it('returns class name with correct padding', () => {
      const result = getInputClassName({
        type: 'time',
        isDark: false,
      })

      expect(result).toContain('p-0')
    })
  })

  describe('when multilineResizable is true', () => {
    it('returns class name with vertical resize', () => {
      const result = getInputClassName({
        multiline: true,
        multilineResizable: true,
        isDark: false,
      })

      expect(result).toContain('resize-y')
    })

    describe('and multiline is false', () => {
      it('returns class name with no vertical resize', () => {
        const result = getInputClassName({
          type: 'time',
          multiline: false,
          multilineResizable: true,
          isDark: false,
        })

        expect(result).not.toContain('resize-y')
      })
    })
  })

  describe('when classes.input is passed', () => {
    it('returns class name with provided class', () => {
      const inputClass = 'test-class'

      const result = getInputClassName({
        isDark: false,
        classes: { input: inputClass },
      })

      expect(result).toContain(inputClass)
    })
  })

  describe('when inputProps.className is passed', () => {
    it('returns class name with provided class', () => {
      const inputClass = 'test-class'

      const result = getInputClassName({
        isDark: false,
        inputProps: { className: inputClass },
      })

      expect(result).toContain(inputClass)
    })
  })
})

describe('getRootClassName', () => {
  const defaultProps = {
    isDark: false,
    layout: 'vertical' as FieldLayout,
    isError: false,
  }

  describe.each([
    { size: 'small', classes: 'py-1 px-[0.625rem] h-6' },
    { size: 'medium', classes: 'p-2 h-8' },
    { size: 'large', classes: 'p-3 h-12' },
  ])('when size is $size', ({ size, classes }) => {
    it('returns class name with correct padding and height', () => {
      const result = getRootClassName({ ...defaultProps, size })

      expect(result).toContain(classes)
    })
  })

  describe.each([
    { width: 'full', classes: 'w-full' },
    { width: 'shrink', classes: 'w-auto' },
    { width: 'auto', classes: 'w-[18.75rem]' },
  ])('when width is $width', ({ width, classes }) => {
    it('returns class name with correct width', () => {
      const result = getRootClassName({ ...defaultProps, width })

      expect(result).toContain(classes)
    })
  })

  describe("when layout is 'horizontal'", () => {
    it('returns class name with correct width', () => {
      const result = getRootClassName({ ...defaultProps, layout: 'horizontal' })

      expect(result).toContain('w-full')
    })
  })

  describe("when type is 'hidden'", () => {
    it('returns class name with hidden', () => {
      const result = getRootClassName({ ...defaultProps, type: 'hidden' })

      expect(result).toContain('hidden')
    })
  })

  describe('when multiline is true', () => {
    it('returns class name with correct height', () => {
      const result = getRootClassName({
        ...defaultProps,
        multiline: true,
      })

      expect(result).toContain('h-auto')
    })
  })

  describe("when highlight is 'autofill'", () => {
    it('returns class name with correct background color', () => {
      const result = getRootClassName({
        ...defaultProps,
        highlight: 'autofill',
      })

      expect(result).toContain('bg-yellow-100/60')
    })
  })

  describe('when isDark is true', () => {
    it('returns correct class name', () => {
      const result = getRootClassName({ ...defaultProps, isDark: true })

      expect(result).toContain(
        'bg-[#081237] after:border-none [&:has(input:focus)]:after:shadow-0'
      )
    })
  })

  describe('when disabled', () => {
    it('returns correct class name', () => {
      const result = getRootClassName({ ...defaultProps, disabled: true })

      expect(result).toContain(
        'after:border-gray-200 bg-gray-100 text-gray-500 cursor-default'
      )
    })

    describe('and isDark is true', () => {
      it('returns class name with correct background color', () => {
        const result = getRootClassName({
          ...defaultProps,
          disabled: true,
          isDark: true,
        })

        expect(result).toContain('bg-gray-100')
      })
    })
  })

  describe('when is not disabled and no error', () => {
    it('returns correct class name', () => {
      const result = getRootClassName({ ...defaultProps })

      expect(result).toContain(
        'hover:[&:not(:has(input:focus))]:after:border-gray-600'
      )
    })
  })

  describe('when isError is true', () => {
    it('returns correct class name', () => {
      const result = getRootClassName({ ...defaultProps, isError: true })

      expect(result).toContain(
        'after:border-red-500 [&:has(input:focus)]:after:border-red-500 [&:has(input:focus)]:after:shadow-[0_0_0_3px] [&:has(input:focus)]:after:shadow-red-500/[.48]'
      )
    })
  })

  describe('when classes.root is passed', () => {
    it('returns class name with provided class', () => {
      const rootClass = 'test-class'

      const result = getRootClassName({
        ...defaultProps,
        classes: { root: rootClass },
      })

      expect(result).toContain(rootClass)
    })
  })

  describe('when className is passed', () => {
    it('returns class name with provided class', () => {
      const className = 'test-class'

      const result = getRootClassName({
        ...defaultProps,
        className,
      })

      expect(result).toContain(className)
    })
  })
})
