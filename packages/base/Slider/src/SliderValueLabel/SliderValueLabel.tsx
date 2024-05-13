import type { SliderValueLabelSlotProps } from '@mui/base/Slider'
import React from 'react'
import { twJoin } from 'tailwind-merge'

import {
  useLabelPosition,
  useRangeLabelsOverflowCheck,
  useRegisterValueLabel,
} from '../hooks'

type ValueLabelDisplay = 'on' | 'auto' | 'off'

const tooltipStates: Record<ValueLabelDisplay, string> = {
  off: 'hidden',
  // We need to use visibility: hidden instead of display: none to keep the
  // label visible for javascript calculations.
  auto: 'invisible group-hover/thumb:visible flex justify-center items-center',
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
  const sliderValue = ownerState.value
  const ref = useRegisterValueLabel({ index })
  const doRangeLabelsOverflow = useRangeLabelsOverflowCheck({
    sliderValue,
  })
  const positionStyles = useLabelPosition({
    ref,
    doRangeLabelsOverflow,
    sliderValue,
    index,
  })

  return (
    <span
      ref={ref}
      className={twJoin(
        'absolute shadow-4 text-sm text-white bg-graphite-800',
        'm-1 rounded-sm py-[2px] px-2',
        'will-change-transform transition-transform',
        tooltipStates[tooltip],
        isOnScreen ? 'bottom-[calc(100%+2px)]' : 'top-[calc(100%+2px)]',
        positionStyles
      )}
    >
      {children}
    </span>
  )
}

export default SliderValueLabel
