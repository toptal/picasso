import React, {
  forwardRef,
  ChangeEvent,
  ComponentProps,
  useRef,
  useState,
  useMemo
} from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import MUISlider, { ValueLabelProps } from '@material-ui/core/Slider'
import cx from 'classnames'

import useCombinedRefs from '../utils/use-combined-refs'
import Tooltip from '../Tooltip'
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

// This type is needed because ValueLabelProps does not describe all exposed props
type ValueLabelComponentProps = ValueLabelProps & {
  valueLabelDisplay: ValueLabelDisplay
  index: number
}

type DefaultTooltipProps = {
  isTooltipAlwaysVisible: boolean
  disablePortal?: boolean
  compact?: boolean
  isTooltipReversed?: boolean
}

const DefaultTooltip = ({
  isTooltipAlwaysVisible,
  disablePortal,
  compact,
  isTooltipReversed
}: DefaultTooltipProps): React.FunctionComponent<ValueLabelComponentProps> => ({
  children,
  open,
  value,
  valueLabelDisplay,
  index
}) => {
  if (valueLabelDisplay === 'off') {
    return children
  }

  const placement = () => {
    if (!isTooltipAlwaysVisible) {
      return 'top'
    }

    if (isTooltipReversed) {
      return index === 0 ? 'left' : 'right'
    }

    return index === 0 ? 'right' : 'left'
  }

  return (
    <Tooltip
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
  const [isTooltipReversed, setIsTooltipReversed] = useState(false)

  const isTooltipAlwaysVisible = tooltip === 'on'
  const isThumbHidden =
    hideThumbOnEmpty && (typeof value === 'undefined' || value === null)
  const ValueLabelComponent = useMemo(
    () =>
      (UserDefinedTooltip ||
        DefaultTooltip({
          isTooltipAlwaysVisible,
          disablePortal,
          compact,
          isTooltipReversed
        })) as typeof UserDefinedTooltip,
    [
      UserDefinedTooltip,
      compact,
      disablePortal,
      isTooltipAlwaysVisible,
      isTooltipReversed
    ]
  )

  const watchTooltipsPlacement = () => {
    if (sliderRef.current) {
      const tooltips: NodeListOf<HTMLElement> = sliderRef.current.querySelectorAll(
        '[role="tooltip"]'
      )
      const sliders: NodeListOf<HTMLElement> = sliderRef.current.querySelectorAll(
        '[role="slider"]'
      )

      if (sliders.length === 2 && tooltips.length === 2) {
        const minDistance = Array.from(tooltips).reduce((acc, cur) => {
          return acc + cur.offsetWidth
        }, 0)

        const distance = sliders[1].offsetLeft - sliders[0].offsetLeft

        if (distance < minDistance) {
          setIsTooltipReversed(true)
        } else {
          setIsTooltipReversed(false)
        }
      }
    }
  }

  const handleChange = (event: React.ChangeEvent<{}>, newValue: Value) => {
    onChange?.(event, newValue)

    if (disablePortal && Array.isArray(value) && value.length === 2) {
      watchTooltipsPlacement()
    }
  }

  return (
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
        ValueLabelComponent={
          // From Workaround for https://github.com/mui-org/material-ui/issues/21889
          (ValueLabelComponent as unknown) as React.ElementType<ValueLabelProps>
        }
        valueLabelFormat={tooltipFormat}
        valueLabelDisplay={tooltip}
        onChange={handleChange}
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
