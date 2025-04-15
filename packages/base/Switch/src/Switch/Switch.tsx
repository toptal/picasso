import * as RadixSwitch from '@radix-ui/react-switch'
import type { BaseProps, TextLabelProps } from '@toptal/picasso-shared'
import type { ComponentPropsWithoutRef, ReactNode } from 'react'
import React, { forwardRef, useState } from 'react'
import { FormControlLabel } from '@toptal/picasso-form'
import cx from 'classnames'

// Extend with the props we need, exclude the ones that cause conflicts
export interface Props
  extends BaseProps,
    TextLabelProps,
    Omit<
      ComponentPropsWithoutRef<typeof RadixSwitch.Root>,
      'onChange' | 'type'
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
  props,
  ref
) {
  const {
    label,
    id,
    className,
    style,
    disabled,
    onChange,
    checked,
    titleCase,
    color, // eslint-disable-line
    'data-testid': dataTestId,
    ...rest
  } = props

  // Track focus and hover states
  const [isFocused, setIsFocused] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  const handleCheckedChange = (isChecked: boolean) => {
    if (onChange) {
      // Create a synthetic event to maintain API compatibility
      const syntheticEvent = {
        target: { checked: isChecked },
      } as React.ChangeEvent<HTMLInputElement>

      onChange(syntheticEvent, isChecked)
    }
  }

  // Define styles for different states
  const switchElement = (
    <RadixSwitch.Root
      {...rest}
      ref={ref}
      checked={checked}
      style={style}
      className={cx(
        'relative w-[40px] h-[24px] bg-gray-600 rounded-full cursor-pointer',
        'data-[state=checked]:bg-blue-500',
        'data-[disabled]:opacity-40 data-[disabled]:cursor-not-allowed',
        'outline-none border-0',
        className
      )}
      disabled={disabled}
      id={id}
      onCheckedChange={handleCheckedChange}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      data-testid={label ? undefined : dataTestId}
    >
      <RadixSwitch.Thumb
        className={cx(
          'block w-[22px] h-[22px] bg-white rounded-full',
          'absolute top-[1px] left-[1px]',
          'transition-transform duration-150 ease-out',
          'data-[state=checked]:translate-x-[16px]'
        )}
        style={{
          boxShadow:
            isFocused || isHovered ? '0 0 0 4px rgba(32,78,207,0.48)' : 'none',
        }}
      />
    </RadixSwitch.Root>
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

Switch.defaultProps = {
  disabled: false,
  onChange: () => {},
}

Switch.displayName = 'Switch'

export default Switch
