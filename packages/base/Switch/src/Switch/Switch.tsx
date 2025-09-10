import { Switch as MUISwitch } from '@mui/base/Switch'
import type { BaseProps, TextLabelProps } from '@toptal/picasso-shared'
import type { ButtonHTMLAttributes, ReactNode } from 'react'
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
    <MUISwitch
      {...rest}
      color='primary'
      ref={ref}
      checked={checked}
      className={className}
      style={style}
      disabled={disabled}
      id={id}
      onChange={onChangeCallback}
      data-testid={label ? undefined : dataTestId}
      slotProps={{
        root: {
          className:
            'w-[40px] h-[24px] p-0 relative inline-flex z-0 overflow-visible shrink-0 align-middle group',
        },
        track: {
          className: cx(
            'w-full h-full border border-solid bg-gray-600 border-gray-600 opacity-100 rounded-[12px]',
            'transition-colors duration-300 ease-out',
            'group-[.base--checked]:bg-blue-500 group-[.base--checked]:border-blue-500',
            'group-[.base--disabled]:opacity-40',
            'group-[.base--disabled:not(.base--checked)]:bg-black'
          ),
        },
        thumb: {
          className: cx(
            'w-[22px] h-[22px] bg-current text-white block rounded-full shadow-1 absolute z-10 p-0 top-[1px] left-[1px]',
            'transition-transform duration-150 ease-out',
            'group-[:not(.base--disabled):hover]:shadow-[0_0_0_4px_rgba(32,78,207,0.48)]',
            'group-[.base--focusVisible]:shadow-[0_0_0_4px_rgba(32,78,207,0.48)]',
            'group-[.base--checked]:translate-x-[16px]'
          ),
        },
        input: {
          className: cx(
            'w-[200%] h-full m-0 p-0 opacity-0 absolute top-0 -left-[50%] cursor-pointer z-20',
            'group-[.base--disabled]:cursor-default'
          ),
        },
      }}
    />
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
