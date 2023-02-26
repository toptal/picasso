import { renderHook } from '@testing-library/react-hooks'

import useCarousel from './useCarousel'

jest.mock('../../../utils/useOnScreen', () =>
  jest.fn().mockImplementation(() => true)
)
jest.mock('../../../utils/useMouseEnter', () =>
  jest.fn().mockImplementation(() => false)
)

describe('useCarousel', () => {
  const elementMock = document.createElement('div')

  elementMock.innerHTML = `
      <div></div>
      <div></div>
      <div></div>
    `
  const elementRef = { current: elementMock }
  const dotsRef = { current: document.createElement('div') }
  const nextRef = { current: document.createElement('button') }
  const prevRef = { current: document.createElement('button') }

  const defaultProps = {
    autoplay: false,
    autoplayDelay: 0,
    dotsRef,
    elementRef,
    nextRef,
    onSlide: jest.fn(),
    prevRef,
    rewind: false,
    slidesToScroll: 1,
    slidesToShow: 1,
  }

  it('should initialize glider', () => {
    const { result } = renderHook(() => useCarousel(defaultProps))

    expect(result.current.prevDisabled).toBe(true)
    expect(result.current.nextDisabled).toBe(false)
    expect(result.current.hasGradient).toBe(false)
  })
})
