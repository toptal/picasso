import type { MouseEvent } from 'react'
import React, { forwardRef, useImperativeHandle, useRef } from 'react'
import {
  InputAdornment,
  InputValidIconAdornment,
} from '@toptal/picasso-input-adornment'
import { ButtonCircular } from '@toptal/picasso-button'
import { CloseMinor16 } from '@toptal/picasso-icons'
import { noop, usePropDeprecationWarning } from '@toptal/picasso-utils'
import { useFieldsLayoutContext } from '@toptal/picasso-form'
import { Input, type InputOwnerState } from '@mui/base/Input'
import {
  TextareaAutosize,
  type TextareaAutosizeProps,
} from '@mui/base/TextareaAutosize'
import { twJoin, twMerge } from '@toptal/picasso-tailwind-merge'

import { getRootClassName } from './stylesRoot'
import { getInputClassName } from './stylesInput'
import { getRows } from './utils'
import type { Props } from './types'

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

const Textarea = forwardRef<
  HTMLTextAreaElement,
  { ownerState: InputOwnerState } & TextareaAutosizeProps
>(
  (
    {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      ownerState,
      ...rest
    },
    ref
  ) => {
    return <TextareaAutosize ref={ref} {...rest} />
  }
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

  const inputClassName = getInputClassName({
    size,
    disabled,
    isDark,
    multiline,
    multilineResizable,
    type,
    inputProps,
  })

  const rootClassName = getRootClassName({
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
  })

  const multilineProps = multiline
    ? ({
        multiline: true,
        // to keep the same behavior as in MUI@4
        // rows: getRows(rows),
        minRows: getRows(rows),
        maxRows: getRows(rowsMax),
      } as const)
    : {}

  return (
    <Input
      {...rest}
      slots={{ input: inputComponent, textarea: Textarea }}
      slotProps={{
        root: {
          ref: divRef,
          className: twMerge(rootClassName, classes?.root, className),
        },
        input: {
          ...inputProps,
          ref: inputRef,
          className: twMerge(
            inputClassName,
            classes?.input,
            inputProps?.className
          ),
          type,
        },
      }}
      style={style}
      error={isError}
      defaultValue={defaultValue}
      value={value}
      startAdornment={startAdornment}
      endAdornment={endAdornment}
      autoFocus={autoFocus}
      onChange={onChange}
      disabled={disabled}
      {...multilineProps}
    />
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
