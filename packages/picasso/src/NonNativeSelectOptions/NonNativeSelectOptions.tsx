import React, { ReactNode } from 'react'

import ScrollMenu from '../ScrollMenu'
import MenuItem from '../MenuItem'
import {
  Option,
  ItemProps,
  FocusEventType,
  getSelection,
  SelectProps
} from '../Select'
import NonNativeSelectOption from '../NonNativeSelectOption/NonNativeSelectOption'

type Props = Pick<
  SelectProps,
  'options' | 'value' | 'multiple' | 'size' | 'noOptionsText' | 'renderOption'
> & {
  highlightedIndex: number | null
  filterOptionsValue: string
  getItemProps: (option: Option, index: number) => ItemProps
  onBlur?: FocusEventType
  fixedHeader?: ReactNode
}

const NonNativeSelectOptions = ({
  options,
  renderOption,
  highlightedIndex,
  getItemProps,
  onBlur,
  value,
  multiple,
  size,
  filterOptionsValue,
  noOptionsText,
  fixedHeader
}: Props) => {
  if (!options.length && filterOptionsValue) {
    return (
      <ScrollMenu fixedHeader={fixedHeader}>
        <MenuItem titleCase={false} disabled>
          {noOptionsText}
        </MenuItem>
      </ScrollMenu>
    )
  }

  const optionComponents = options.map((option, currentIndex) => {
    const { close, onMouseDown, onMouseEnter, onItemSelect } = getItemProps(
      option,
      currentIndex
    )
    const selection = getSelection(options, value)

    return (
      <NonNativeSelectOption
        key={option.key || option.value}
        option={option}
        size={size}
        onMouseDown={onMouseDown}
        onMouseEnter={onMouseEnter}
        selected={selection.isOptionSelected(option)}
        highlighted={highlightedIndex === currentIndex}
        multiple={multiple}
        close={close}
        onItemSelect={onItemSelect}
        description={option.description}
      >
        {renderOption?.(option)}
      </NonNativeSelectOption>
    )
  })

  return (
    <ScrollMenu
      fixedHeader={fixedHeader}
      onBlur={onBlur}
      selectedIndex={highlightedIndex}
    >
      {optionComponents}
    </ScrollMenu>
  )
}

NonNativeSelectOptions.displayName = 'NonNativeSelectOptions'

export default NonNativeSelectOptions
