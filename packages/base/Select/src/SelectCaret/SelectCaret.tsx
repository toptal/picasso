import React from 'react'
import { DropdownArrows16 } from '@toptal/picasso-icons'
import { twJoin } from '@toptal/picasso-tailwind-merge'

interface Props {
  disabled?: boolean
}

const SelectCaret = ({ disabled }: Props) => {
  return (
    <DropdownArrows16
      // className={twJoin(classes.caret, disabled && classes.caretDisabled)}
      className={twJoin(
        // in specs right spacing is defined relative to 6px icon width, while we use 16px
        // so 5px are left instead of 10px when we use wider icon.
        `absolute top-[calc(50%-0.5rem)] right-[0.3125rem]
        text-graphite-700 text-[1rem]
        cursor-pointer pointer-events-none`,
        disabled && 'text-graphite-700/[.48] z-[1]'
      )}
    />
  )
}

export default SelectCaret
