import * as RadixSwitch from '@radix-ui/react-switch'
import type { BaseProps, TextLabelProps } from '@toptal/picasso-shared'
import type { ComponentPropsWithoutRef, ReactNode } from 'react'
import React, { forwardRef, useState, useCallback } from 'react'
import { FormControlLabel } from '@toptal/picasso-form'
import cx from 'classnames'

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
    checked: controlledChecked,
    titleCase,
    'data-testid': dataTestId,
    ...rest
  } = props

  const [uncontrolledChecked, setUncontrolledChecked] = useState(false)
  const checked =
    controlledChecked !== undefined ? controlledChecked : uncontrolledChecked

  const [isFocused, setIsFocused] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  const preventFormSubmission = useCallback((e: React.MouseEvent) => {
    e.stopPropagation()
  }, [])

  const handleCheckedChange = useCallback(
    (isChecked: boolean) => {
      if (controlledChecked === undefined) {
        setUncontrolledChecked(isChecked)
      }

      if (onChange) {
        const syntheticEvent = {
          target: { checked: isChecked },
        } as React.ChangeEvent<HTMLInputElement>

        onChange(syntheticEvent, isChecked)
      }
    },
    [controlledChecked, onChange]
  )

  const switchElement = (
    <div className='leading-[0]' onClick={preventFormSubmission}>
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
        type='button'
        data-testid={label ? undefined : dataTestId}
        asChild={false}
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
              isFocused || isHovered
                ? '0 0 0 4px rgba(32,78,207,0.48)'
                : 'none',
          }}
        />
      </RadixSwitch.Root>
    </div>
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
      onClick={preventFormSubmission}
    />
  )
})

Switch.defaultProps = {
  disabled: false,
  onChange: () => {},
}

Switch.displayName = 'Switch'

export default Switch
