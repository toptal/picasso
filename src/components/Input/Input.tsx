import React, {
  ReactNode,
  ChangeEvent,
  InputHTMLAttributes,
  forwardRef
} from 'react'
import cx from 'classnames'
import { withStyles } from '@material-ui/core/styles'

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
  /** The default `input` element value. Use when the component is not controlled. */
  defaultValue?: string
  /** The value of the `input` element, required for a controlled component. */
  value?: string
  /** Placeholder for value */
  placeholder?: string
  /** Indicate whether `Input` is in error state */
  error?: boolean
  /** If true, the `Input` will be disabled */
  disabled?: boolean
  /** Width of the component */
  width?: 'full' | 'shrink' | 'auto'
  /** Focus during first mount */
  autoFocus?: boolean
  /** Helps users to fill forms faster */
  autoComplete?: string
  /** Whether icon should be placed at the beginning or end of the `Input` */
  iconPosition?: IconPosition
  /** Specify icon which should be rendered inside Input */
  icon?: ReactNode
  /** Whether `Input` should be rendered as `TextArea` or not */
  multiline?: boolean
  /** Specify rows amount for `TextArea` */
  rows?: string | number
  /* Maximum number of rows to display when multiline option is set to true. */
  rowsMax?: string | number
  /** Type attribute of the Input element. It should be a valid HTML5 input type */
  type?: string
  /** Adds element at the start of the input - can't be used in combination with `iconPosition: start` */
  startAdornment?: ReactNode
  /** Adds element at the end of the input - can't be used in combination with `iconPosition: end` */
  endAdornment?: ReactNode
  /**  Callback invoked when `Input` changes its state */
  onChange?: (
    event: ChangeEvent<
      HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement
    >
  ) => void
}

export const Input = forwardRef<HTMLInputElement, Props>(function Input(
  {
    id,
    name,
    defaultValue,
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
    width,
    className,
    style,
    rows,
    rowsMax,
    type,
    onChange,
    startAdornment,
    endAdornment,
    ...rest
  },
  ref
) {
  const IconAdornment = icon && (
    <InputAdornment position={iconPosition!} disabled={disabled}>
      {icon}
    </InputAdornment>
  )
  const usedStartAdornment =
    icon && iconPosition === 'start' ? IconAdornment : startAdornment
  const usedEndAdornment =
    icon && iconPosition === 'end' ? IconAdornment : endAdornment

  return (
    <OutlinedInput
      ref={ref}
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
      defaultValue={defaultValue}
      value={value}
      placeholder={placeholder}
      error={error}
      disabled={disabled}
      autoFocus={autoFocus}
      // https://developers.google.com/web/updates/2015/06/checkout-faster-with-autofill
      // according to chrome specification
      autoComplete={autoComplete}
      multiline={multiline}
      rows={rows}
      rowsMax={rowsMax}
      type={type}
      width={width}
      // html attributes
      inputProps={rest}
      endAdornment={usedEndAdornment}
      startAdornment={usedStartAdornment}
      onChange={onChange}
    >
      {children}
    </OutlinedInput>
  )
})

Input.defaultProps = {
  autoComplete: 'none',
  iconPosition: 'start',
  multiline: false,
  width: 'auto'
}

Input.displayName = 'Input'

export default withStyles(styles)(Input)
