import React, { forwardRef, ChangeEvent, ComponentProps } from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import MUISlider, { ValueLabelProps } from '@material-ui/core/Slider'
import cx from 'classnames'

import Tooltip from '../Tooltip'
import styles from './styles'

const useStyles = makeStyles<Theme, Props>(styles)

type Value = number | number[]
type ValueLabelDisplay = 'on' | 'auto' | 'off'

export interface Props extends ComponentProps<typeof MUISlider> {
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
  /** Whether marks are shown or not */
  marks?: boolean
  /** Whether component is disabled or not */
  disabled?: boolean
  // Workaround for https://github.com/mui-org/material-ui/issues/21889
  /** The tooltip component. */
  TooltipComponent?: React.ElementType<ValueLabelProps & { index: number }>
  /** Controls when tooltip is displayed:
  - **auto** the value tooltip will display when the thumb is hovered or focused.
  - **on** will display persistently.
  - **off** will never display
  */
  tooltip?: ValueLabelDisplay
  /** The format function the value tooltip's value. */
  tooltipFormat?: string | ((value: number, index: number) => React.ReactNode)
  /** Disable the portal behavior of the tooltip. The children stay within it's parent */
  disablePortal?: boolean
  /** Callback invoked when slider changes its state. */
  onChange?: (event: ChangeEvent<{}>, value: Value) => void
  /** Hide thumb when value is undefined or null. Works only when the component is controlled. */
  hideThumbOnEmpty?: boolean
  /** Disable track highlight. */
  disableTrackHighlight?: boolean
}

// This type is needed because ValueLabelProps does not describe all exposed props
type ValueLabelComponentProps = ValueLabelProps & {
  valueLabelDisplay: ValueLabelDisplay
}

const DefaultTooltip = (
  isTooltipAlwaysVisible: boolean,
  disablePortal?: boolean
): React.FunctionComponent<ValueLabelComponentProps> => ({
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
      placement={isTooltipAlwaysVisible ? 'right' : 'top'}
      preventOverflow={isTooltipAlwaysVisible}
      disablePortal={disablePortal}
    >
      {children}
    </Tooltip>
  )
}

export const Slider = forwardRef<HTMLElement, Props>(function Slider(
  props,
  ref
) {
  const {
    min,
    max,
    marks,
    value,
    defaultValue = 0,
    tooltip,
    tooltipFormat,
    TooltipComponent: UserDefinedTooltip,
    step,
    disabled,
    disablePortal,
    onChange,
    hideThumbOnEmpty,
    disableTrackHighlight,
    ...rest
  } = props
  const {
    wrapper,
    markTrack,
    hideThumb,
    markInactive,
    unmarkTrack,
    ...classes
  } = useStyles(props)
  const isTooltipAlwaysVisible = tooltip === 'on'
  const isThumbHidden =
    hideThumbOnEmpty && (typeof value === 'undefined' || value === null)
  const ValueLabelComponent = (UserDefinedTooltip ||
    DefaultTooltip(
      isTooltipAlwaysVisible,
      disablePortal
    )) as typeof UserDefinedTooltip

  return (
    <div className={wrapper}>
      <MUISlider
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...rest}
        ref={ref}
        defaultValue={defaultValue}
        value={value}
        min={min}
        max={max}
        step={step}
        marks={marks}
        disabled={disabled}
        classes={{
          ...classes,
          track: cx(classes.track, {
            [markTrack]: marks,
            [unmarkTrack]: disableTrackHighlight
          }),
          thumb: cx(classes.thumb, {
            [hideThumb]: isThumbHidden
          }),
          markActive: cx(classes.markActive, {
            [markInactive]: isThumbHidden || disableTrackHighlight
          })
        }}
        ValueLabelComponent={
          // From Workaround for https://github.com/mui-org/material-ui/issues/21889
          ValueLabelComponent as React.ElementType<ValueLabelProps>
        }
        valueLabelFormat={tooltipFormat}
        valueLabelDisplay={tooltip}
        onChange={onChange}
      />
    </div>
  )
})

Slider.displayName = 'Slider'

Slider.defaultProps = {
  defaultValue: 0,
  min: 0,
  max: 100,
  tooltip: 'off',
  disablePortal: false
}

export default Slider
