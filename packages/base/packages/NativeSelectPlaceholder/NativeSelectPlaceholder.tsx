/* eslint-disable import/no-extraneous-dependencies */
import type { ReactNode } from 'react'
import React from 'react'

export interface Props {
  children?: ReactNode
  emptySelectValue: string | string[]
  disabled: boolean
}

const NativeSelectPlaceholder = ({
  emptySelectValue,
  disabled,
  children,
}: Props) => (
  <option disabled={disabled} value={emptySelectValue}>
    {children}
  </option>
)

NativeSelectPlaceholder.displayName = 'NativeSelectPlaceholder'

export default NativeSelectPlaceholder
