import { Switch as BaseUISwitch } from '@base-ui/react/switch'
import type { BaseProps, TextLabelProps } from '@toptal/picasso-shared'
import type { ButtonHTMLAttributes, ChangeEvent, ReactNode } from 'react'
import React, { forwardRef } from 'react'
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
    event: ChangeEvent<HTMLInputElement>,
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
    color: _color, // eslint-disable-line @typescript-eslint/no-unused-vars
    value,
    'data-testid': dataTestId,
    ...rest
  } = props

  const handleCheckedChange: BaseUISwitch.Root.Props['onCheckedChange'] = (
    nextChecked,
    eventDetails
  ) => {
    onChange(
      eventDetails.event as unknown as ChangeEvent<HTMLInputElement>,
      nextChecked
    )
  }

  // Picasso's public Props extends ButtonHTMLAttributes<HTMLButtonElement>
  // (preserved for API stability), but @base-ui/react renders a <span>. The
  // single boundary cast aligns the wider event-handler types with the span.
  const rootRest = rest as unknown as BaseUISwitch.Root.Props

  const switchElement = (
    <BaseUISwitch.Root
      {...rootRest}
      ref={ref as React.Ref<HTMLElement>}
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
