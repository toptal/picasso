import React from 'react'
import { BaseProps } from '@toptal/picasso-shared'
import { Input, InputProps } from '@toptal/picasso'
import { Time16 } from '@toptal/picasso/Icon'
import { Theme, makeStyles } from '@material-ui/core/styles'
import InputMask from 'react-input-mask'
import { detect } from 'detect-browser'
import cx from 'classnames'

import styles from './styles'

const useStyles = makeStyles<Theme>(styles, {
  name: 'PicassoTimePicker'
})

export interface Props
  extends BaseProps,
    Omit<
      InputProps,
      | 'id'
      | 'value'
      | 'onSelect'
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
      | 'enableReset'
      | 'onResetClick'
      | 'multilineResizable'
      | 'rowsMax'
      | 'limit'
      | 'placeholder'
    > {
  /** Time value that will be selected in TimePicker */
  value?: string
}

export const TimePicker = (props: Props) => {
  const { onChange, value, width, className, ...rest } = props
  const classes = useStyles()
  const browser = detect()
  const isSafari = browser?.name === 'safari'
  const startsWithTwo = value && value[0] === '2'

  const inputMask = [
    /[0-2]/,
    startsWithTwo ? /[0-3]/ : /[0-9]/,
    ':',
    /[0-5]/,
    /[0-9]/
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
        className={cx(classes.root, className)}
        inputProps={{
          className: classes.inputBase,
          ...rest
        }}
        startAdornment={
          <InputMask
            mask={inputMask}
            alwaysShowMask
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
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
      icon={icon}
      width={width}
      inputProps={{
        className: classes.inputBase,
        step: 60, // 1 min
        ...rest
      }}
    />
  )
}

TimePicker.displayName = 'TimePicker'

export default TimePicker
