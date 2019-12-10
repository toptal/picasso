import React, { forwardRef, ChangeEvent } from 'react'
import { withStyles } from '@material-ui/core/styles'
import MUISlider, {
  SliderProps,
  ValueLabelProps
} from '@material-ui/core/Slider'
import { Tooltip } from '@toptal/picasso'

import styles from './styles'

type Value = number | number[]

export interface Props extends SliderProps {
  /** Minimum slider value */
  min?: number
  /** Maximum slider value */
  max?: number
  /** Controlled value of the component */
  value?: Value
  /** The default value. Use when the component is not controlled. */
  defaultValue?: Value
  /** Step for the thumb movement */
  step?: number
  /** Whether component is disabled or not */
  disabled?: boolean
  /** The tooltip component. */
  TooltipComponent?: React.ElementType<ValueLabelProps>
  /** Controls when tooltip is displayed:
  - **auto** the value tooltip will display when the thumb is hovered or focused.
  - **on** will display persistently.
  - **off** will never display
  */
  tooltip?: 'on' | 'auto' | 'off'
  /** The format function the value tooltip's value. */
  tooltipFormat?: string | ((value: number, index: number) => React.ReactNode)
  /** Callback invoked when slider changes its state. */
  onChange?: (event: ChangeEvent<{}>, value: Value) => void
}

// This type is needed because ValueLabelProps does not describe all exposed props
type ValueLabelComponentProps = ValueLabelProps & {
  valueLabelFormat?:
    | string
    | ((value: number, index: number) => React.ReactNode)
  index?: number
}

const DefaultTooltip: React.FunctionComponent<ValueLabelComponentProps> = ({
  children,
  open,
  value,
  valueLabelFormat: tooltipFormat,
  index = 0
}) => {
  const content =
    tooltipFormat && typeof tooltipFormat === 'function'
      ? tooltipFormat(value, index)
      : tooltipFormat

  return (
    <Tooltip arrow content={content} open={open} placement='top'>
      {children}
    </Tooltip>
  )
}

export const Slider = forwardRef<HTMLElement, Props>(function Slider(
  {
    classes,
    tooltip,
    tooltipFormat,
    TooltipComponent: UserDefinedTooltip,
    ...rest
  },
  ref
) {
  const shouldDisplayTooltip =
    tooltip === 'on' ||
    tooltip === 'auto' ||
    UserDefinedTooltip ||
    tooltipFormat

  let Tooltip: typeof UserDefinedTooltip

  if (shouldDisplayTooltip) {
    Tooltip = UserDefinedTooltip || DefaultTooltip
  }

  return (
    <MUISlider
      {...rest}
      ref={ref}
      classes={classes}
      ValueLabelComponent={Tooltip}
      valueLabelFormat={tooltipFormat}
      valueLabelDisplay={tooltip}
    />
  )
})

Slider.displayName = 'Slider'

Slider.defaultProps = {
  defaultValue: 0,
  min: 0,
  max: 0,
  tooltip: 'off'
}

export default withStyles(styles)(Slider)
