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
  /** The default element value. Use when the component is not controlled. */
  defaultValue?: Value
  /** Step for the thumb movement */
  step?: number
  /** Whether component is disabled or not */
  disabled?: boolean
  /** The value label component. */
  ValueLabelComponent?: React.ElementType<ValueLabelProps>
  /** Controls when the value label is displayed:
  - **auto** the value label will display when the thumb is hovered or focused.
  - **on** will display persistently.
  - **off** will never display
  */
  valueLabelDisplay?: 'on' | 'auto' | 'off'
  /** The format function the value label's value. */
  valueLabelFormat?:
    | string
    | ((value: number, index: number) => React.ReactNode)
  /** Callback invoked when slider changes its state. */
  onChange?: (event: ChangeEvent<{}>, value: Value) => void
}

type ValueLabelComponentProps = ValueLabelProps & {
  valueLabelFormat?:
    | string
    | ((value: number, index: number) => React.ReactNode)
  index?: number
}

const DefaultValueLabelComponent: React.FunctionComponent<
  ValueLabelComponentProps
> = ({ children, open, value, valueLabelFormat, index = 0 }) => {
  const content =
    valueLabelFormat &&
    (typeof valueLabelFormat === 'string'
      ? valueLabelFormat
      : valueLabelFormat(value, index))

  return (
    <Tooltip arrow content={content} open={open} placement='top'>
      {children}
    </Tooltip>
  )
}

export const Slider = forwardRef<HTMLElement, Props>(function Slider(
  {
    classes,
    valueLabelDisplay,
    valueLabelFormat,
    ValueLabelComponent: UserDefinedValueLabelComponent,
    ...rest
  },
  ref
) {
  const shouldDisplayLabel =
    valueLabelDisplay === 'on' ||
    valueLabelDisplay === 'auto' ||
    UserDefinedValueLabelComponent ||
    valueLabelFormat

  let ValueLabelComponent: typeof UserDefinedValueLabelComponent

  if (shouldDisplayLabel) {
    ValueLabelComponent =
      UserDefinedValueLabelComponent || DefaultValueLabelComponent
  }

  return (
    <MUISlider
      {...rest}
      ref={ref}
      classes={classes}
      ValueLabelComponent={ValueLabelComponent}
      valueLabelFormat={valueLabelFormat}
    />
  )
})

Slider.displayName = 'Slider'

Slider.defaultProps = {
  defaultValue: 0
}

export default withStyles(styles)(Slider)
