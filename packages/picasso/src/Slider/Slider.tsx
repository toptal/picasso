import React, { forwardRef } from 'react'
import { withStyles } from '@material-ui/core/styles'
import MUISlider, {
  SliderProps,
  ValueLabelProps
} from '@material-ui/core/Slider'
import { Tooltip } from '@toptal/picasso'

import styles from './styles'

export type Props = SliderProps

type ValueLabelComponentProps = ValueLabelProps & {
  valueLabelFormat?:
    | string
    | ((value: number, index: number) => React.ReactNode)
  index?: number
}

const DefaultValueLabelComponent: React.FunctionComponent<
  ValueLabelComponentProps
> = ({ children, open, value, valueLabelFormat, index }) => (
  <Tooltip
    arrow
    content={
      valueLabelFormat &&
      (typeof valueLabelFormat === 'string'
        ? valueLabelFormat
        : valueLabelFormat(value, index || 0))
    }
    open={open}
    placement='top'
  >
    {children}
  </Tooltip>
)

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

  const ValueLabelComponent = shouldDisplayLabel
    ? UserDefinedValueLabelComponent || DefaultValueLabelComponent
    : undefined

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
