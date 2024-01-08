/* eslint-disable @typescript-eslint/no-non-null-assertion */
import type { RefObject } from 'react'
import React from 'react'
import type { Theme } from '@material-ui/core/styles'
import { makeStyles } from '@material-ui/core/styles'
import type { BaseProps, SizeType } from '@toptal/picasso-shared'
import { isBrowser } from '@toptal/picasso-shared'
import { ButtonBase } from '@material-ui/core'
import cx from 'classnames'
import { InputAdornment } from '@toptal/picasso-input-adornment'
import { Container } from '@toptal/picasso-container'
import {
  ArrowDownMinor16,
  ArrowUpMinor16,
  ArrowDownMinor24,
  ArrowUpMinor24,
} from '@toptal/picasso-icons'

import styles from './styles'

export interface Props extends BaseProps {
  /** Value of the `input` element. */
  value?: string | number
  /** Minimum value for the `input` element */
  min?: number | string
  /** Maximum value for the `input` element */
  max?: number | string
  /** Next value of the `input` element will be calculated based on step */
  step?: number | string
  /** Indicates whether component is in disabled state */
  disabled?: boolean
  /** Component size */
  size?: SizeType<'small' | 'medium' | 'large'>
  /** Ref of the input element */
  inputRef: RefObject<HTMLInputElement>
}

const useStyles = makeStyles<Theme, Props>(styles, {
  name: 'NumberInputEndAdornment',
})

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const nativeInputValueSetter = isBrowser()
  ? (
      Object.getOwnPropertyDescriptor(
        // eslint-disable-next-line ssr-friendly/no-dom-globals-in-module-scope
        window.HTMLInputElement.prototype,
        'value'
      ) as PropertyDescriptor
    ).set!
  : undefined

export const NumberInputEndAdornment = (props: Props) => {
  const {
    step = 1,
    min = -Infinity,
    max = Infinity,
    value,
    disabled,
    size = 'medium',
    inputRef,
  } = props

  const classes = useStyles(props)

  const normalizedStep = Number(step)
  const normalizedValue = Number(value)
  const normalizedMin = Number(min)
  const normalizedMax = Number(max)

  const fireEvent = (nextValue: number) => {
    if (!nativeInputValueSetter) {
      return
    }

    const input = inputRef?.current

    nativeInputValueSetter.call(input, nextValue)

    const event = new Event('input', {
      bubbles: true,
      cancelable: true,
    })

    if (input) {
      input.dispatchEvent(event)
    }
  }

  const handleUpClick = () => {
    if (typeof value === 'undefined') {
      return
    }

    let nextValue = normalizedValue + normalizedStep

    if (nextValue <= max) {
      if (normalizedValue < normalizedMin + normalizedStep) {
        nextValue = normalizedMin + normalizedStep
      }

      fireEvent(nextValue)
    } else if (normalizedValue !== normalizedMax) {
      nextValue = normalizedMax
      fireEvent(nextValue)
    }
  }

  const handleDownClick = () => {
    if (typeof value === 'undefined') {
      return
    }

    let nextValue = normalizedValue - normalizedStep

    if (nextValue >= min) {
      if (normalizedValue > normalizedMax - normalizedStep) {
        nextValue = normalizedMax - normalizedStep
      }

      fireEvent(nextValue)
    } else if (normalizedValue !== normalizedMin) {
      nextValue = normalizedMin
      fireEvent(nextValue)
    }
  }

  const rootClassName = cx(
    {
      [classes.disabled]: disabled,
    },
    classes[size],
    classes.root
  )

  return (
    <InputAdornment position='end'>
      <Container flex direction='column' inline>
        <ButtonBase
          disabled={disabled}
          classes={{
            root: rootClassName,
          }}
          onClick={handleUpClick}
        >
          {size === 'large' ? <ArrowUpMinor24 /> : <ArrowUpMinor16 />}
        </ButtonBase>
        <ButtonBase
          disabled={disabled}
          classes={{
            root: rootClassName,
          }}
          onClick={handleDownClick}
        >
          {size === 'large' ? <ArrowDownMinor24 /> : <ArrowDownMinor16 />}
        </ButtonBase>
      </Container>
    </InputAdornment>
  )
}

NumberInputEndAdornment.defaultProps = {
  min: -Infinity,
  max: Infinity,
  value: 0,
  step: 1,
  disabled: false,
  size: 'medium',
}

NumberInputEndAdornment.displayName = 'NumberInputEndAdornment'

export default NumberInputEndAdornment
