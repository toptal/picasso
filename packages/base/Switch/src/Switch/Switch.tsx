import { Switch as BaseUISwitch } from '@base-ui/react/switch'
import type { BaseProps, TextLabelProps } from '@toptal/picasso-shared'
import type { ButtonHTMLAttributes, ReactNode } from 'react'
import React, { forwardRef, useCallback } from 'react'
import { FormControlLabel } from '@toptal/picasso-form-label'
import cx from 'classnames'

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
  { disabled = false, onChange = () => {}, ...props },
  ref
) {
  const {
    label,
    id,
    className,
    style,
    checked,
    titleCase,
    value,
    color, // eslint-disable-line
    'data-testid': dataTestId,
    ...rest
  } = props

  const handleCheckedChange: BaseUISwitch.Root.Props['onCheckedChange'] = (
    nextChecked,
    { event }
  ) => {
    onChange(
      event as unknown as React.ChangeEvent<HTMLInputElement>,
      nextChecked
    )
  }

  // base-ui sets `margin: -1px` via inline style on the hidden input to
  // visually hide it. Without this fix the negative margin extends the Happo
  // snapshot bounding box by 1 px in both axes vs the baseline. We override
  // it imperatively so no `!important` is needed to beat the inline style.
  const fixInputMargin = useCallback((node: HTMLInputElement | null) => {
    if (node) {
      node.style.margin = '0'
    }
  }, [])

  // Picasso's public Props extends `ButtonHTMLAttributes<HTMLButtonElement>`
  // (master parity); base-ui's SwitchRoot renders a span and types its handlers
  // for HTMLSpanElement. Cast at one boundary point to bridge the two without
  // narrowing the consumer-facing contract.
  const rootProps = rest as unknown as BaseUISwitch.Root.Props

  const switchElement = (
    <BaseUISwitch.Root
      {...rootProps}
      ref={ref}
      checked={checked}
      className={cx(
        'w-[40px] h-[24px] p-0 relative inline-flex z-0 overflow-visible shrink-0 align-middle group',
        'cursor-pointer outline-none data-[disabled]:cursor-default',
        className
      )}
      style={style}
      disabled={disabled}
      id={id}
      value={value === undefined ? undefined : String(value)}
      onCheckedChange={handleCheckedChange}
      inputRef={fixInputMargin}
      data-testid={label ? undefined : dataTestId}
    >
      <span
        className={cx(
          'w-full h-full border border-solid bg-gray-600 border-gray-600 opacity-100 rounded-[12px]',
          'transition-colors duration-300 ease-out',
          'group-data-[checked]:bg-blue-500 group-data-[checked]:border-blue-500',
          'group-data-[disabled]:opacity-40',
          'group-[[data-disabled][data-unchecked]]:bg-black'
        )}
      />
      <BaseUISwitch.Thumb
        className={cx(
          'w-[22px] h-[22px] bg-current text-white block rounded-full shadow-1 absolute z-10 p-0 top-[1px] left-[1px]',
          'transition-transform duration-150 ease-out',
          'group-[:hover:not([data-disabled])]:shadow-[0_0_0_4px_rgba(32,78,207,0.48)]',
          'group-focus-visible:shadow-[0_0_0_4px_rgba(32,78,207,0.48)]',
          'group-data-[checked]:translate-x-[16px]'
        )}
      />
    </BaseUISwitch.Root>
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
