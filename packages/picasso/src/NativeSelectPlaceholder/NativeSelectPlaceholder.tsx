import React, { ReactNode } from 'react'

export interface Props {
  children?: ReactNode
  emptySelectValue: string | string[]
  disabled: boolean
}

const NativeSelectPlaceholder = ({
  emptySelectValue,
  disabled,
  children
}: Props) => (
  <option disabled={disabled} value={emptySelectValue}>
    {children}
  </option>
)

NativeSelectPlaceholder.displayName = 'NativeSelectPlaceholder'

export default NativeSelectPlaceholder
