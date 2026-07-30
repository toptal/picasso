import { renderHook } from '@testing-library/react'

import {
  breakpointsList,
  isScreenSize,
  screens,
  useBreakpoint,
  PicassoBreakpoints,
} from './'

const SCREEN_SIZES = {
  small: 500,
  medium: 800,
  large: 1060,
  extraLarge: 1500,
}

// jsdom's `matchMedia` never evaluates the query, so resolve the
// `min-width`/`max-width` pairs against a fixed width ourselves.
const mockViewportWidth = (width: number) => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: (query: string) => ({
      matches: query.split(',').some(singleQuery => {
        const min = singleQuery.match(/min-width:\s*([\d.]+)px/)
        const max = singleQuery.match(/max-width:\s*([\d.]+)px/)

        return (
          (!min || width >= Number(min[1])) && (!max || width <= Number(max[1]))
        )
      }),
      addEventListener: () => {},
      removeEventListener: () => {},
    }),
  })
}

describe('responsive breakpoint utils', () => {
  describe('media query generation', () => {
    it('xs', () => {
      const mediaQuery = screens('xs')

      expect(mediaQuery).toBe('@media (max-width: 479.98px)')
    })
    it('sm', () => {
      const mediaQuery = screens('sm')

      expect(mediaQuery).toBe(
        '@media (min-width: 480px) and (max-width: 767.98px)'
      )
    })

    it('small medium', () => {
      const mediaQuery = screens('sm', 'md')

      expect(mediaQuery).toBe(
        '@media (min-width: 480px) and (max-width: 767.98px), (min-width: 768px) and (max-width: 1023.98px)'
      )
    })

    it('small medium large', () => {
      const mediaQuery = screens('sm', 'md', 'lg')

      expect(mediaQuery).toBe(
        '@media (min-width: 480px) and (max-width: 767.98px), (min-width: 768px) and (max-width: 1023.98px), (min-width: 1024px) and (max-width: 1439.98px)'
      )
    })
  })

  describe('useBreakpoint', () => {
    it('matches the desktop range on a medium screen', () => {
      mockViewportWidth(SCREEN_SIZES.medium)

      const { result } = renderHook(() => useBreakpoint(['md', 'lg', 'xl']))

      expect(result.current).toBe(true)
    })

    it('matches the compact range on a small screen', () => {
      mockViewportWidth(SCREEN_SIZES.small)

      const { result } = renderHook(() => useBreakpoint(['xs', 'sm', 'md']))

      expect(result.current).toBe(true)
    })

    it('does not match the compact range on a large screen', () => {
      mockViewportWidth(SCREEN_SIZES.large)

      const { result } = renderHook(() => useBreakpoint(['xs', 'sm', 'md']))

      expect(result.current).toBe(false)
    })
  })

  describe('screen size checks', () => {
    it('small breakpoint no screen size', () => {
      const isSmall = isScreenSize('sm')

      expect(isSmall).toBeFalsy()
    })

    it('small breakpoint on a small screen', () => {
      const isSmall = isScreenSize('sm', SCREEN_SIZES.small)

      expect(isSmall).toBeTruthy()
    })

    it('small breakpoint on a large screen', () => {
      const isSmall = isScreenSize('sm', SCREEN_SIZES.large)

      expect(isSmall).toBeFalsy()
    })

    it('medium breakpoint no screen size', () => {
      const isMedium = isScreenSize('md')

      expect(isMedium).toBeFalsy()
    })

    it('medium breakpoint on a small screen', () => {
      const isMedium = isScreenSize('md', SCREEN_SIZES.small)

      expect(isMedium).toBeFalsy()
    })

    it('medium breakpoint on a medium screen', () => {
      const isMedium = isScreenSize('md', SCREEN_SIZES.medium)

      expect(isMedium).toBeTruthy()
    })

    it('medium breakpoint on a large screen', () => {
      const isMedium = isScreenSize('md', SCREEN_SIZES.large)

      expect(isMedium).toBeFalsy()
    })

    it('large breakpoint on a medium screen', () => {
      const isLarge = isScreenSize('lg', SCREEN_SIZES.medium)

      expect(isLarge).toBeFalsy()
    })

    it('large breakpoint on a large screen', () => {
      const isLarge = isScreenSize('lg', SCREEN_SIZES.large)

      expect(isLarge).toBeTruthy()
    })

    it('extra large breakpoint on a  large screen', () => {
      const isExtraLarge = isScreenSize('xl', SCREEN_SIZES.large)

      expect(isExtraLarge).toBeFalsy()
    })

    it('extra large breakpoint on a extra large screen', () => {
      const isExtraLarge = isScreenSize('xl', SCREEN_SIZES.extraLarge)

      expect(isExtraLarge).toBeTruthy()
    })
  })
})

