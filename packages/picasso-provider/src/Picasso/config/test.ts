import { isScreenSize, screens, PicassoBreakpoints } from './'

const SCREEN_SIZES = {
  small: 500,
  medium: 800,
  large: 1060,
  extraLarge: 1500,
}

describe('responsive breakpoint utils', () => {
  describe('media query generation', () => {
    it('xs', () => {
      const mediaQuery = screens('xs')

      expect(mediaQuery).toBe('@media (max-width: 479px)')
    })
    it('sm', () => {
      const mediaQuery = screens('sm')

      expect(mediaQuery).toBe(
        '@media (min-width: 480px) and (max-width: 767px)'
      )
    })

    it('small medium', () => {
      const mediaQuery = screens('sm', 'md')

      expect(mediaQuery).toBe(
        '@media (min-width: 480px) and (max-width: 767px), (min-width: 768px) and (max-width: 1023px)'
      )
    })

    it('small medium large', () => {
      const mediaQuery = screens('sm', 'md', 'lg')

      expect(mediaQuery).toBe(
        '@media (min-width: 480px) and (max-width: 767px), (min-width: 768px) and (max-width: 1023px), (min-width: 1024px) and (max-width: 1439px)'
      )
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

      expect(mediaQuery).toBe(
        '@media (min-width: 1024px) and (max-width: 1439px)'
      )
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
})
