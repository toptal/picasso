import React, { useRef } from 'react'

import Tooltip from '../Tooltip'
import { useSliderContext } from '../Slider/SliderContext'

type ValueLabelDisplay = 'on' | 'auto' | 'off'

export interface Props {
  tooltip?: ValueLabelDisplay
  disablePortal?: boolean
  compact?: boolean
  valueLabelDisplay: ValueLabelDisplay
  index: number
  children: React.ReactNode
  open: boolean
  value: React.ReactNode
}

const SliderValueLabel = ({
  tooltip,
  disablePortal,
  compact,
  children,
  open,
  value,
  valueLabelDisplay,
  index
}: Props) => {
  const thumbRef = useRef<HTMLDivElement>(null)
  const { registerValueLabel, hasTooltipOverlow } = useSliderContext()
  const isTooltipAlwaysVisible = tooltip === 'on'

  if (valueLabelDisplay === 'off') {
    return <>{children}</>
  }

  const getPlacement = () => {
    if (hasTooltipOverlow) {
      return index === 0 ? 'top-end' : 'top-start'
    }

    return 'top'
  }

  const handleTooltipRef = (tooltipElement: HTMLDivElement) => {
    // At this moment, both thumb and tooltip refs are set so we can register them in the context
    const thumbElement = thumbRef.current

    if (tooltipElement && thumbElement) {
      registerValueLabel(index, tooltipElement, thumbElement)
    }
  }

  return (
    <Tooltip
      ref={thumbRef}
      tooltipRef={handleTooltipRef}
      content={value}
      open={open || valueLabelDisplay === 'on'}
      placement={getPlacement()}
      preventOverflow={isTooltipAlwaysVisible}
      disablePortal={disablePortal}
      compact={compact}
    >
      {children}
    </Tooltip>
  )
}

export default SliderValueLabel
