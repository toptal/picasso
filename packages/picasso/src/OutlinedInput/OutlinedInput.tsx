import React, {
  ChangeEventHandler,
  ReactType,
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
import { CheckMinor24, CloseMinor16 } from '../Icon'
import styles from './styles'
import noop from '../utils/noop'
import { usePropDeprecationWarning } from '../utils/use-deprecation-warnings'

type ValueType =
  | (string | number | boolean | object)[]
  | string
  | number
  | boolean
  | object

export type Status = 'error' | 'success' | 'default'

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
  inputComponent?: ReactType<InputBaseComponentProps>
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
  /**
   * @deprecated Use the `status` prop instead to both support success and error states
   * Indicate whether input is in error state
   */
  error?: boolean
  /** Indicate input status */
  status?: Status
  startAdornment?: ReactNode
  endAdornment?: ReactNode
  onChange?: ChangeEventHandler<HTMLInputElement>
  /** Component size */
  size?: SizeType<'small' | 'medium' | 'large'>
  /** Whether to render reset icon when there is a value in the input */
  enableReset?: boolean
  /** Callback invoked when reset button was clicked */
  onResetClick?: (
    event: MouseEvent<HTMLButtonElement & HTMLAnchorElement>
  ) => void
  /** Ref of the input element */
  inputRef?: React.Ref<HTMLInputElement>
  testIds?: {
    resetButton?: string
    validIcon?: string
  }
}

const useStyles = makeStyles<Theme, Props>(styles, {
  name: 'PicassoOutlinedInput'
})

const ResetButton = ({
  classes,
  hasValue,
  onClick,
  testIds
}: {
  classes: Classes
  hasValue: boolean
  onClick: (event: MouseEvent<HTMLButtonElement & HTMLAnchorElement>) => void
  testIds?: Props['testIds']
}) => (
  <InputAdornment
    data-testid={testIds?.resetButton}
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

const ValidIconAdornment = ({
  'data-testid': dataTestId
}: {
  'data-testid'?: string
}) => (
  <InputAdornment position='end'>
    <CheckMinor24 color='green' data-testid={dataTestId} />
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
    status,
    startAdornment,
    endAdornment: userDefinedEndAdornment,
    onChange,
    size = 'medium',
    enableReset,
    disabled,
    onResetClick = noop,
    inputRef,
    testIds,
    ...rest
  } = props

  usePropDeprecationWarning({
    props,
    name: 'error',
    componentName: 'OutlinedInput',
    description:
      'Use the `status` prop instead. `error` is deprecated and will be removed in the next major release.'
  })

  const classes = useStyles(props)
  const isDark = inputProps?.variant === 'dark'
  const shouldShowReset = enableReset && !disabled
  const hasEndAdornment = status === 'success' || shouldShowReset
  const endAdornment = hasEndAdornment ? (
    <>
      {shouldShowReset && (
        <ResetButton
          classes={classes}
          hasValue={Boolean(value)}
          onClick={onResetClick}
          testIds={testIds}
        />
      )}
      {status === 'success' && (
        <ValidIconAdornment data-testid={testIds?.validIcon} />
      )}
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
      error={Boolean(status === 'error' || error)}
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
  onResetClick: noop,
  status: 'default'
}

OutlinedInput.displayName = 'OutlinedInput'

export default OutlinedInput