describe('non-responsive breakpoint utils', () => {
  beforeAll(() => {
    PicassoBreakpoints.disableMobileBreakpoints()
  })

  // `disableMobileBreakpoints()` is process-wide — hand the defaults back
  afterAll(() => {
    PicassoBreakpoints.reset()
  })

  describe('media query generation', () => {
    it('xs', () => {
      const mediaQuery = screens('xs')

      expect(mediaQuery).toBe('')
    })

    it('sm', () => {
      const mediaQuery = screens('sm')

      expect(mediaQuery).toBe('')
    })

    it('small medium', () => {
      const mediaQuery = screens('sm', 'md')

      expect(mediaQuery).toBe('')
    })

    it('small medium large', () => {
      const mediaQuery = screens('sm', 'md', 'lg')

      expect(mediaQuery).toBe('@media (max-width: 1439.98px)')
    })

    it('medium large extra large covers every width', () => {
      const mediaQuery = screens('md', 'lg', 'xl')

      expect(mediaQuery).toBe(
        '@media (max-width: 1439.98px), (min-width: 1440px)'
      )
    })
  })

  describe('useBreakpoint', () => {
    // `lg` is the desktop floor here, so desktop checks hold at every width —
    // including the 768–1023.98px band that used to match nothing
    it.each([
      ['small', SCREEN_SIZES.small],
      ['medium', SCREEN_SIZES.medium],
      ['large', SCREEN_SIZES.large],
      ['extra large', SCREEN_SIZES.extraLarge],
    ])('matches the desktop range on a %s screen', (_name, width) => {
      mockViewportWidth(width)

      const { result } = renderHook(() => useBreakpoint(['md', 'lg', 'xl']))

      expect(result.current).toBe(true)
    })

    it.each([
      ['small', SCREEN_SIZES.small],
      ['medium', SCREEN_SIZES.medium],
      ['large', SCREEN_SIZES.large],
    ])('does not match the compact range on a %s screen', (_name, width) => {
      mockViewportWidth(width)

      const { result } = renderHook(() => useBreakpoint(['xs', 'sm', 'md']))

      expect(result.current).toBe(false)
    })
  })

  describe('screen size checks', () => {
    it('small breakpoint no screen size', () => {
      const isSmall = isScreenSize('sm')

      expect(isSmall).toBeFalsy()
    })

    it('small breakpoint on a small screen', () => {
      const isSmall = isScreenSize('sm', SCREEN_SIZES.small)

      expect(isSmall).toBeFalsy()
    })

    it('small breakpoint on a large screen', () => {
      const isSmall = isScreenSize('sm', SCREEN_SIZES.large)

      expect(isSmall).toBeFalsy()
    })

    it('medium breakpoint no screen size', () => {
      const isMedium = isScreenSize('md')

      expect(isMedium).toBeFalsy()
    })

    it('medium breakpoint on a small screen', () => {
      const isMedium = isScreenSize('md', SCREEN_SIZES.small)

      expect(isMedium).toBeFalsy()
    })

    it('medium breakpoint on a medium screen', () => {
      const isMedium = isScreenSize('md', SCREEN_SIZES.medium)

      expect(isMedium).toBeTruthy()
    })

    it('medium breakpoint on a large screen', () => {
      const isMedium = isScreenSize('md', SCREEN_SIZES.large)

      expect(isMedium).toBeFalsy()
    })

    it('large breakpoint on a medium screen', () => {
      const isLarge = isScreenSize('lg', SCREEN_SIZES.medium)

      expect(isLarge).toBeFalsy()
    })

    it('large breakpoint on a large screen', () => {
      const isLarge = isScreenSize('lg', SCREEN_SIZES.large)

      expect(isLarge).toBeTruthy()
    })

    it('extra large breakpoint on a  large screen', () => {
      const isExtraLarge = isScreenSize('xl', SCREEN_SIZES.large)

      expect(isExtraLarge).toBeFalsy()
    })

    it('extra large breakpoint on a extra large screen', () => {
      const isExtraLarge = isScreenSize('xl', SCREEN_SIZES.extraLarge)

      expect(isExtraLarge).toBeTruthy()
    })
  })

  describe('reset', () => {
    it('restores the responsive breakpoints', () => {
      PicassoBreakpoints.reset()

      expect(screens('md')).toBe(
        '@media (min-width: 768px) and (max-width: 1023.98px)'
      )
      expect(isScreenSize('md', SCREEN_SIZES.medium)).toBeTruthy()
      expect(breakpointsList.sm).toBe(480)

      // hand the suite's own fixture back
      PicassoBreakpoints.disableMobileBreakpoints()
    })
  })
})
