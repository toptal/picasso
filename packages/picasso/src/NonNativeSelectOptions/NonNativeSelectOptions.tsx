import React, { ReactNode } from 'react'

import Container from '../Container'
import Loader from '../Loader'
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

export type Props = Pick<
  SelectProps,
  'options' | 'value' | 'multiple' | 'size' | 'noOptionsText' | 'renderOption'
> & {
  highlightedIndex: number | null
  filterOptionsValue: string
  getItemProps: (option: Option, index: number) => ItemProps
  loading?: boolean
  onBlur?: FocusEventType
  fixedHeader?: ReactNode
}

const NonNativeSelectOptions = ({
  options,
  renderOption = () => null,
  highlightedIndex,
  getItemProps,
  onBlur,
  value,
  size,
  loading,
  filterOptionsValue,
  noOptionsText,
  fixedHeader
}: Props) => {
  if (loading) {
    return (
      <ScrollMenu data-testid='loader'>
        <Container padded='small'>
          <Loader size='small' />
        </Container>
      </ScrollMenu>
    )
  }

  if (!options.length && filterOptionsValue) {
    return (
      <ScrollMenu data-testid='no-options' fixedHeader={fixedHeader}>
        <MenuItem titleCase={false} disabled>
          {noOptionsText}
        </MenuItem>
      </ScrollMenu>
    )
  }

  const optionComponents = options.map((option, currentIndex) => {
    const { onMouseDown, onMouseEnter, onClick } = getItemProps(
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
        onClick={onClick}
        description={option.description}
      >
        {renderOption(option)}
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
