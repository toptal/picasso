import React, { forwardRef, useState, useEffect, ChangeEvent } from 'react'
import { withStyles } from '@material-ui/core/styles'
import MUISlider from '@material-ui/core/Slider'

import { StandardProps } from '../../Picasso'
import styles from './styles'

export interface Props extends StandardProps {
  /** Minimum slider value */
  min?: number
  /** Maximum slider value */
  max?: number
  /** Controlled value of the component */
  value?: number
  /** Step for the thumb movement */
  step?: number
  /** Whether component is disabled or not */
  disabled?: boolean
  /** Callback invoked when slider changes its state. */
  onChange?: (event: ChangeEvent<{}>, value: number) => void
}

export const Slider = forwardRef<HTMLElement, Props>(function Slider(
  {
    classes,
    onChange = () => {},
    min,
    max,
    value: initialValue,
    step,
    disabled
  },
  ref
) {
  const [value, setValue] = useState<number>(initialValue!)

  const getNormalizedValue = (denormalizedValue: number): number => {
    if (denormalizedValue < 0) {
      return 0
    }

    if (denormalizedValue > max!) {
      return max as number
    }

    return denormalizedValue
  }

  const handleChange = (
    event: ChangeEvent<{}>,
    newValue: number | number[]
  ) => {
    const newNormalizedValue = getNormalizedValue(newValue as number)

    setValue(newNormalizedValue)
    onChange(event, newNormalizedValue)
  }

  useEffect(() => {
    const currentValue = getNormalizedValue(initialValue!)

    setValue(currentValue)
  }, [initialValue])

  return (
    <MUISlider
      ref={ref}
      min={min}
      max={max}
      value={value}
      onChange={handleChange}
      classes={classes}
      step={step}
      disabled={disabled}
    />
  )
})

Slider.defaultProps = {}

Slider.displayName = 'Slider'

Slider.defaultProps = {
  max: 100,
  min: 0,
  onChange: () => {},
  value: 0
}

export default withStyles(styles)(Slider)
