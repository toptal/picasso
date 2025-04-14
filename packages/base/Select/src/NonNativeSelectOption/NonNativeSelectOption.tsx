import type { ReactNode } from 'react'
import React from 'react'
import { MenuItem } from '@toptal/picasso-menu'

import type { ItemProps, Option, ValueType } from '../SelectBase'

export interface Props<T extends ValueType> extends ItemProps {
  children?: ReactNode
  description?: ReactNode
  selected: boolean
  highlighted: boolean
  option: Option<T>
}

const NonNativeSelectOptionComponent = <T extends ValueType>({
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

const NonNativeSelectOption = React.memo(
  NonNativeSelectOptionComponent,
  (prevProps, nextProps) => {
    return (
      prevProps.selected === nextProps.selected &&
      prevProps.highlighted === nextProps.highlighted &&
      prevProps.option === nextProps.option &&
      prevProps.option.disabled === nextProps.option.disabled &&
      prevProps.description === nextProps.description &&
      prevProps.children === nextProps.children
    )
  }
)

NonNativeSelectOption.displayName = 'NonNativeSelectOption'

export default NonNativeSelectOption
