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
import { StandardProps, SizeType } from '@toptal/picasso-shared'

import styles from './styles'

type PropsIndex = { [index: string]: Props }
type ValueType =
  | (string | number | boolean | object)[]
  | string
  | number
  | boolean
  | object

export interface Props
  extends StandardProps,
    Omit<
      InputHTMLAttributes<HTMLInputElement>,
      'value' | 'defaultValue' | 'size'
    > {
  /** Width of the component */
  width?: 'full' | 'shrink' | 'auto'
  inputComponent?: ReactType<InputBaseComponentProps>
  inputProps?: InputBaseComponentProps
  defaultValue?: ValueType
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
  size?: SizeType<'small' | 'medium'>
}

const disableUnsupportedProps = (props: Props) => {
  const { size } = props

  if (size !== 'small') {
    return props
  }

  const unsupportedProps: Partial<Props> = {
    multiline: false,
    startAdornment: undefined,
    endAdornment: undefined
  }
  const unsupportedPropNames = Object.keys(unsupportedProps)

  if (
    unsupportedPropNames.some(
      propName =>
        // @ts-ignore
        props[propName]
    )
  ) {
    console.warn(
      `OutlinedInput with size="small" doesn't support: ${unsupportedPropNames.join(
        ', '
      )} props`
    )

    return { ...props, ...unsupportedProps }
  }

  return props
}

const OutlinedInput = forwardRef<HTMLInputElement, Props>(
  function OutlinedInput(props, ref) {
    const {
      classes,
      className,
      style,
      multiline,
      rows,
      rowsMax,
      width,
      inputComponent,
      inputProps,
      defaultValue,
      value,
      type,
      error,
      startAdornment,
      endAdornment,
      onChange,
      size,
      ...rest
    } = disableUnsupportedProps(props)

    return (
      <MUIOutlinedInput
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...rest}
        classes={{
          root: cx(
            classes.root,
            classes[`root${capitalize(width!)}`],
            classes[`root${capitalize(size!)}`]
          ),
          input: cx(classes.input, classes[`input${capitalize(size!)}`]),
          inputMultiline: classes.inputMultiline
        }}
        className={className}
        style={style}
        labelWidth={0}
        fullWidth={width === 'full'}
        error={error}
        inputComponent={inputComponent}
        inputProps={inputProps}
        inputRef={ref}
        defaultValue={defaultValue}
        value={value}
        type={type}
        startAdornment={startAdornment}
        endAdornment={endAdornment}
        multiline={multiline}
        rows={rows}
        rowsMax={rowsMax}
        onChange={onChange}
      />
    )
  }
)

OutlinedInput.defaultProps = {
  width: 'auto',
  size: 'medium'
}

OutlinedInput.displayName = 'OutlinedInput'

export default withStyles(styles)(OutlinedInput)
