import React, { FunctionComponent, ReactNode, ChangeEvent } from 'react'
import cx from 'classnames'
import MUITextField from '@material-ui/core/TextField'
import { withStyles } from '@material-ui/core/styles'
import { OutlinedInputProps } from '@material-ui/core/OutlinedInput'
import { InputLabelProps } from '@material-ui/core/InputLabel'

import InputAdornment from '../InputAdornment'
import { StandardProps } from '../Picasso'
import styles from './styles'

type IconPosition = 'start' | 'end'

export interface Props extends StandardProps {
  /** Name attribute of the input element */
  name?: string
  /** Text label for the `TextField` */
  label?: string
  /** The value of the component */
  value?: string
  /** Indicate whether `TextField` is in error state */
  error?: boolean
  /** If true, the switch will be disabled */
  disabled?: boolean
  /** Take the full width of a container */
  fullWidth?: boolean
  /** Focus during first mount */
  autoFocus?: boolean
  /** Whether icon should be placed at the beginning or end of the `TextField` */
  iconPosition?: IconPosition
  /** Specify icon which should be rendered inside TextField */
  icon?: ReactNode
  inputProps?: OutlinedInputProps
  inputLabelProps?: Partial<InputLabelProps>
  /** Whether `TextField` should be rendered as `TextArea` or not */
  multiline?: boolean
  /** Specify rows amount for `TextArea` */
  rows?: number
  /** Type attribute of the Input element. It should be a valid HTML5 input type */
  type?: string
  /**  Callback invoked when `TextField` changes its state */
  onChange?: (
    event: ChangeEvent<
      HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement
    >
  ) => void
}

export const TextField: FunctionComponent<Props> = ({
  name,
  label,
  value,
  error,
  disabled,
  autoFocus,
  icon,
  iconPosition,
  inputProps = {} as OutlinedInputProps,
  inputLabelProps = {},
  classes,
  children,
  multiline,
  fullWidth,
  className,
  style,
  rows,
  type,
  onChange
}) => {
  if (icon) {
    const IconAdornment = (
      <InputAdornment
        className={cx(
          classes.icon,
          iconPosition === 'end' ? classes.iconEnd : classes.iconStart
        )}
        position={iconPosition!}
      >
        {icon}
      </InputAdornment>
    )

    // InputLabelProps.shrink = 'auto' TODO: uncomment when 'auto' PR is merged
    inputProps.notched = false
    inputLabelProps.classes = { shrink: classes.shrink }

    if (iconPosition === 'end') {
      inputProps.endAdornment = IconAdornment
    } else {
      inputProps.startAdornment = IconAdornment
      inputLabelProps.className = classes.labelIconStart
    }
  }

  return (
    <MUITextField
      name={name}
      label={label}
      value={value}
      error={error}
      disabled={disabled}
      autoFocus={autoFocus}
      multiline={multiline}
      variant='outlined'
      style={style}
      rows={rows}
      type={type}
      className={cx(classes.rootFixedWidth, className, {
        [classes.rootFullWidth]: fullWidth
      })}
      InputLabelProps={{
        ...inputLabelProps,
        classes: {
          root: classes.label,
          shrink: classes.labelShrink
        }
      }}
      InputProps={{
        ...inputProps,
        classes: {
          root: cx(classes.root, {
            [classes.rootMultiline]: multiline
          }),
          input: classes.input,
          inputMultiline: classes.inputMultiline
        }
      }}
      onChange={onChange}
    >
      {children}
    </MUITextField>
  )
}

TextField.defaultProps = {
  iconPosition: 'end',
  multiline: false
}

TextField.displayName = 'TextField'

export default withStyles(styles)(TextField)
