import { Switch as BaseUISwitch } from '@base-ui/react/switch'
import type { BaseProps, TextLabelProps } from '@toptal/picasso-shared'
import type { ButtonHTMLAttributes, ReactNode } from 'react'
import React, { forwardRef } from 'react'
import { FormControlLabel } from '@toptal/picasso-form-label'
import cx from 'classnames'

export interface Props
  extends BaseProps,
    TextLabelProps,
    Omit<
      ButtonHTMLAttributes<HTMLButtonElement>,
      'onChange' | 'type' | 'value'
    > {
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
    color, // eslint-disable-line
    'data-testid': dataTestId,
    ...rest
  } = props

  const onChangeCallback: React.ChangeEventHandler<
    HTMLInputElement
  > = event => {
    if (onChange) {
      onChange(event, event.target.checked)
    }
  }

  const switchElement = (
    <BaseUISwitch.Root
      {...(rest as unknown as BaseUISwitch.Root.Props)}
      ref={ref as React.Ref<HTMLElement>}
      checked={checked}
      className={cx(
        'w-[40px] h-[24px] p-0 relative inline-flex z-0 overflow-visible shrink-0 align-middle group cursor-pointer',
        '[&[data-checked]_.picasso-switch-track]:bg-blue-500 [&[data-checked]_.picasso-switch-track]:border-blue-500',
        '[&[data-disabled]_.picasso-switch-track]:opacity-40',
        '[&[data-disabled]:not([data-checked])_.picasso-switch-track]:bg-black',
        '[&:not([data-disabled]):hover_.picasso-switch-thumb]:shadow-[0_0_0_4px_rgba(32,78,207,0.48)]',
        '[&:focus-visible_.picasso-switch-thumb]:shadow-[0_0_0_4px_rgba(32,78,207,0.48)]',
        '[&[data-checked]_.picasso-switch-thumb]:translate-x-[16px]',
        '[&[data-disabled]]:cursor-default',
        className
      )}
      style={style}
      disabled={disabled}
      id={id}
      onCheckedChange={(checked, eventDetails) => {
        const event = {
          ...eventDetails.event,
          target: { checked },
          currentTarget: { checked },
        } as unknown as React.ChangeEvent<HTMLInputElement>

        onChangeCallback(event)
      }}
      data-testid={label ? undefined : dataTestId}
    >
      <span
        className={cx(
          'picasso-switch-track',
          'w-full h-full border border-solid bg-gray-600 border-gray-600 opacity-100 rounded-[12px]',
          'transition-colors duration-300 ease-out'
        )}
      />
      <BaseUISwitch.Thumb
        className={cx(
          'picasso-switch-thumb',
          'w-[22px] h-[22px] bg-current text-white block rounded-full shadow-1 absolute z-10 p-0 top-[1px] left-[1px]',
          'transition-transform duration-150 ease-out'
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
