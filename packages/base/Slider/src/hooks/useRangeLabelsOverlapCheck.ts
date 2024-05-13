import { useEffect } from 'react'

import { useSliderContext } from '../Slider/SliderContext'

type Props = {
  sliderValue?: number | readonly number[]
}

export const useRangeLabelsOverlapCheck = ({ sliderValue }: Props) => {
  const { checkTooltipsOverlap, hasTooltipOverlap } = useSliderContext()
  const isRangeSlider = Array.isArray(sliderValue)
  const isRangeSliderCollapsed =
    isRangeSlider && sliderValue[0] === sliderValue[1]

  useEffect(() => {
    if (isRangeSlider) {
      checkTooltipsOverlap()
    }
  }, [checkTooltipsOverlap, sliderValue, isRangeSlider])

  return hasTooltipOverlap && !isRangeSliderCollapsed
}
