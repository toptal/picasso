import React, { useRef } from 'react'
import { ValueLabelProps as MUIValueLabelProps } from '@material-ui/core/Slider'

import Tooltip from '../Tooltip'
import { useSliderContext } from '../Slider/SliderContext'

type ValueLabelDisplay = 'on' | 'auto' | 'off'

// This type is needed because ValueLabelProps does not describe all exposed props
export type ValueLabelProps = MUIValueLabelProps & {
  valueLabelDisplay: ValueLabelDisplay
  index: number
}

export interface Props extends ValueLabelProps {
  isTooltipAlwaysVisible: boolean
  disablePortal?: boolean
  compact?: boolean
  isRange?: boolean
  valueLabelDisplay: ValueLabelDisplay
  index: number
}

const SliderValueLabel = ({
  isTooltipAlwaysVisible,
  disablePortal,
  compact,
  isRange,
  children,
  open,
  value,
  valueLabelDisplay,
  index
}: Props) => {
  const thumbRef = useRef<HTMLDivElement>(null)
  const { registerValueLabel, hasTooltipOverlow } = useSliderContext()

  if (valueLabelDisplay === 'off') {
    return children
  }

  const placement = () => {
    if (!isRange) {
      return 'right'
    }

    if (hasTooltipOverlow) {
      return index === 0 ? 'top-end' : 'top-start'
    }

    return 'top'
  }

  const handleTooltipRef = (tooltip: HTMLDivElement) => {
    if (tooltip && thumbRef.current) {
      registerValueLabel(index, tooltip, thumbRef.current)
    }
  }

  return (
    <Tooltip
      ref={thumbRef}
      tooltipRef={handleTooltipRef}
      content={value}
      open={open || valueLabelDisplay === 'on'}
      placement={placement()}
      preventOverflow={isTooltipAlwaysVisible}
      disablePortal={disablePortal}
      compact={compact}
    >
      {children}
    </Tooltip>
  )
}

export default SliderValueLabel
