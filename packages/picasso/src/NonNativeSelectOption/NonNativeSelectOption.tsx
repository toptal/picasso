import React, { ReactNode } from 'react'
import { SizeType } from '@toptal/picasso-shared'

import MenuItem from '../MenuItem'
import { Option, ValueType } from '../Select'

export interface Props<T extends ValueType> {
  children?: ReactNode
  description?: ReactNode
  onMouseDown: (event: React.MouseEvent) => void
  onMouseEnter: () => void
  selected: boolean
  highlighted: boolean
  size?: SizeType<'small' | 'medium'>
  onClick: (event: React.MouseEvent) => void
  option: Option<T>
}

const NonNativeSelectOption = React.memo(
  <T extends ValueType>({
    option,
    size,
    onMouseDown,
    onMouseEnter,
    selected,
    highlighted,
    onClick,
    description,
    children
  }: Props<T>) => {
    return (
      <MenuItem
        role='option'
        aria-checked={selected}
        aria-selected={highlighted}
        value={option.value}
        size={size}
        selected={highlighted}
        checkmarked={selected}
        onMouseDown={onMouseDown}
        onMouseEnter={onMouseEnter}
        onClick={onClick}
        titleCase={false}
        description={description}
      >
        {children}
      </MenuItem>
    )
  }
)

NonNativeSelectOption.displayName = 'NonNativeSelectOption'

export default NonNativeSelectOption
