import { useEffect } from 'react'

import { useSliderContext } from '../Slider/SliderContext'

type SliderValueLabelProps = {
  sliderValue?: number | readonly number[]
}

export const useUpdateValueLabelPosition = ({
  sliderValue,
}: SliderValueLabelProps) => {
  const { hasTooltipOverflow, checkTooltipsOverlap } = useSliderContext()
  const isRangeSlider = Array.isArray(sliderValue)
  const isRangeSliderCollapsed =
    isRangeSlider && sliderValue[0] === sliderValue[1]

  useEffect(() => {
    if (!isRangeSlider) {
      return
    }
    checkTooltipsOverlap()
  }, [checkTooltipsOverlap, sliderValue, isRangeSlider])

  const shouldUpdatePosition = hasTooltipOverflow && !isRangeSliderCollapsed

  return shouldUpdatePosition
}
