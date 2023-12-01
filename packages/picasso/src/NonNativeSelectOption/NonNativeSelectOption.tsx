/* eslint-disable import/no-extraneous-dependencies */
import type { ReactNode } from 'react'
import React from 'react'
import MenuItem from '@toptal/picasso-menu-item'
import type { ItemProps, Option, ValueType } from '@toptal/picasso-select-base'

export interface Props<T extends ValueType> extends ItemProps {
  children?: ReactNode
  description?: ReactNode
  selected: boolean
  highlighted: boolean
  option: Option<T>
}

const NonNativeSelectOption = React.memo(
  <T extends ValueType>({
    option,
    selected,
    highlighted,
    description,
    children,
    ...itemProps
  }: Props<T>) => {
    return (
      <MenuItem
        value={option.value}
        selected={highlighted}
        checkmarked={selected}
        titleCase={false}
        description={description}
        role='option'
        aria-selected={selected}
        data-highlighted={highlighted}
        disabled={option.disabled}
        {...itemProps}
      >
        {children}
      </MenuItem>
    )
  }
)

NonNativeSelectOption.displayName = 'NonNativeSelectOption'

export default NonNativeSelectOption
