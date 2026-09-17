import type { ReactNode } from 'react'
import React from 'react'

export interface Props {
  children?: ReactNode
  emptySelectValue: string | string[]
  disabled: boolean
  selected: boolean
}

// Nothing to show once a value is selected unless it is the reset row or has text
const NativeSelectPlaceholder = ({
  emptySelectValue,
  disabled,
  selected,
  children,
}: Props) =>
  selected && disabled && !children ? null : (
    <option disabled={disabled} value={emptySelectValue}>
      {children}
    </option>
  )

NativeSelectPlaceholder.displayName = 'NativeSelectPlaceholder'

export default NativeSelectPlaceholder
