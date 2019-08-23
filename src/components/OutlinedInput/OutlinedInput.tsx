import React, {
  ChangeEventHandler,
  ReactType,
  ReactNode,
  InputHTMLAttributes,
  forwardRef
} from 'react'
import cx from 'classnames'
import { withStyles } from '@material-ui/core/styles'
import MUIOutlinedInput from '@material-ui/core/OutlinedInput'
import { InputBaseComponentProps } from '@material-ui/core/InputBase'
import { capitalize } from '@material-ui/core/utils/helpers'

import { StandardProps } from '../Picasso'
import styles from './styles'

type ValueType =
  | Array<string | number | boolean | object>
  | string
  | number
  | boolean
  | object

export interface Props
  extends StandardProps,
    Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'defaultValue'> {
  /** The id of the `input` element. */
  id?: string
  /** Name attribute of the input element */
  name?: string
  /** Placeholder for value */
  placeholder?: string
  /** Focus during first mount */
  autoFocus?: boolean
  /** Helps users to fill forms faster */
  autoComplete?: string
  /** Width of the component which will apply `min-width` to the `input` */
  width?: 'full' | 'shrink' | 'auto'
  disabled?: boolean
  inputComponent?: ReactType<InputBaseComponentProps>
  inputProps?: InputBaseComponentProps
  value?: ValueType
  /** Whether `Input` should be rendered as `TextArea` or not */
  multiline?: boolean
  /** Specify rows amount for `TextArea` */
  rows?: string | number
  /* Maximum number of rows to display when multiline option is set to true. */
  rowsMax?: string | number
  /** Type attribute of the Input element. It should be a valid HTML5 input type */
  type?: string
  /** If true, the input will indicate an error. */
  error?: boolean
  startAdornment?: ReactNode
  endAdornment?: ReactNode
  onChange?: ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>
}

const OutlinedInput = forwardRef<HTMLInputElement, Props>(
  function OutlinedInput(
    {
      classes,
      className,
      style,
      id,
      name,
      placeholder,
      autoFocus,
      autoComplete,
      multiline,
      rows,
      rowsMax,
      width,
      disabled,
      inputComponent,
      inputProps,
      value,
      type,
      error,
      startAdornment,
      endAdornment,
      onChange,
      ...rest
    },
    ref
  ) {
    return (
      <MUIOutlinedInput
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...rest}
        classes={{
          root: cx(classes.root, classes[`root${capitalize(width!)}`]),
          input: classes.input,
          inputMultiline: classes.inputMultiline
        }}
        className={className}
        style={style}
        labelWidth={0}
        fullWidth={width === 'full'}
        disabled={disabled}
        error={error}
        inputComponent={inputComponent}
        inputProps={inputProps}
        inputRef={ref}
        value={value}
        type={type}
        startAdornment={startAdornment}
        endAdornment={endAdornment}
        id={id}
        name={name}
        placeholder={placeholder}
        autoFocus={autoFocus}
        autoComplete={autoComplete}
        multiline={multiline}
        rows={rows}
        rowsMax={rowsMax}
        onChange={onChange}
      />
    )
  }
)

OutlinedInput.defaultProps = {
  width: 'auto'
}

OutlinedInput.displayName = 'OutlinedInput'

export default withStyles(styles)(OutlinedInput)
