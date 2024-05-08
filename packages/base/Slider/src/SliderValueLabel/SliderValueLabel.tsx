import type { SliderValueLabelSlotProps } from '@mui/base/Slider'
import React from 'react'

import useSliderValueLabel from './useSliderValueLabel'

type ValueLabelDisplay = 'on' | 'auto' | 'off'

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
  const { ref, classes } = useSliderValueLabel({
    index,
    tooltip,
    isOnScreen,
    ownerState,
  })

  return (
    <span ref={ref} className={classes}>
      {children}
    </span>
  )
}

export default SliderValueLabel
