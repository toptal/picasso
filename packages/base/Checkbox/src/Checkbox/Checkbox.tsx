import { Checkbox as BaseCheckbox } from '@base-ui/react/checkbox'
import { useBaseUiId } from '@base-ui/react/internals/useBaseUiId'
import type {
  ButtonOrAnchorProps,
  BaseProps,
  TextLabelProps,
} from '@toptal/picasso-shared'
import { toReactChangeEvent } from '@toptal/picasso-shared'
import type { ComponentProps, CSSProperties, ReactNode } from 'react'
import React, { forwardRef } from 'react'
import { FormControlLabel } from '@toptal/picasso-form-label'
import type { RequiredDecoration } from '@toptal/picasso-form-label'
import { twJoin, twMerge } from '@toptal/picasso-tailwind-merge'

import { checkboxClassNames } from './styles'

type CheckboxRootProps = Omit<
  BaseCheckbox.Root.Props,
  | 'checked'
  | 'disabled'
  | 'id'
  | 'value'
  | 'indeterminate'
  | 'onCheckedChange'
  | 'className'
  | 'style'
>

export interface Props
  extends BaseProps,
    TextLabelProps,
    Omit<ButtonOrAnchorProps, 'onChange'> {
  /** Show checkbox as `checked` */
  checked?: boolean
  /** Disable changing `Checkbox` state */
  disabled?: boolean
  /** Checkbox can show indeterminate value instead of boolean */
  indeterminate?: boolean
  /** Text label for the `Checkbox` */
  label?: ReactNode
  /** The id of the input element */
  id?: string
  /** Label's style */
  labelStyle?: CSSProperties
  /** Whether to show asterisk or (optional) postfix for the label as a 'required' decoration */
  requiredDecoration?: RequiredDecoration
  /** Callback invoked when `Checkbox` changed its value */
  onChange?: (
    event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => void
  /** Value of the `Checkbox` (applicable only for controlled component) */
  value?: string
}

export const Checkbox = forwardRef<
  HTMLButtonElement | HTMLLabelElement | HTMLDivElement,
  Props
>(function Checkbox(
  { disabled = false, indeterminate = false, onChange = () => {}, ...props },
  ref
) {
  const {
    label,
    id,
    className,
    style,
    labelStyle,
    requiredDecoration,
    value,
    checked,
    titleCase,
    ...rest
  } = props

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { color, 'data-private': dataPrivate, ...checkboxAttributes } = rest

  // Element-variance boundary: `Props` extends button/anchor HTML attributes,
  // but BaseCheckbox.Root renders a <span>. The event-handler element types
  // are runtime-compatible, so we resolve the variance once here instead of
  // narrowing the public API.
  const rootRest = checkboxAttributes as CheckboxRootProps

  // Name the control via `aria-labelledby` so it is the single
  // label-associated node (see FormControlLabel `labelId`). Only relevant
  // when there is a label to point at. `useBaseUiId` wraps `React.useId`
  // with a React < 18 fallback, matching base-ui's own peer support.
  const generatedLabelId = useBaseUiId()
  const labelId = label ? generatedLabelId : undefined

  const checkboxElement = (
    // Tame Base UI's visually-hidden <input>, which ships
    // `position:absolute; top:0; left:0; margin:-1px` (inline). `relative` +
    // the `translate-px` pair anchor it inside the 16px box so its bounds
    // don't grow the rendered box past the legacy size (fixes the Happo
    // dimension_mismatch). `appearance-none` keeps the native control from
    // ever painting now that the input sits over the box.
    <span className='relative inline-flex self-start align-middle [&_input]:appearance-none [&_input]:translate-x-px [&_input]:translate-y-px'>
      <BaseCheckbox.Root
        {...rootRest}
        ref={label ? undefined : (ref as React.Ref<HTMLElement>)}
        aria-labelledby={rootRest['aria-labelledby'] ?? labelId}
        checked={checked}
        disabled={disabled}
        id={id}
        value={value}
        indeterminate={indeterminate}
        onCheckedChange={(nextChecked, { event }) =>
          onChange(toReactChangeEvent(event), nextChecked)
        }
        className={twMerge(checkboxClassNames, className)}
        style={style}
      />
    </span>
  )

  if (!label) {
    return checkboxElement
  }

  const externalEventListeners = {
    onMouseLeave: rest.onMouseLeave,
    onMouseOver: rest.onMouseOver,
  } as ComponentProps<typeof FormControlLabel>

  return (
    <FormControlLabel
      {...externalEventListeners}
      style={labelStyle}
      ref={ref as React.ForwardedRef<HTMLLabelElement | HTMLDivElement>}
      classes={{
        root: 'text-[1rem]',
        label: twJoin(
          'max-w-[calc(100%_-_1.5em_+_1px)]',
          'ml-[0.5em]',
          disabled && 'text-gray-500'
        ),
      }}
      control={checkboxElement}
      labelId={labelId}
      requiredDecoration={requiredDecoration}
      disabled={disabled}
      label={label}
      titleCase={titleCase}
      className='picasso-checkbox'
      data-private={dataPrivate}
    />
  )
})

Checkbox.displayName = 'Checkbox'

export default Checkbox
