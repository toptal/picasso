import React, { ReactNode, useMemo } from 'react'
import { BaseProps } from '@toptal/picasso-shared'

import MenuItem from '../MenuItem'
import NonNativeSelectOption from '../NonNativeSelectOption'
import ScrollMenu from '../ScrollMenu'
import {
  flattenOptions,
  getSelection,
  isOptionsType,
  FocusEventType,
  ItemProps,
  Option,
  OptionGroups,
  SelectProps
} from '../Select'
import Typography from '../Typography'

// TODO: Replace with a real component as soon as it's implemented
// https://toptal-core.atlassian.net/browse/FX-1479
interface MenuGroupProps extends BaseProps {
  group: string
  children: ReactNode
}
const MenuGroup = ({ group, children, ...rest }: MenuGroupProps) => (
  <>
    <MenuItem role='option' titleCase={false} nonSelectable {...rest}>
      <Typography size='small' weight='semibold' color='dark-grey'>
        {group}
      </Typography>
    </MenuItem>
    {children}
  </>
)

export type Props = Pick<
  SelectProps,
  'value' | 'multiple' | 'size' | 'noOptionsText' | 'renderOption'
> & {
  options: Option[] | OptionGroups
  highlightedIndex: number | null
  filterOptionsValue: string
  getItemProps: (option: Option, index: number) => ItemProps
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
  filterOptionsValue,
  noOptionsText,
  fixedHeader
}: Props) => {
  const flatOptions: Option[] = useMemo(
    () => flattenOptions(options),
    [options]
  )

  if (!flatOptions.length && filterOptionsValue) {
    return (
      <ScrollMenu data-testid='no-options' fixedHeader={fixedHeader}>
        <MenuItem titleCase={false} disabled>
          {noOptionsText}
        </MenuItem>
      </ScrollMenu>
    )
  }

  const flatOptionComponents = (optionsList: Option[], offset = 0) =>
    optionsList.map((option, currentIndex) => {
      const { onMouseDown, onMouseEnter, onClick } = getItemProps(
        option,
        currentIndex + offset
      )
      const selection = getSelection(flatOptions, value)

      return (
        <NonNativeSelectOption
          key={option.key || option.value}
          option={option}
          size={size}
          onMouseDown={onMouseDown}
          onMouseEnter={onMouseEnter}
          selected={selection.isOptionSelected(option)}
          highlighted={highlightedIndex === currentIndex + offset}
          onClick={onClick}
          description={option.description}
        >
          {renderOption(option)}
        </NonNativeSelectOption>
      )
    })

  const groupedOptionComponents = (optionGroups: OptionGroups) => {
    let cursor = 0

    return Object.keys(optionGroups).map((group) => {
      const offset = cursor

      cursor += optionGroups[group].length

      return (
        <MenuGroup key={group} group={group}>
          {flatOptionComponents(optionGroups[group], offset)}
        </MenuGroup>
      )
    })
  }

  const optionComponents = isOptionsType(options)
    ? flatOptionComponents(options)
    : groupedOptionComponents(options)

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
