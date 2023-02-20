import getIsOnLastSlide from './getIsOnLastSlide'

describe('getIsOnLastSlide', () => {
  it('returns expected results', () => {
    expect(
      getIsOnLastSlide({ currentSlide: 0, slidesCount: 5, slidesToShow: 2 })
    ).toBe(false)
    expect(
      getIsOnLastSlide({ currentSlide: 0, slidesCount: 5, slidesToShow: 5 })
    ).toBe(true)

    expect(
      getIsOnLastSlide({ currentSlide: 2, slidesCount: 5, slidesToShow: 2.5 })
    ).toBe(false)
    expect(
      getIsOnLastSlide({ currentSlide: 3, slidesCount: 5, slidesToShow: 2.5 })
    ).toBe(true)

    expect(
      getIsOnLastSlide({ currentSlide: 2, slidesCount: 5, slidesToShow: 2.55 })
    ).toBe(true)
  })
})
