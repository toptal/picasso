import React from 'react'
import type { ValueLabelProps as MUIValueLabelProps } from '@material-ui/core/Slider'
import type { SliderValueLabelSlotProps } from '@mui/base/Slider'
import { twJoin } from 'tailwind-merge'

type ValueLabelDisplay = 'on' | 'auto' | 'off'

// This type is needed because ValueLabelProps does not describe all exposed props
export type ValueLabelProps = MUIValueLabelProps & {
  valueLabelDisplay: ValueLabelDisplay
  index: number
}

export interface Props extends SliderValueLabelSlotProps {
  tooltip?: ValueLabelDisplay
  disablePortal?: boolean
  compact?: boolean
}

const flexCommonStyles = 'justify-center items-center'
const tooltipStates: Record<ValueLabelDisplay, string> = {
  off: 'hidden',
  auto: twJoin('hidden group-hover/thumb:flex', flexCommonStyles),
  on: twJoin('flex', flexCommonStyles),
}
const SliderValueLabel = ({ tooltip = 'off', ...props }: Props) => {
  console.log({ props })

  return (
    <div
      className={twJoin(
        'absolute -top-[35px] bg-graphite-800 text-white rounded-sm py-[2px] px-[4px]',
        tooltipStates[tooltip]
      )}
    >
      {/* <Typography
      as='div'
      size='small'
      color='inherit'
    >
      {children}
    </Typography> */}
    </div>
  )
}

// const SliderValueLabel = ({
//   tooltip,
//   disablePortal,
//   compact,
//   children,
//   open,
//   index = -1,
// }: Props) => {
//   const thumbRef = useRef<HTMLDivElement>(null)
//   const { registerValueLabel, hasTooltipOverlow } = useSliderContext()
//   const isTooltipAlwaysVisible = tooltip === 'on'

//   if (tooltip === 'off') {
//     return children
//   }

//   const getPlacement = () => {
//     if (hasTooltipOverlow) {
//       return index === 0 ? 'top-end' : 'top-start'
//     }

//     return 'top'
//   }

//   const handleTooltipRef = (tooltipElement: HTMLDivElement) => {
//     // At this moment, both thumb and tooltip refs are set so we can register them in the context
//     const thumbElement = thumbRef.current

//     if (tooltipElement && thumbElement) {
//       registerValueLabel(index, tooltipElement, thumbElement)
//     }
//   }

//   return (
//     <Tooltip
//       ref={thumbRef}
//       tooltipRef={handleTooltipRef}
//       content={children}
//       open={open || tooltip === 'on'}
//       placement={getPlacement()}
//       preventOverflow={isTooltipAlwaysVisible}
//       disablePortal={disablePortal}
//       compact={compact}
//     >
//       {null}
//     </Tooltip>
//   )
// }

export default SliderValueLabel
