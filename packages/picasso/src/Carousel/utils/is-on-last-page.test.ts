import isOnLastPage from './is-on-last-page'

describe('isOnLastPage', () => {
  it('returns expected results', () => {
    expect(
      isOnLastPage({ currentSlide: 0, slidesCount: 5, slidesToShow: 2 })
    ).toBe(false)
    expect(
      isOnLastPage({ currentSlide: 0, slidesCount: 5, slidesToShow: 5 })
    ).toBe(true)

    expect(
      isOnLastPage({ currentSlide: 2, slidesCount: 5, slidesToShow: 2.5 })
    ).toBe(false)
    expect(
      isOnLastPage({ currentSlide: 3, slidesCount: 5, slidesToShow: 2.5 })
    ).toBe(true)

    expect(
      isOnLastPage({ currentSlide: 2, slidesCount: 5, slidesToShow: 2.55 })
    ).toBe(true)
  })
})
