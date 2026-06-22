import type { MouseEvent } from 'react'
import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useRef,
} from 'react'
import {
  InputAdornment,
  InputValidIconAdornment,
} from '@toptal/picasso-input-adornment'
import { ButtonCircular } from '@toptal/picasso-button'
import { CloseMinor16 } from '@toptal/picasso-icons'
import { noop } from '@toptal/picasso-utils'
import { useFieldsLayoutContext } from '@toptal/picasso-form'
import TextareaAutosize from 'react-textarea-autosize'
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
      hasValue && 'peer-focus:visible peer-active:visible group-hover:visible'
    )}
  >
    <ButtonCircular
      tabIndex={-1}
      icon={<CloseMinor16 />}
      variant='flat'
      role='reset'
      onClick={onClick}
      onMouseDown={event => event.preventDefault()}
      onFocus={event => event.stopPropagation()}
    />
  </InputAdornment>
)

const OutlinedInput = forwardRef<HTMLElement, Props>(function OutlinedInput(
  {
    width = 'auto',
    size = 'medium',
    onResetClick = noop,
    status = 'default',
    type = 'text',
    ...props
  },
  ref
) {
  const {
    className,
    style,
    'data-testid': dataTestId,
    multiline,
    multilineResizable,
    autoFocus,
    rows,
    rowsMax,
    inputComponent,
    inputProps,
    defaultValue,
    value,
    startAdornment,
    endAdornment: userDefinedEndAdornment,
    onChange,
    enableReset,
    disabled,
    inputRef,
    testIds,
    highlight,
    classes,
    onClick,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    children: _children,
    'aria-describedby': ariaDescribedby,
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledby,
    autoComplete,
    id,
    name,
    onKeyDown,
    onKeyUp,
    onFocus,
    onBlur,
    placeholder,
    readOnly,
    required,
    ...rootAttrs
  } = props

  const rootElementAttrs = rootAttrs as React.HTMLAttributes<HTMLDivElement>

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
  const controlRef = useRef<HTMLElement | null>(null)

  useImperativeHandle(ref, () => divRef.current as HTMLElement, [])

  const setControlRef = useCallback(
    (node: HTMLElement | null) => {
      controlRef.current = node

      if (typeof inputRef === 'function') {
        inputRef(node as HTMLInputElement)
      } else if (inputRef) {
        const objectRef =
          inputRef as React.MutableRefObject<HTMLInputElement | null>

        objectRef.current = node as HTMLInputElement
      }
    },
    [inputRef]
  )

  const isError = status === 'error'
  const isWarning = status === 'warning'

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
    isWarning,
  })

  const computedInputClassName = twMerge(
    inputClassName,
    classes?.input,
    inputProps?.className
  )

  const ControlComponent: React.ElementType = multiline
    ? TextareaAutosize
    : inputComponent ?? 'input'

  const control = (
    <ControlComponent
      aria-describedby={ariaDescribedby}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledby}
      autoComplete={autoComplete}
      id={id}
      name={name}
      onKeyDown={onKeyDown}
      onKeyUp={onKeyUp}
      onFocus={onFocus}
      onBlur={onBlur}
      placeholder={placeholder}
      readOnly={readOnly}
      required={required}
      {...inputProps}
      ref={setControlRef}
      className={computedInputClassName}
      type={type}
      aria-invalid={isError}
      disabled={disabled}
      autoFocus={autoFocus}
      defaultValue={defaultValue}
      value={value}
      onChange={onChange}
      {...(multiline && {
        minRows: getRows(rows),
        maxRows: getRows(rowsMax),
      })}
    />
  )

  const handleRootClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (controlRef.current && event.currentTarget === event.target) {
      controlRef.current.focus()
    }
    ;(onClick as React.MouseEventHandler<HTMLDivElement> | undefined)?.(event)
  }

  return (
    <div
      {...rootElementAttrs}
      ref={divRef}
      className={twMerge(rootClassName, classes?.root, className)}
      style={style}
      data-testid={dataTestId}
      onClick={handleRootClick}
    >
      {startAdornment}
      {control}
      {endAdornment}
    </div>
  )
})

OutlinedInput.displayName = 'OutlinedInput'

export default OutlinedInput
