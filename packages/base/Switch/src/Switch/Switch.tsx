import { Switch as BaseUISwitch } from '@base-ui/react/switch'
import type { BaseProps, TextLabelProps } from '@toptal/picasso-shared'
import { toReactChangeEvent } from '@toptal/picasso-shared'
import type { ButtonHTMLAttributes, ReactNode } from 'react'
import React, { forwardRef } from 'react'
import { FormControlLabel } from '@toptal/picasso-form-label'
import { twMerge } from '@toptal/picasso-tailwind-merge'

export interface Props
  extends BaseProps,
    TextLabelProps,
    Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onChange' | 'type'> {
  /** Show Switch initially as checked */
  checked?: boolean
  /** Disable changing `Switch` state */
  disabled?: boolean
  /** Text label for the `Switch` */
  label?: ReactNode
  /** Callback invoked when `Switch` changed its value */
  onChange?: (
    event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => void
}

export const Switch = forwardRef<HTMLButtonElement, Props>(function Switch(
  props,
  ref
) {
  const {
    onChange,
    disabled = false,
    label,
    id,
    className,
    style,
    checked,
    titleCase,
    value,
    color: _color, // eslint-disable-line @typescript-eslint/no-unused-vars
    'data-testid': dataTestId,
    ...rest
  } = props

  const handleCheckedChange: BaseUISwitch.Root.Props['onCheckedChange'] = (
    nextChecked,
    { event }
  ) => onChange?.(toReactChangeEvent(event), nextChecked)

  // base-ui's Switch.Root renders a span; our public Props extends
  // ButtonHTMLAttributes<HTMLButtonElement>. Event-handler element variance is
  // a compile-time mismatch but runtime-safe — React synthetic handlers fire
  // identically regardless of the currentTarget element type. Express the
  // bridge once at the boundary per practices.md §Type-narrowing & casting.
  const rootRest = rest as Omit<
    BaseUISwitch.Root.Props,
    | 'checked'
    | 'disabled'
    | 'id'
    | 'value'
    | 'className'
    | 'style'
    | 'onCheckedChange'
  >

  const switchElement = (
    // base-ui's Switch.Root renders a visually-hidden <input> as a sibling of
    // the root with inline `margin:-1px` (unreachable via base-ui's API). That
    // 1px box has no paint (clip-path: inset(50%)) but contributes to layout,
    // growing the component's footprint by 1px. `overflow-clip` removes that
    // layout contribution while `overflow-clip-margin` keeps the thumb's focus
    // shadow ink (4px) painting beyond the box.
    <span className='relative inline-flex shrink-0 align-middle overflow-clip [overflow-clip-margin:6px]'>
      <BaseUISwitch.Root
        {...rootRest}
        ref={ref}
        checked={checked}
        className={twMerge(
          'w-[40px] h-[24px] p-0 relative inline-flex z-0 overflow-visible shrink-0 align-middle group',
          'cursor-pointer outline-none data-[disabled]:cursor-default',
          className
        )}
        style={style}
        disabled={disabled}
        id={id}
        value={value === undefined ? undefined : String(value)}
        onCheckedChange={handleCheckedChange}
        data-testid={label ? undefined : dataTestId}
      >
        <span
          className={twMerge(
            'w-full h-full border border-solid bg-gray-600 border-gray-600 opacity-100 rounded-[12px]',
            'transition-colors duration-300 ease-out',
            'group-data-[checked]:bg-blue-500 group-data-[checked]:border-blue-500',
            'group-data-[disabled]:opacity-40',
            'group-[[data-disabled][data-unchecked]]:bg-black'
          )}
        />
        <BaseUISwitch.Thumb
          className={twMerge(
            'w-[22px] h-[22px] bg-current text-white block rounded-full shadow-1 absolute z-10 p-0 top-[1px] left-[1px]',
            'transition-transform duration-150 ease-out',
            'group-[:hover:not([data-disabled])]:shadow-[0_0_0_4px_rgba(32,78,207,0.48)]',
            'group-focus-visible:shadow-[0_0_0_4px_rgba(32,78,207,0.48)]',
            'group-data-[checked]:translate-x-[16px]'
          )}
        />
      </BaseUISwitch.Root>
    </span>
  )

  if (!label) {
    return switchElement
  }

  return (
    <FormControlLabel
      classes={{
        root: 'items-start text-lg',
        label: 'ml-[0.5em] mt-[0.25em] max-w-[calc(100%-1em-0.5em+1px)]',
      }}
      control={switchElement}
      disabled={disabled}
      label={label}
      titleCase={titleCase}
      data-testid={dataTestId}
    />
  )
})

Switch.displayName = 'Switch'

export default Switch
