import React, { forwardRef } from 'react'
import { twMerge, twJoin } from '@toptal/picasso-tailwind-merge'

type NativeSelectInputProps = {
  className?: string
  disabled?: boolean
  IconComponent?: React.ElementType
  multiple?: boolean
  ownerState?: {}
} & React.HTMLAttributes<HTMLSelectElement>

export const NativeSelectInput = forwardRef<
  HTMLSelectElement,
  NativeSelectInputProps
>((props, ref) => {
  // omit ownerState from the props
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { ownerState, className, disabled, multiple, IconComponent, ...other } =
    props

  return (
    <>
      <select
        className={twMerge(
          `appearance-none select-none rounded-none min-w-4 cursor-pointer
           focus:bg-black/[.05] focus:rounded-none`,
          disabled && 'cursor-default',
          multiple ? 'h-auto' : '[&_option]:bg-white [&_optgroup]:bg-white',
          className,
          'pr-6' // From MUI, this rule is more specific and should override classname
        )}
        disabled={disabled}
        multiple={multiple}
        ref={ref}
        {...other}
      />
      {multiple
        ? null
        : IconComponent && (
            <IconComponent
              className={twJoin(
                'absolute right-0 top-[calc(50%-12px)] pointer-events-none',
                disabled ? 'text-black/[.26]' : 'text-black/[.54]'
              )}
            />
          )}
    </>
  )
})

NativeSelectInput.displayName = 'NativeSelectInput'
