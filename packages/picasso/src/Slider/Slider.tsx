import React, { forwardRef, ChangeEvent } from 'react'
import { withStyles } from '@material-ui/core/styles'
import MUISlider, {
  SliderProps,
  ValueLabelProps
} from '@material-ui/core/Slider'
import { Tooltip } from '@toptal/picasso'

import styles from './styles'

type Value = number | number[]
type ValueLabelDisplay = 'on' | 'auto' | 'off'

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
  tooltip?: ValueLabelDisplay
  /** The format function the value tooltip's value. */
  tooltipFormat?: string | ((value: number, index: number) => React.ReactNode)
  /** Callback invoked when slider changes its state. */
  onChange?: (event: ChangeEvent<{}>, value: Value) => void
}

// This type is needed because ValueLabelProps does not describe all exposed props
type ValueLabelComponentProps = ValueLabelProps & {
  valueLabelDisplay: ValueLabelDisplay
}

const DefaultTooltip: React.FunctionComponent<ValueLabelComponentProps> = ({
  children,
  open,
  value,
  valueLabelDisplay
}) => {
  if (valueLabelDisplay === 'off') {
    return children
  }

  return (
    <Tooltip
      arrow
      content={value}
      open={open || valueLabelDisplay === 'on'}
      placement='top'
    >
      {children}
    </Tooltip>
  )
}

export const Slider = forwardRef<HTMLElement, Props>(function Slider(
  {
    min,
    max,
    value,
    defaultValue = 0,
    classes,
    tooltip,
    tooltipFormat,
    TooltipComponent: UserDefinedTooltip,
    step,
    disabled,
    onChange,
    ...rest
  },
  ref
) {
  const ValueLabelComponent = (UserDefinedTooltip ||
    DefaultTooltip) as typeof UserDefinedTooltip

  return (
    <MUISlider
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
      ref={ref}
      defaultValue={defaultValue}
      value={value}
      min={min}
      max={max}
      step={step}
      disabled={disabled}
      classes={classes}
      ValueLabelComponent={ValueLabelComponent}
      valueLabelFormat={tooltipFormat}
      valueLabelDisplay={tooltip}
      onChange={onChange}
    />
  )
})

Slider.displayName = 'Slider'

Slider.defaultProps = {
  defaultValue: 0,
  min: 0,
  max: 100,
  tooltip: 'off'
}

export default withStyles(styles)(Slider)
