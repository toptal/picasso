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
    // @mui/base's Input rendered its own children (adornments + control) and
    // dropped any consumer `children`; preserve that by not forwarding them.
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    children: _children,
    // The native attrs the legacy @mui/base Input forwarded to its inner
    // control (its `propsToForward` set) — keep them on the control so they
    // stay functional.
    'aria-describedby': ariaDescribedby,
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledby,
    autoComplete,
    id,
    name,
    onKeyDown,
    onKeyUp,
    // @mui/base's useInput forwarded onFocus/onBlur/onChange to the input slot;
    // keep them on the control so consumer handlers see the input as
    // `event.currentTarget` (React's focus bubbling would otherwise fire them
    // with the outline <div> as currentTarget).
    onFocus,
    onBlur,
    placeholder,
    readOnly,
    required,
    // Everything else lands on the outline root <div>, matching @mui/base's
    // behaviour of spreading unrecognised props (`role`, `tabIndex`, `data-*`,
    // …) onto the root slot rather than the input.
    ...rootAttrs
  } = props

  // @mui/base routed unrecognised props onto its root slot regardless of
  // whether they were valid on the rendered element; mirror that here. The
  // residual `InputHTMLAttributes` keys (`min`, `max`, `step`, …) are harmless
  // on the <div> and preserve the legacy placement.
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
        ;(inputRef as React.MutableRefObject<HTMLInputElement | null>).current =
          node as HTMLInputElement
      }
    },
    [inputRef]
  )

  const isError = Boolean(status === 'error')
  const isWarning = Boolean(status === 'warning')

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

  // The control is polymorphic — a native `<input>`, an autosizing
  // `<textarea>` (multiline), or a consumer-supplied `inputComponent` (e.g. a
  // `<select>`). The legacy @mui/base Input also assembled it via its slot
  // system; render it through `createElement` so the shared prop bag flows to
  // whichever element renders, without per-element JSX type narrowing.
  // `React.ElementType` keeps `createElement` on its permissive overload so the
  // shared prop bag flows to whichever element renders (native `<input>`,
  // autosizing `<textarea>` for multiline, or a consumer `inputComponent` such
  // as a `<select>`) without per-element JSX type narrowing. @mui/base's Input
  // likewise assembled the control through its slot system.
  const ControlComponent: React.ElementType = multiline
    ? TextareaAutosize
    : inputComponent ?? 'input'

  const control = React.createElement(ControlComponent, {
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
    ...inputProps,
    ref: setControlRef,
    className: computedInputClassName,
    type,
    'aria-invalid': isError,
    disabled,
    autoFocus,
    defaultValue,
    value,
    onChange,
    ...(multiline && {
      minRows: getRows(rows),
      maxRows: getRows(rowsMax),
    }),
  })

  const handleRootClick = (event: React.MouseEvent<HTMLDivElement>) => {
    // Clicking the outline (padding / gaps around the control) focuses the
    // control, preserving the legacy @mui/base Input root-click-to-focus.
    if (controlRef.current && event.currentTarget === event.target) {
      controlRef.current.focus()
    }

    // The public `onClick` type targets `HTMLInputElement`; the outline renders
    // a `<div>`. React synthetic handlers fire identically regardless of
    // `currentTarget` element type — bridge at this boundary.
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
