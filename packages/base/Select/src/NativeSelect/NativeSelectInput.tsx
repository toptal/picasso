import React, { forwardRef } from 'react'
import { twMerge, twJoin } from '@toptal/picasso-tailwind-merge'

type NativeSelectInputProps = {
  className?: string
  disabled?: boolean
  IconComponent?: React.ElementType
  multiple?: boolean
} & React.HTMLAttributes<HTMLSelectElement>

export const NativeSelectInput = forwardRef<
  HTMLSelectElement,
  NativeSelectInputProps
>((props, ref) => {
  const { className, disabled, multiple, IconComponent, ...other } = props

  return (
    <>
      <select
        className={twMerge(
          `appearance-none select-none rounded-none min-w-4 cursor-pointer
           focus:bg-[rgba(0,0,0,0.05)] focus:rounded-none`,
          disabled && 'cursor-default',
          multiple ? 'h-auto' : '[&_option]:bg-white [&_optgroup]:bg-white',
          className,
          'pr-6' // From MUI, this rule is more specific and should override classname
        )}
        disabled={disabled}
        ref={ref}
        {...other}
      />
      {multiple
        ? null
        : IconComponent && (
            <IconComponent
              className={twJoin(
                'absolute right-0 top-[calc(50%-12px)] pointer-events-none text-[rgba(0,0,0,0.54)]',
                disabled && 'text-[rgba(0,0,0,0.26)]'
              )}
            />
          )}
    </>
  )
})

NativeSelectInput.displayName = 'NativeSelectInput'
