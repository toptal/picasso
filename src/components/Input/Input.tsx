import React, { FunctionComponent, ReactType, ChangeEventHandler } from 'react'
import { withStyles } from '@material-ui/core/styles'
import MUIInput from '@material-ui/core/Input'
import { InputBaseComponentProps } from '@material-ui/core/InputBase'

import { StandardProps } from '../Picasso'
import styles from './styles'

type ValueType =
  | Array<string | number | boolean | object>
  | string
  | number
  | boolean
  | object

export interface Props extends StandardProps {
  /** If true, the input will not have an underline */
  disableUnderline?: boolean
  /** If true, the input will take up the full width of its container */
  fullWidth?: boolean
  disabled?: boolean
  inputComponent?: ReactType<InputBaseComponentProps>
  inputProps?: InputBaseComponentProps
  value?: ValueType
  onChange?: ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>
}

const Input: FunctionComponent<Props> = ({
  classes,
  className,
  style,
  disableUnderline,
  fullWidth,
  disabled,
  inputComponent,
  inputProps,
  value,
  onChange,
  elementSelector
}) => {
  return (
    <MUIInput
      classes={classes}
      className={className}
      style={style}
      disableUnderline={disableUnderline}
      fullWidth={fullWidth}
      disabled={disabled}
      inputComponent={inputComponent}
      inputProps={inputProps}
      value={value}
      onChange={onChange}
      data-qa={elementSelector}
    />
  )
}

export default withStyles(styles)(Input)
