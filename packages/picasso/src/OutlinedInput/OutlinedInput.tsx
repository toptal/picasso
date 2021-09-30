import React, {
  ChangeEventHandler,
  ElementType,
  ReactNode,
  InputHTMLAttributes,
  MouseEvent,
  forwardRef
} from 'react'
import cx from 'classnames'
import { makeStyles, Theme } from '@material-ui/core/styles'
import MUIOutlinedInput from '@material-ui/core/OutlinedInput'
import { InputBaseComponentProps } from '@material-ui/core/InputBase'
import capitalize from '@material-ui/core/utils/capitalize'
import { StandardProps, SizeType, Classes } from '@toptal/picasso-shared'

import InputAdornment from '../InputAdornment'
import Button from '../Button'
import { CloseMinor16 } from '../Icon'
import styles from './styles'
import noop from '../utils/noop'

type ValueType =
  | (string | number | boolean | object)[]
  | string
  | number
  | boolean
  | object

export type BaseInputProps = InputBaseComponentProps & {
  variant?: 'dark' | 'light'
}

export interface Props
  extends StandardProps,
    Omit<
      InputHTMLAttributes<HTMLInputElement>,
      'value' | 'defaultValue' | 'size' | 'color'
    > {
  /** Width of the component */
  width?: 'full' | 'shrink' | 'auto'
  inputComponent?: ElementType<InputBaseComponentProps>
  inputProps?: BaseInputProps
  defaultValue?: ValueType
  value?: ValueType
  /** Whether `Input` should be rendered as `TextArea` or not */
  multiline?: boolean
  /** If true, the input element will be focused during the first mount */
  autoFocus?: boolean
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
  onChange?: ChangeEventHandler<HTMLInputElement>
  /**
   * Size of component
   * @default medium
   */
  size?: SizeType<'small' | 'medium' | 'large'>
  /** Whether to render reset icon when there is a value in the input */
  enableReset?: boolean
  /** Callback invoked when reset button was clicked */
  onResetClick?: (
    event: MouseEvent<HTMLButtonElement & HTMLAnchorElement>
  ) => void
  /** Ref of the input element */
  inputRef?: React.Ref<HTMLInputElement>
}

const useStyles = makeStyles<Theme, Props>(styles, {
  name: 'PicassoOutlinedInput'
})

const ResetButton = ({
  classes,
  hasValue,
  onClick
}: {
  classes: Classes
  hasValue: boolean
  onClick: (event: MouseEvent<HTMLButtonElement & HTMLAnchorElement>) => void
}) => (
  <InputAdornment
    data-testid='reset-adornment'
    position='end'
    className={cx(classes.resetButton, {
      [classes.resetButtonDirty]: hasValue
    })}
  >
    <Button.Circular
      tabIndex={-1}
      icon={<CloseMinor16 />}
      variant='flat'
      role='reset'
      onClick={onClick}
      onMouseDown={(
        event: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>
      ) => event.preventDefault()}
      onFocus={(
        event: React.FocusEvent<HTMLButtonElement | HTMLAnchorElement>
      ) => event.stopPropagation()}
    />
  </InputAdornment>
)

const OutlinedInput = forwardRef<HTMLElement, Props>(function OutlinedInput(
  props,
  ref
) {
  const {
    className,
    style,
    multiline,
    autoFocus,
    rows,
    rowsMax,
    width = 'auto',
    inputComponent,
    inputProps,
    defaultValue,
    value,
    type,
    error,
    startAdornment,
    endAdornment: userDefinedEndAdornment,
    onChange,
    size = 'medium',
    enableReset,
    disabled,
    onResetClick = noop,
    inputRef,
    ...rest
  } = props

  const classes = useStyles(props)
  const isDark = inputProps?.variant === 'dark'
  const shouldShowReset = enableReset && !disabled
  const endAdornment = shouldShowReset ? (
    <>
      <ResetButton
        classes={classes}
        hasValue={Boolean(value)}
        onClick={onResetClick}
      />
      {userDefinedEndAdornment}
    </>
  ) : (
    userDefinedEndAdornment
  )

  return (
    <MUIOutlinedInput
      {...rest}
      classes={{
        root: cx(
          classes.root,
          classes[`root${capitalize(width)}`],
          classes[`root${capitalize(size)}`],
          { [`${classes.hidden}`]: type === 'hidden' },
          { [classes.rootDark]: isDark }
        ),
        input: cx(classes.input, classes[`input${capitalize(size)}`], {
          [classes.inputDark]: isDark
        }),
        inputMultiline: classes.inputMultiline,
        notchedOutline: cx(classes.notchedOutline, {
          [classes.notchedOutlineDark]: isDark
        }),
        focused: classes.focused
      }}
      className={className}
      style={style}
      labelWidth={0}
      fullWidth={width === 'full'}
      error={error}
      inputComponent={inputComponent}
      inputProps={inputProps}
      ref={ref}
      inputRef={inputRef}
      defaultValue={defaultValue}
      value={value}
      type={type}
      startAdornment={startAdornment}
      endAdornment={endAdornment}
      multiline={multiline}
      autoFocus={autoFocus}
      rows={rows}
      rowsMax={rowsMax}
      onChange={onChange}
      disabled={disabled}
    />
  )
})

OutlinedInput.defaultProps = {
  width: 'auto',
  size: 'medium',
  onResetClick: noop
}

OutlinedInput.displayName = 'OutlinedInput'

export default OutlinedInput
