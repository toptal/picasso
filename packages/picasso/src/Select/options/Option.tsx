import React, { ReactNode } from 'react'
import { SizeType } from '@toptal/picasso-shared'

import MenuItem from '../../MenuItem'
import { Option } from '../types'
import { OptionsListProps } from './OptionsList'

type SelectOptionProps = {
  children?: ReactNode
  onMouseDown: (event: React.MouseEvent) => void
  close: () => void
  selected: boolean
  checkmarked: boolean
  multiple?: boolean
  size?: SizeType<'small' | 'medium'>
  index: number
  setHighlightedIndex: OptionsListProps['setHighlightedIndex']
  onItemSelect: OptionsListProps['onItemSelect']
  option: Option
}

const SelectOption = React.memo(
  ({
    option,
    size,
    onMouseDown,
    selected,
    checkmarked,
    setHighlightedIndex,
    index,
    onItemSelect,
    multiple,
    children,
    close
  }: SelectOptionProps) => {
    return (
      <MenuItem
        role='option'
        aria-selected={selected}
        value={option.value}
        size={size}
        selected={selected}
        checkmarked={checkmarked}
        onMouseDown={onMouseDown}
        onMouseEnter={() => {
          if (selected) {
            return
          }

          setHighlightedIndex(index)
        }}
        onClick={(event: React.MouseEvent) => {
          if (!multiple) {
            close()
          }

          onItemSelect(event, option)
        }}
      >
        {children}
      </MenuItem>
    )
  }
)

export default SelectOption
