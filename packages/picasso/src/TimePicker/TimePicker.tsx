import React, { useEffect, useState } from 'react'
import type { BaseProps } from '@toptal/picasso-shared'
import type { Theme } from '@material-ui/core/styles'
import { makeStyles } from '@material-ui/core/styles'
import InputMask from 'react-input-mask'
import { detect } from 'detect-browser'
import cx from 'classnames'

import type { InputProps } from '../Input'
import Input from '../Input'
import { Time16 } from '../Icon'
import styles from './styles'
import { usePropDeprecationWarning } from '../utils/use-deprecation-warnings'
import type { Status } from '../OutlinedInput'

const useStyles = makeStyles<Theme>(styles, {
  name: 'PicassoTimePicker',
})

export interface Props
  extends BaseProps,
    Omit<
      InputProps,
      | 'id'
      | 'value'
      | 'onSelect'
      | 'onChange'
      | 'type'
      | 'multiline'
      | 'rows'
      | 'defaultValue'
      | 'step'
      | 'icon'
      | 'iconPosition'
      | 'counter'
      | 'endAdornment'
      | 'startAdornment'
      | 'multilineResizable'
      | 'rowsMax'
      | 'limit'
      | 'placeholder'
      | 'status'
    > {
  /** Time value that will be selected in TimePicker */
  value?: string
  /** Indicate whether `TimePicker` is in `error` or `default` state */
  status?: Extract<Status, 'error' | 'default'>
  /** Called on input change */
  onChange?: (value: string) => void
}

const VALID_TIME_REGEX = new RegExp(/^([0-1][0-9]|2[0-3]):[0-5][0-9]$/)

export const TimePicker = (props: Props) => {
  const {
    onChange: externalOnChange,
    value: externalValue,
    width,
    className,
    error,
    status,
    highlight,
    ...rest
  } = props

  const [value, setValue] = useState(externalValue)

  useEffect(() => {
    // Set internal value based on the provided one if the later is correct
    if (externalValue && VALID_TIME_REGEX.test(externalValue)) {
      setValue(externalValue)
    }
  }, [externalValue])

  const onChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const newValue = event.target.value

    setValue(newValue)

    if (newValue && VALID_TIME_REGEX.test(newValue)) {
      externalOnChange?.(newValue)
    } else {
      externalOnChange?.('')
    }
  }

  usePropDeprecationWarning({
    props,
    name: 'error',
    componentName: 'TimePicker',
    description:
      'Use the `status` prop instead. `error` is deprecated and will be removed in the next major release.',
  })

  const classes = useStyles()
  const browser = detect()
  const isSafari = browser?.name === 'safari'
  const startsWithTwo = value && value[0] === '2'

  const inputMask = [
    /[0-2]/,
    startsWithTwo ? /[0-3]/ : /[0-9]/,
    ':',
    /[0-5]/,
    /[0-9]/,
  ]

  const icon = <Time16 classes={{ root: classes.icon }} />

  if (isSafari) {
    return (
      <Input
        type='text'
        readOnly
        iconPosition='end'
        icon={icon}
        width={width}
        status={error ? 'error' : status}
        className={cx(classes.root, className)}
        highlight={highlight}
        inputProps={{
          className: classes.inputBase,
          ...rest,
        }}
        startAdornment={
          <InputMask
            mask={inputMask}
            alwaysShowMask
            maskPlaceholder='-'
            value={value}
            onChange={onChange}
            className={classes.inputMask}
          />
        }
      />
    )
  }

  return (
    <Input
      type='time'
      value={value}
      className={cx(classes.root, className)}
      onChange={onChange}
      iconPosition='end'
      highlight={highlight}
      icon={icon}
      width={width}
      status={error ? 'error' : status}
      inputProps={{
        className: classes.inputBase,
        step: 60, // 1 min
        ...rest,
      }}
    />
  )
}

TimePicker.defaultProps = {
  status: 'default',
}

TimePicker.displayName = 'TimePicker'

export default TimePicker
