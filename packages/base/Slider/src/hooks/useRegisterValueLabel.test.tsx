import { renderHook } from '@testing-library/react'

import { useSliderContext } from '../Slider/SliderContext'
import { useRegisterValueLabel } from './useRegisterValueLabel'

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

const renderUseRegisterValue = ({ index }: { index: number }) =>
  renderHook(() => useRegisterValueLabel({ index }))

describe('useRegisterValue', () => {
  beforeEach(() => {
    jest.clearAllMocks()

    mockUseSliderContext.mockReturnValue(mockUseSliderContextResult)
  })

  it('should call registerValueLabel on mount with correct index and ref', () => {
    const index = 42
    const { result } = renderUseRegisterValue({ index })

    expect(mockUseSliderContextResult.registerValueLabel).toHaveBeenCalledTimes(
      1
    )
    expect(mockUseSliderContextResult.registerValueLabel).toHaveBeenCalledWith(
      index,
      result.current
    )
  })

  it('should not call registerValueLabel again if index does not change', () => {
    const index = 42
    const { rerender } = renderUseRegisterValue({ index })

    rerender()

    expect(mockUseSliderContextResult.registerValueLabel).toHaveBeenCalledTimes(
      1
    )
  })

  it('should call registerValueLabel again if index changes', () => {
    const initialIndex = 42
    const newIndex = 43

    const { rerender, result } = renderHook(
      ({ index }) => useRegisterValueLabel({ index }),
      {
        initialProps: { index: initialIndex },
      }
    )

    rerender({ index: newIndex })

    expect(mockUseSliderContextResult.registerValueLabel).toHaveBeenCalledTimes(
      2
    )

    expect(
      mockUseSliderContextResult.registerValueLabel
    ).toHaveBeenNthCalledWith(1, initialIndex, result.current)

    expect(
      mockUseSliderContextResult.registerValueLabel
    ).toHaveBeenNthCalledWith(2, newIndex, result.current)
  })
})
