import getCurrentSlideOnDotEvent from './getCurrentSlideOnDotEvent'

describe('getCurrentSlideOnDotEvent', () => {
  describe('when slidesToShow is whole number', () => {
    it('returns correct slide', () => {
      expect(
        getCurrentSlideOnDotEvent({ slidesToShow: 2, currentDot: 0 })
      ).toBe(0)
      expect(
        getCurrentSlideOnDotEvent({ slidesToShow: 2, currentDot: 1 })
      ).toBe(2)
      expect(
        getCurrentSlideOnDotEvent({ slidesToShow: 3, currentDot: 1 })
      ).toBe(3)
    })
  })

  describe('when slidesToShow is not whole number', () => {
    it('returns correct slide', () => {
      expect(
        getCurrentSlideOnDotEvent({ slidesToShow: 2.5, currentDot: 0 })
      ).toBe(0)
      expect(
        getCurrentSlideOnDotEvent({ slidesToShow: 2.5, currentDot: 1 })
      ).toBe(3)
    })
  })
})
