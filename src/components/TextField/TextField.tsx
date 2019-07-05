import React, {
  FunctionComponent,
  ReactNode,
  ChangeEvent,
  InputHTMLAttributes
} from 'react'
import cx from 'classnames'
import { withStyles } from '@material-ui/core/styles'
import { OutlinedInputProps } from '@material-ui/core/OutlinedInput'

import InputAdornment from '../InputAdornment'
import OutlinedInput from '../OutlinedInput'
import { StandardProps } from '../Picasso'
import styles from './styles'

type IconPosition = 'start' | 'end'

export interface Props
  extends StandardProps,
    InputHTMLAttributes<HTMLInputElement> {
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
  /** Width of the component which will apply `min-width` to the `input` */
  width?: 'full' | 'shrink' | 'auto'
  /** Focus during first mount */
  autoFocus?: boolean
  /** Helps users to fill forms faster */
  autoComplete?: string
  /** Whether icon should be placed at the beginning or end of the `TextField` */
  iconPosition?: IconPosition
  /** Specify icon which should be rendered inside TextField */
  icon?: ReactNode
  inputProps?: OutlinedInputProps // DEPRECATED: remove in v3
  /** Whether `TextField` should be rendered as `TextArea` or not */
  multiline?: boolean
  /** Specify rows amount for `TextArea` */
  rows?: string | number
  /* Maximum number of rows to display when multiline option is set to true. */
  rowsMax?: string | number
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
  classes,
  children,
  multiline,
  fullWidth,
  width,
  className,
  style,
  rows,
  rowsMax,
  type,
  onChange,
  inputProps,
  ...rest
}) => {
  const IconAdornment = icon && (
    <InputAdornment position={iconPosition!} disabled={disabled}>
      {icon}
    </InputAdornment>
  )

  return (
    <OutlinedInput
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...inputProps}
      className={className}
      style={style}
      classes={{
        root: cx(classes.root, {
          [classes.rootMultiline]: multiline
        }),
        input: classes.input
      }}
      id={id}
      name={name}
      value={value}
      placeholder={placeholder}
      error={error}
      disabled={disabled}
      autoFocus={autoFocus}
      autoComplete={autoComplete}
      multiline={multiline}
      rows={rows}
      rowsMax={rowsMax}
      type={type}
      width={fullWidth ? 'full' : width}
      // html attributes
      inputProps={rest}
      endAdornment={iconPosition === 'end' && IconAdornment}
      startAdornment={iconPosition === 'start' && IconAdornment}
      onChange={onChange}
    >
      {children}
    </OutlinedInput>
  )
}

TextField.defaultProps = {
  iconPosition: 'start',
  multiline: false
}

TextField.displayName = 'TextField'

export default withStyles(styles)(TextField)
