import { renderHook } from '@testing-library/react'

import { useSliderContext } from '../Slider/SliderContext'
import { useUpdateValueLabelPosition } from './useUpdateValueLabelPosition'

jest.mock('../Slider/SliderContext', () => ({
  useSliderContext: jest.fn(),
}))

const mockUseSliderContext = useSliderContext as jest.MockedFunction<
  typeof useSliderContext
>

const mockUseSliderContextResult = {
  registerValueLabel: jest.fn(),
  checkTooltipsOverlap: jest.fn(),
  hasTooltipOverflow: false,
}

describe('useUpdateValueLabelPosition', () => {
  beforeEach(() => {
    mockUseSliderContext.mockReturnValue(mockUseSliderContextResult)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should not call checkTooltipsOverlap if sliderValue is not an array', () => {
    const sliderValue = 50 // Not an array, represents a single value slider

    renderHook(() => useUpdateValueLabelPosition({ sliderValue }))

    expect(
      mockUseSliderContextResult.checkTooltipsOverlap
    ).not.toHaveBeenCalled()
  })

  it('should call checkTooltipsOverlap if sliderValue is an array', () => {
    const sliderValue = [25, 75] // Array, represents a range slider

    renderHook(() => useUpdateValueLabelPosition({ sliderValue }))

    expect(
      mockUseSliderContextResult.checkTooltipsOverlap
    ).toHaveBeenCalledTimes(1)
  })

  it('should not call checkTooltipsOverlap if the range slider values are equal (collapsed range)', () => {
    const sliderValue = [50, 50] // Array with equal values, represents a collapsed range

    const { result } = renderHook(() =>
      useUpdateValueLabelPosition({ sliderValue })
    )

    expect(result.current).toBe(false)
  })

  it('should return false for shouldUpdatePosition if there is no tooltip overflow', () => {
    mockUseSliderContextResult.hasTooltipOverflow = false
    const sliderValue = [20, 80]

    const { result } = renderHook(() =>
      useUpdateValueLabelPosition({ sliderValue })
    )

    expect(result.current).toBe(false)
  })

  it('should return true for shouldUpdatePosition if there is tooltip overflow and range is not collapsed', () => {
    mockUseSliderContextResult.hasTooltipOverflow = true
    const sliderValue = [20, 80]

    const { result } = renderHook(() =>
      useUpdateValueLabelPosition({ sliderValue })
    )

    expect(result.current).toBe(true)
  })

  it('should return false for shouldUpdatePosition if there is tooltip overflow but range is collapsed', () => {
    mockUseSliderContextResult.hasTooltipOverflow = true
    const sliderValue = [50, 50]

    const { result } = renderHook(() =>
      useUpdateValueLabelPosition({ sliderValue })
    )

    expect(result.current).toBe(false)
  })
})
