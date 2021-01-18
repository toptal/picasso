import { isScreenSize, screens, PicassoBreakpoints } from './'

const SCREEN_SIZES = {
  small: 500,
  medium: 750,
  large: 990,
  extraLarge: 1000
}

describe('responsive breakpoint utils', () => {
  describe('media query generation', () => {
    it('small', () => {
      const mediaQuery = screens('small')

      expect(mediaQuery).toEqual('@media (max-width: 576px)')
    })

    it('small medium', () => {
      const mediaQuery = screens('small', 'medium')

      expect(mediaQuery).toEqual(
        '@media (max-width: 576px), (min-width: 576px) and (max-width: 768px)'
      )
    })

    it('small medium large', () => {
      const mediaQuery = screens('small', 'medium', 'large')

      expect(mediaQuery).toEqual(
        '@media (max-width: 576px), (min-width: 576px) and (max-width: 768px), (min-width: 768px) and (max-width: 992px)'
      )
    })
  })

  describe('screen size checks', () => {
    it('small breakpoint no screen size', () => {
      const isSmall = isScreenSize('small')

      expect(isSmall).toBeFalsy()
    })

    it('small breakpoint on a small screen', () => {
      const isSmall = isScreenSize('small', SCREEN_SIZES.small)

      expect(isSmall).toBeTruthy()
    })

    it('small breakpoint on a large screen', () => {
      const isSmall = isScreenSize('small', SCREEN_SIZES.large)

      expect(isSmall).toBeFalsy()
    })

    it('medium breakpoint no screen size', () => {
      const isMedium = isScreenSize('medium')

      expect(isMedium).toBeFalsy()
    })

    it('medium breakpoint on a small screen', () => {
      const isMedium = isScreenSize('medium', SCREEN_SIZES.small)

      expect(isMedium).toBeFalsy()
    })

    it('medium breakpoint on a medium screen', () => {
      const isMedium = isScreenSize('medium', SCREEN_SIZES.medium)

      expect(isMedium).toBeTruthy()
    })

    it('medium breakpoint on a large screen', () => {
      const isMedium = isScreenSize('medium', SCREEN_SIZES.large)

      expect(isMedium).toBeFalsy()
    })

    it('large breakpoint on a medium screen', () => {
      const isLarge = isScreenSize('large', SCREEN_SIZES.medium)

      expect(isLarge).toBeFalsy()
    })

    it('large breakpoint on a large screen', () => {
      const isLarge = isScreenSize('large', SCREEN_SIZES.large)

      expect(isLarge).toBeTruthy()
    })

    it('extra large breakpoint on a  large screen', () => {
      const isExtraLarge = isScreenSize('extra-large', SCREEN_SIZES.large)

      expect(isExtraLarge).toBeFalsy()
    })

    it('extra large breakpoint on a extra large screen', () => {
      const isExtraLarge = isScreenSize('extra-large', SCREEN_SIZES.extraLarge)

      expect(isExtraLarge).toBeTruthy()
    })
  })
})

describe('non-responsive breakpoint utils', () => {
  beforeAll(() => {
    PicassoBreakpoints.disableMobileBreakpoints()
  })

  describe('media query generation', () => {
    it('small', () => {
      const mediaQuery = screens('small')

      expect(mediaQuery).toEqual('')
    })

    it('small medium', () => {
      const mediaQuery = screens('small', 'medium')

      expect(mediaQuery).toEqual('')
    })

    it('small medium large', () => {
      const mediaQuery = screens('small', 'medium', 'large')

      expect(mediaQuery).toEqual(
        '@media (min-width: 768px) and (max-width: 992px)'
      )
    })
  })

  describe('screen size checks', () => {
    it('small breakpoint no screen size', () => {
      const isSmall = isScreenSize('small')

      expect(isSmall).toBeFalsy()
    })

    it('small breakpoint on a small screen', () => {
      const isSmall = isScreenSize('small', SCREEN_SIZES.small)

      expect(isSmall).toBeTruthy()
    })

    it('small breakpoint on a large screen', () => {
      const isSmall = isScreenSize('small', SCREEN_SIZES.large)

      expect(isSmall).toBeFalsy()
    })

    it('medium breakpoint no screen size', () => {
      const isMedium = isScreenSize('medium')

      expect(isMedium).toBeFalsy()
    })

    it('medium breakpoint on a small screen', () => {
      const isMedium = isScreenSize('medium', SCREEN_SIZES.small)

      expect(isMedium).toBeFalsy()
    })

    it('medium breakpoint on a medium screen', () => {
      const isMedium = isScreenSize('medium', SCREEN_SIZES.medium)

      expect(isMedium).toBeFalsy()
    })

    it('medium breakpoint on a large screen', () => {
      const isMedium = isScreenSize('medium', SCREEN_SIZES.large)

      expect(isMedium).toBeFalsy()
    })

    it('large breakpoint on a medium screen', () => {
      const isLarge = isScreenSize('large', SCREEN_SIZES.medium)

      expect(isLarge).toBeFalsy()
    })

    it('large breakpoint on a large screen', () => {
      const isLarge = isScreenSize('large', SCREEN_SIZES.large)

      expect(isLarge).toBeTruthy()
    })

    it('extra large breakpoint on a  large screen', () => {
      const isExtraLarge = isScreenSize('extra-large', SCREEN_SIZES.large)

      expect(isExtraLarge).toBeFalsy()
    })

    it('extra large breakpoint on a extra large screen', () => {
      const isExtraLarge = isScreenSize('extra-large', SCREEN_SIZES.extraLarge)

      expect(isExtraLarge).toBeTruthy()
    })
  })
})
