import { useEffect, useRef } from 'react'
import { twJoin } from 'tailwind-merge'
import type { SliderOwnerState } from '@mui/base/Slider'

import { useSliderContext } from '../Slider/SliderContext'
import { getPosition } from '../slider-utils/slider-utils'

type ValueLabelDisplay = 'on' | 'auto' | 'off'

const tooltipStates: Record<ValueLabelDisplay, string> = {
  off: 'hidden',
  auto: 'hidden group-hover/thumb:flex justify-center items-center',
  on: 'flex justify-center items-center',
}

type SliderValueLabelProps = {
  index: number
  tooltip: ValueLabelDisplay
  isOnScreen: boolean
  ownerState: SliderOwnerState
}

const useSliderValueLabel = ({
  index,
  tooltip,
  isOnScreen,
  ownerState,
}: SliderValueLabelProps) => {
  const ref = useRef<HTMLSpanElement>(null)
  const sliderValue = ownerState.value
  const { registerValueLabel, hasTooltipOverflow, checkTooltipsOverlap } =
    useSliderContext()
  const isRangeSlider = Array.isArray(sliderValue)
  const isRangeSliderCollapsed =
    isRangeSlider && sliderValue[0] === sliderValue[1]

  useEffect(() => {
    if (!isRangeSlider) {
      return
    }
    checkTooltipsOverlap()
  }, [checkTooltipsOverlap, sliderValue, isRangeSlider])

  useEffect(() => {
    registerValueLabel(index, ref)
  }, [index, registerValueLabel])

  // Compute the classes
  const classes = twJoin(
    'absolute will-change-transform shadow-4 transition-transform m-1 text-sm bg-graphite-800 text-white rounded-sm py-[2px] px-2',
    tooltipStates[tooltip],
    isOnScreen ? 'bottom-[calc(100%+4px)]' : 'top-[calc(100%+4px)]',
    getPosition({ hasTooltipOverflow, isRangeSliderCollapsed, index })
  )

  return { ref, classes }
}

export default useSliderValueLabel
