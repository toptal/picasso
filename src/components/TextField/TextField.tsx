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
  /** The id of the `input` element. */
  id?: string
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
  /** Helps users to fill forms faster */
  autoComplete?: string
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
  /* Maximum number of rows to display when multiline option is set to true. */
  rowsMax?: number
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
  id,
  name,
  label,
  value,
  error,
  disabled,
  autoFocus,
  autoComplete,
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
  rowsMax,
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
      id={id}
      name={name}
      label={label}
      value={value}
      error={error}
      disabled={disabled}
      autoFocus={autoFocus}
      autoComplete={autoComplete}
      multiline={multiline}
      variant='outlined'
      style={style}
      rows={rows}
      rowsMax={rowsMax}
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
