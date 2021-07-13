import React, {
  forwardRef,
  ChangeEvent,
  ComponentProps,
  useRef,
  useMemo
} from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import MUISlider, {
  ValueLabelProps as MUIValueLabelProps
} from '@material-ui/core/Slider'
import cx from 'classnames'

import SliderValueLabel, {
  SliderValueLabelProps,
  ValueLabelProps
} from '../SliderValueLabel'
import { SliderContextProvider } from './SliderContext'
import useCombinedRefs from '../utils/use-combined-refs'
import styles from './styles'

const useStyles = makeStyles<Theme>(styles)

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
  /** Show a compact tooltip */
  compact?: boolean
  /** Disable the portal behavior of the tooltip. The children stay within it's parent */
  disablePortal?: boolean
  /** Callback invoked when slider changes its state. */
  onChange?: (event: ChangeEvent<{}>, value: Value) => void
  /** Hide thumb when value is undefined or null. Works only when the component is controlled. */
  hideThumbOnEmpty?: boolean
  /** Disable track highlight. */
  disableTrackHighlight?: boolean
}

const useValueLabelComponent = ({
  isTooltipAlwaysVisible,
  disablePortal,
  compact,
  isRange
}: Omit<SliderValueLabelProps, keyof ValueLabelProps>) => {
  return useMemo(
    () => (props: ValueLabelProps) => (
      <SliderValueLabel
        {...props}
        isTooltipAlwaysVisible={isTooltipAlwaysVisible}
        disablePortal={disablePortal}
        compact={compact}
        isRange={isRange}
      />
    ),
    [isTooltipAlwaysVisible, disablePortal, compact, isRange]
  )
}

export const Slider = forwardRef<HTMLElement, Props>(function Slider (
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
    compact,
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
  } = useStyles()
  const sliderRef = useCombinedRefs<HTMLElement>(ref, useRef<HTMLElement>(null))

  const isTooltipAlwaysVisible = tooltip === 'on'
  const isRange = Array.isArray(value) && value.length === 2
  const isThumbHidden =
    hideThumbOnEmpty && (typeof value === 'undefined' || value === null)
  const DefaultValueLabelComponent = useValueLabelComponent({
    isTooltipAlwaysVisible,
    disablePortal,
    compact,
    isRange
  })
  // From Workaround for https://github.com/mui-org/material-ui/issues/21889
  const ValueLabelComponent = ((DefaultValueLabelComponent ||
    UserDefinedTooltip) as unknown) as React.ElementType<MUIValueLabelProps>

  return (
    <SliderContextProvider>
      <div className={wrapper}>
        <MUISlider
          {...rest}
          ref={sliderRef}
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
          ValueLabelComponent={ValueLabelComponent}
          valueLabelFormat={tooltipFormat}
          valueLabelDisplay={tooltip}
          onChange={onChange}
        />
      </div>
    </SliderContextProvider>
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
