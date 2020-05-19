import React from 'react'

import ScrollMenu from '../../ScrollMenu'
import { Props } from '../Select'
import { ItemProps } from '../useSelect'
import { Option } from '../types'
import { getSelection } from '../selectValue'
import SelectOption from './Option'

export type OptionsListProps = Pick<
  Props,
  'options' | 'value' | 'multiple' | 'renderOption' | 'getDisplayValue' | 'size'
> & {
  highlightedIndex: number | null
  setHighlightedIndex: (index: number | null) => void
  getItemProps: (index: number, option: Option) => ItemProps
  onItemSelect: (event: React.MouseEvent, option: Option) => void
}

const OptionsList = ({
  options,
  renderOption,
  highlightedIndex,
  setHighlightedIndex,
  onItemSelect,
  getItemProps,
  value,
  multiple,
  size
}: OptionsListProps) => {
  const optionComponents = options.map((option, currentIndex) => {
    const { close, onMouseDown } = getItemProps(currentIndex, option)
    const selection = getSelection(options, value)
    return (
      <SelectOption
        key={option.key || option.value}
        option={option}
        size={size}
        onMouseDown={onMouseDown}
        selected={
          selection.isOptionSelected(option) ||
          highlightedIndex === currentIndex
        }
        checkmarked={selection.isOptionCheckmarked(option)}
        setHighlightedIndex={setHighlightedIndex}
        index={currentIndex}
        multiple={multiple}
        close={close}
        onItemSelect={onItemSelect}
      >
        {renderOption?.(option)}
      </SelectOption>
    )
  })

  return (
    <ScrollMenu selectedIndex={highlightedIndex}>{optionComponents}</ScrollMenu>
  )
}

export default OptionsList
