import { useEffect } from 'react'

import { useSliderContext } from '../Slider/SliderContext'

type Props = {
  sliderValue?: number | readonly number[]
}

export const useRangeLabelsOverflowCheck = ({ sliderValue }: Props) => {
  const { hasTooltipOverflow, checkTooltipsOverlap } = useSliderContext()
  const isRangeSlider = Array.isArray(sliderValue)
  const isRangeSliderCollapsed =
    isRangeSlider && sliderValue[0] === sliderValue[1]

  useEffect(() => {
    if (isRangeSlider) {
      checkTooltipsOverlap()
    }
  }, [checkTooltipsOverlap, sliderValue, isRangeSlider])

  const doRangeLabelsOverflow = hasTooltipOverflow && !isRangeSliderCollapsed

  return doRangeLabelsOverflow
}
