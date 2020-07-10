import React from 'react'
import { BaseProps } from '@toptal/picasso-shared'
import { Input, InputProps } from '@toptal/picasso'
import { Time16 } from '@toptal/picasso/Icon'
import { Theme, makeStyles } from '@material-ui/core/styles'

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
  const { onChange, value, ...rest } = props
  const classes = useStyles(props)

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement
    >
  ) => {
    const nextValue = e.target.value

    onChange(nextValue)
  }

  return (
    <Input
      id='time'
      type='time'
      onChange={handleInputChange}
      value={value}
      iconPosition='end'
      className={classes.input}
      icon={<Time16 classes={{ root: classes.icon }} />}
      inputProps={{
        className: classes.inputBase,
        step: 60 // 1 min
      }}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
    />
  )
}

TimePicker.defaultProps = {}

TimePicker.displayName = 'TimePicker'

export default TimePicker
