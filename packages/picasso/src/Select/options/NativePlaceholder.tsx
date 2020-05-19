import React from 'react'

import { Props } from '../Select'

export type NativePlaceholderProps = Pick<Props, 'placeholder'> & {
  emptySelectValue: string | string[]
}

const NativePlaceholder = ({
  emptySelectValue,
  placeholder
}: NativePlaceholderProps) => (
  <option disabled value={emptySelectValue}>
    {placeholder}
  </option>
)

export default NativePlaceholder
