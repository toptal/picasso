import React from 'react'
import { BaseProps } from '@toptal/picasso-shared'
import { Input, InputProps } from '@toptal/picasso'
import { Time16 } from '@toptal/picasso/Icon'
import { Theme, makeStyles } from '@material-ui/core/styles'
import InputMask from 'react-input-mask'
import { detect } from 'detect-browser'

import styles from './styles'

const useStyles = makeStyles<Theme, Props>(styles, {
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
      | 'onChange'
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
  /** Method that will be invoked with selected value */
  onChange: (value: string) => void
}

export const TimePicker = (props: Props) => {
  const { onChange, value } = props
  const classes = useStyles(props)
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

  const getIcon = () => <Time16 classes={{ root: classes.icon }} />

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const target = e.target as HTMLInputElement
    const nextValue = target.value
    onChange(nextValue)
  }

  if (isSafari) {
    return (
      <Input
        type='text'
        onChange={handleInputChange}
        readOnly
        iconPosition='end'
        icon={getIcon()}
        inputProps={{
          className: classes.inputBase
        }}
        startAdornment={
          <InputMask
            mask={inputMask}
            alwaysShowMask
            // @ts-ignore
            maskPlaceholder='-'
            value={value}
            onChange={handleInputChange}
            className={classes.inputMask}
          />
        }
      />
    )
  }
  return (
    <Input
      type='time'
      onChange={handleInputChange}
      value={value}
      iconPosition='end'
      icon={getIcon()}
      inputProps={{
        className: classes.inputBase,
        step: 60 // 1 min
      }}
    />
  )
}

TimePicker.defaultProps = {}

TimePicker.displayName = 'TimePicker'

export default TimePicker
