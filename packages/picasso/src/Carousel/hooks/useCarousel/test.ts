import { renderHook } from '@testing-library/react-hooks'

import useCarousel from './useCarousel'

jest.mock('../../../utils/useOnScreen', () =>
  jest.fn().mockImplementation(() => true)
)
jest.mock('../../../utils/useMouseEnter', () =>
  jest.fn().mockImplementation(() => false)
)

describe('useCarousel', () => {
  const props = {
    autoplay: false,
    autoplayDelay: 5000,
    onSlide: jest.fn(),
    rewind: false,
    slidesToScroll: 1,
    slidesToShow: 2,
    slidesCount: 5,
  }

  it('should return expected values', () => {
    const { result } = renderHook(() => useCarousel(props))

    expect(result.current.isLastPage).toBe(false)
    expect(result.current.getPrevProps().disabled).toBe(true)
    expect(result.current.getNextProps().disabled).toBe(false)
  })
})
