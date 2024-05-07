import type { SliderValueLabelSlotProps } from '@mui/base/Slider'
import React, { useEffect, useRef } from 'react'
import { twJoin } from 'tailwind-merge'

import { useSliderContext } from '../Slider/SliderContext'
import { getPosition } from '../slider-utils/slider-utils'

type ValueLabelDisplay = 'on' | 'auto' | 'off'

const tooltipStates: Record<ValueLabelDisplay, string> = {
  off: 'hidden',
  auto: 'hidden group-hover/thumb:flex justify-center items-center',
  on: 'flex justify-center items-center',
}

const SliderValueLabel = ({
  children,
  index = -1,
  tooltip = 'off',
  isOnScreen,
  ownerState,
}: SliderValueLabelSlotProps & {
  tooltip: ValueLabelDisplay
  isOnScreen: boolean
}) => {
  const { registerValueLabel, hasTooltipOverflow, checkTooltipsOverlap } =
    useSliderContext()
  const ref = useRef<HTMLSpanElement>(null)
  const sliderValue = ownerState.value
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

  return (
    <span
      ref={ref}
      className={twJoin(
        'absolute will-change-transform shadow-4 transition-transform m-1 text-sm bg-graphite-800 text-white rounded-sm py-[2px] px-2',
        tooltipStates[tooltip],
        isOnScreen ? 'bottom-[calc(100%+4px)]' : 'top-[calc(100%+4px)]',
        getPosition({ hasTooltipOverflow, isRangeSliderCollapsed, index })
      )}
    >
      {children}
    </span>
  )
}

export default SliderValueLabel
