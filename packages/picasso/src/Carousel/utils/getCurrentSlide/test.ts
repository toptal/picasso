import getCurrentSlide from './getCurrentSlide'

type AnimatedGliderEvent = Glider.GliderEvent<{
  value: string | number
  type: 'arrow' | 'dot' | 'slide'
}>

describe('getCurrentSlide', () => {
  it('should return the slide index from CustomEvent when type is "slide"', () => {
    const event = {
      detail: { type: 'slide', value: 3 },
    } as AnimatedGliderEvent
    const result = getCurrentSlide({
      event,
      slidesCount: 5,
      prevSlide: 2,
      slidesToShow: 2,
      isLastPage: false,
    })

    expect(result).toBe(3)
  })

  it('should return the next slide index when arrow value is "next"', () => {
    const event = {
      detail: { type: 'arrow', value: 'next' },
    } as AnimatedGliderEvent
    const result = getCurrentSlide({
      event,
      slidesCount: 5,
      prevSlide: 2,
      slidesToShow: 2,
      isLastPage: false,
    })

    expect(result).toBe(3)
  })

  it('should return 0 when arrow value is "next" and isLastPage is true', () => {
    const event = {
      detail: { type: 'arrow', value: 'next' },
    } as AnimatedGliderEvent
    const result = getCurrentSlide({
      event,
      slidesCount: 5,
      prevSlide: 2,
      slidesToShow: 2,
      isLastPage: true,
    })

    expect(result).toBe(0)
  })

  it('should return the previous slide index when arrow value is "prev"', () => {
    const event = {
      detail: { type: 'arrow', value: 'prev' },
    } as AnimatedGliderEvent
    const result = getCurrentSlide({
      event,
      slidesCount: 5,
      prevSlide: 2,
      slidesToShow: 2,
      isLastPage: false,
    })

    expect(result).toBe(1)
  })

  it('should return slidesCount minus slidesToShow when previous slide index is 0 and arrow value is "prev"', () => {
    const event = {
      detail: { type: 'arrow', value: 'prev' },
    } as AnimatedGliderEvent
    const result = getCurrentSlide({
      event,
      slidesCount: 5,
      prevSlide: 0,
      slidesToShow: 2,
      isLastPage: false,
    })

    expect(result).toBe(3)
  })

  it('should return the current slide index based on the dot index', () => {
    const event = { detail: { type: 'dot', value: 2 } } as AnimatedGliderEvent
    const result = getCurrentSlide({
      event,
      slidesCount: 10,
      prevSlide: 3,
      slidesToShow: 3,
      isLastPage: false,
    })

    expect(result).toBe(6)
  })

  it('should return the current slide index based on the rounded number of slidesToShow', () => {
    const event = { detail: { type: 'dot', value: 2 } } as AnimatedGliderEvent
    const result = getCurrentSlide({
      event,
      slidesCount: 7,
      prevSlide: 3,
      slidesToShow: 2.5,
      isLastPage: false,
    })

    expect(result).toBe(6)
  })
})
