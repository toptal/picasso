import React, {
  FunctionComponent,
  ReactNode,
  ChangeEvent,
  InputHTMLAttributes
} from 'react'
import cx from 'classnames'
import MUITextField from '@material-ui/core/TextField'
import { withStyles } from '@material-ui/core/styles'
import { OutlinedInputProps } from '@material-ui/core/OutlinedInput'

import InputAdornment from '../InputAdornment'
import { StandardProps } from '../Picasso'
import styles from './styles'

type IconPosition = 'start' | 'end'
/**
 * Alias for all valid HTML props for `<input>` element.
 * Does not include React's `ref` or `key`.
 */
type HTMLInputProps = InputHTMLAttributes<HTMLInputElement>

export interface Props extends StandardProps, HTMLInputProps {
  /** The id of the `input` element. */
  id?: string
  /** Name attribute of the input element */
  name?: string
  /** The value of the component */
  value?: string
  /** Placeholder for value */
  placeholder?: string
  /** Indicate whether `TextField` is in error state */
  error?: boolean
  /** If true, the `TextField` will be disabled */
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
  value,
  placeholder,
  error,
  disabled,
  autoFocus,
  autoComplete,
  icon,
  iconPosition,
  inputProps = {} as OutlinedInputProps,
  classes,
  children,
  multiline,
  fullWidth,
  className,
  style,
  rows,
  rowsMax,
  type,
  onChange,
  ...rest
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

    inputProps.notched = false

    if (iconPosition === 'end') {
      inputProps.endAdornment = IconAdornment
    } else {
      inputProps.startAdornment = IconAdornment
    }
  }

  return (
    <MUITextField
      id={id}
      name={name}
      value={value}
      placeholder={placeholder}
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
      // html attributes
      inputProps={rest}
      // props that are not html attributes
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
  iconPosition: 'start',
  multiline: false
}

TextField.displayName = 'TextField'

export default withStyles(styles)(TextField)
