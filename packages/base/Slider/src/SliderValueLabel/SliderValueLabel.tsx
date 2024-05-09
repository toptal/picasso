import type { SliderValueLabelSlotProps } from '@mui/base/Slider'
import React from 'react'
import { twJoin } from 'tailwind-merge'

import { getTooltipHorizontalPosition } from '../utils'
import { useUpdateValueLabelPosition, useRegisterValueLabel } from '../hooks'

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
  const ref = useRegisterValueLabel({ index })
  const shouldUpdatePosition = useUpdateValueLabelPosition({
    sliderValue: ownerState.value,
  })

  return (
    <span
      ref={ref}
      className={twJoin(
        'absolute will-change-transform shadow-4 transition-transform m-1 text-sm bg-graphite-800 text-white rounded-sm py-[2px] px-2',
        tooltipStates[tooltip],
        isOnScreen ? 'bottom-[calc(100%+4px)]' : 'top-[calc(100%+4px)]',
        shouldUpdatePosition
          ? getTooltipHorizontalPosition({
              placement: index === 0 ? 'left' : 'right',
            })
          : undefined
      )}
    >
      {children}
    </span>
  )
}

export default SliderValueLabel
