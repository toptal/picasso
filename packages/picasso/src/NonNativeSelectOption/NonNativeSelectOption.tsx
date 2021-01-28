import React, { ReactNode, useCallback } from 'react'
import { SizeType } from '@toptal/picasso-shared'

import MenuItem from '../MenuItem'
import { Option, ValueType } from '../Select'

export interface Props<T extends ValueType> {
  children?: ReactNode
  description?: ReactNode
  onMouseDown: (event: React.MouseEvent) => void
  onMouseEnter: () => void
  close: () => void
  selected: boolean
  highlighted: boolean
  multiple?: boolean
  size?: SizeType<'small' | 'medium'>
  onItemSelect: (event: React.MouseEvent, option: Option) => void
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
    onItemSelect,
    multiple,
    description,
    children,
    close
  }: Props<T>) => {
    const onClick = useCallback(
      (event: React.MouseEvent) => {
        if (!multiple) {
          close()
        }

        onItemSelect(event, option)
      },
      [multiple, close, onItemSelect, option]
    )

    return (
      <MenuItem
        role='option'
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
