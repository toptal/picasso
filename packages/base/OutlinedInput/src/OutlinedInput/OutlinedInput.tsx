import type {
  ChangeEventHandler,
  ReactType,
  ReactNode,
  InputHTMLAttributes,
  MouseEvent,
} from 'react'
import React, { forwardRef, useImperativeHandle, useRef } from 'react'
import type { InputBaseComponentProps } from '@material-ui/core/InputBase'
import type { SizeType, BaseProps } from '@toptal/picasso-shared'
import {
  InputAdornment,
  InputValidIconAdornment,
} from '@toptal/picasso-input-adornment'
import { ButtonCircular } from '@toptal/picasso-button'
import { CloseMinor16 } from '@toptal/picasso-icons'
import { noop, usePropDeprecationWarning } from '@toptal/picasso-utils'
import { useFieldsLayoutContext } from '@toptal/picasso-form'
import { Input } from '@mui/base/Input'
import { twJoin } from '@toptal/picasso-tailwind-merge'

import { getInputClassName, getRootClassName, getRows } from './utils/utils'

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

export interface InputProps
  extends React.HTMLAttributes<HTMLInputElement>,
    BaseProps {
  size?: number | 'small' | 'medium' | 'large'
  multiple?: boolean | undefined
}

export interface Props
  extends BaseProps,
    Omit<
      InputHTMLAttributes<HTMLInputElement>,
      'value' | 'defaultValue' | 'size' | 'color'
    > {
  /** Classes for input and root */
  classes?: { input?: string; root?: string }
  /** Width of the component */
  width?: 'full' | 'shrink' | 'auto'
  inputComponent?: ReactType<InputBaseComponentProps>
  inputProps?: BaseInputProps
  defaultValue?: ValueType
  value?: ValueType
  /** Whether `Input` should be rendered as `TextArea` or not */
  multiline?: boolean
  /** If true, `TextArea` would be resizable vertical */
  multilineResizable?: boolean
  /** If true, the input element will be focused during the first mount */
  autoFocus?: boolean
  /** Specify rows amount for `TextArea` */
  rows?: string | number
  /* Maximum number of rows to display when multiline option is set to true. */
  rowsMax?: string | number
  /** Type attribute of the Input element. It should be a valid HTML5 input type */
  type?: string
  /**
   * @deprecated [FX-4715] Use the `status` prop instead to both support success and error states
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
  highlight?: 'autofill'
}

const ResetButton = ({
  hasValue,
  onClick,
  testIds,
}: {
  hasValue: boolean
  onClick: (event: MouseEvent<HTMLButtonElement & HTMLAnchorElement>) => void
  testIds?: Props['testIds']
}) => (
  <InputAdornment
    data-testid={testIds?.resetButton}
    position='end'
    className={twJoin(
      'invisible',
      hasValue && 'peer-focus:visible peer-hover:visible'
    )}
  >
    <ButtonCircular
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
    multilineResizable,
    autoFocus,
    rows,
    rowsMax,
    width = 'auto',
    inputComponent,
    inputProps,
    defaultValue,
    value,
    type = 'text',
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
    highlight,
    classes,
    ...rest
  } = props

  // TODO: [FX-4715]
  usePropDeprecationWarning({
    props,
    name: 'error',
    componentName: 'OutlinedInput',
    description:
      'Use the `status` prop instead. `error` is deprecated and will be removed in the next major release.',
  })

  const { layout } = useFieldsLayoutContext()
  const isDark = inputProps?.variant === 'dark'
  const shouldShowReset = enableReset && !disabled
  const hasEndAdornment = status === 'success' || shouldShowReset
  const endAdornment = hasEndAdornment ? (
    <>
      {shouldShowReset && (
        <ResetButton
          hasValue={Boolean(value)}
          onClick={onResetClick}
          testIds={testIds}
        />
      )}
      {!multiline && status === 'success' && (
        <InputValidIconAdornment data-testid={testIds?.validIcon} />
      )}
      {userDefinedEndAdornment}
    </>
  ) : (
    userDefinedEndAdornment
  )

  const divRef = useRef<HTMLDivElement | null>(null)

  useImperativeHandle(ref, () => divRef.current as HTMLElement, [])

  const isError = Boolean(status === 'error' || error)

  const sharedProps = {
    ...rest,
    slots: { input: inputComponent },
    slotProps: {
      root: {
        ref: divRef,
        className: getRootClassName({
          size,
          width,
          type,
          layout,
          isDark,
          multiline,
          highlight,
          disabled,
          className,
          classes,
          isError,
        }),
      },
      input: {
        ...inputProps,
        ref: inputRef,
        className: getInputClassName({
          size,
          disabled,
          isDark,
          multiline,
          multilineResizable,
          classes,
          type,
          inputProps,
        }),
        type,
      },
    },
    style,
    error: isError,
    defaultValue,
    value,
    startAdornment,
    endAdornment,
    autoFocus,
    onChange,
    disabled,
  }

  return multiline ? (
    <Input
      {...sharedProps}
      multiline={true}
      rows={getRows(rows)}
      maxRows={getRows(rowsMax)}
    />
  ) : (
    <Input {...sharedProps} />
  )
})

OutlinedInput.defaultProps = {
  width: 'auto',
  size: 'medium',
  onResetClick: noop,
  status: 'default',
}

OutlinedInput.displayName = 'OutlinedInput'

export default OutlinedInput
