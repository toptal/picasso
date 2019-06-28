import React, { FunctionComponent, ChangeEventHandler, ReactType } from 'react'
import { withStyles } from '@material-ui/core/styles'
import MUIOutlinedInput from '@material-ui/core/OutlinedInput'
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
  /** The width of the legend */
  labelWidth: number
  /** If true, the input will take up the full width of its container */
  fullWidth?: boolean
  disabled?: boolean
  inputComponent?: ReactType<InputBaseComponentProps>
  inputProps?: InputBaseComponentProps
  value?: ValueType
  /** Type attribute of the Input element. It should be a valid HTML5 input type */
  type?: string
  /** If true, the input will indicate an error. */
  error?: boolean
  onChange?: ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>
}

const OutlinedInput: FunctionComponent<Props> = ({
  classes,
  className,
  style,
  labelWidth,
  fullWidth,
  disabled,
  inputComponent,
  inputProps,
  value,
  type,
  error,
  onChange
}) => {
  return (
    <MUIOutlinedInput
      classes={classes}
      className={className}
      style={style}
      labelWidth={labelWidth}
      fullWidth={fullWidth}
      disabled={disabled}
      inputComponent={inputComponent}
      inputProps={inputProps}
      value={value}
      type={type}
      onChange={onChange}
    />
  )
}

export default withStyles(styles)(OutlinedInput)
