import type { ReactNode } from 'react'
import React, { useMemo } from 'react'
import type { BaseProps } from '@toptal/picasso-shared'
import { MenuItem } from '@toptal/picasso-menu'
import { Typography } from '@toptal/picasso-typography'

import { NonNativeSelectOption } from '../NonNativeSelectOption'
import { SelectOptions } from '../SelectOptions'
import type {
  FocusEventType,
  ItemProps,
  Option,
  OptionGroups,
  SelectProps,
  Selection,
} from '../SelectBase'
import { flattenOptions, isOptionsType } from '../SelectBase'

// TODO: Replace with a real component as soon as it's implemented [FX-1479]
// https://toptal-core.atlassian.net/browse/FX-1479
// Note: In the current implementation children are siblings for the group node.
// If in the new MenuGroup children are inside the group node, that will
// brake the current implementation of highlightedIndex calculations in this
// component and selectedIndex in ScrollMenu component.
interface MenuGroupProps extends BaseProps {
  group: string
  children: ReactNode
}
const MenuGroup = (props: MenuGroupProps) => {
  const { group, children, ...rest } = props

  return (
    <>
      <MenuItem
        role='option'
        titleCase={false}
        nonSelectable
        className='pt-4 px-4 pb-[10px]'
        {...rest}
      >
        <Typography size='xsmall' weight='semibold' color='dark-grey'>
          {group}
        </Typography>
      </MenuItem>
      {children}
    </>
  )
}

export type Props = Pick<
  SelectProps,
  'multiple' | 'noOptionsText' | 'renderOption'
> & {
  options: Option[] | OptionGroups
  highlightedIndex: number | null
  filterOptionsValue: string
  getItemProps: (option: Option, index: number) => ItemProps
  onBlur?: FocusEventType
  fixedHeader?: ReactNode
  fixedFooter?: ReactNode
  selection: Selection
  testIds?: {
    noOptions?: string
  }
}

const MemoizedNonNativeSelectOption = React.memo(NonNativeSelectOption)

const renderOptions = ({
  options,
  getItemProps,
  selection,
  highlightedIndex,
  offset = 0,
  renderOption,
}: Pick<
  Props,
  'getItemProps' | 'selection' | 'highlightedIndex' | 'renderOption'
> & { options: Option[]; offset?: number }) => {
  return options.map((option, index) => {
    const optionIndex = index + offset
    const isHighlighted = highlightedIndex === optionIndex
    const isSelected = selection.isOptionSelected(option)

    return (
      <MemoizedNonNativeSelectOption
        key={option.key || option.value}
        option={option}
        selected={isSelected}
        highlighted={isHighlighted}
        description={option.description}
        {...getItemProps(option, optionIndex)}
      >
        {renderOption?.(option)}
      </MemoizedNonNativeSelectOption>
    )
  })
}

const renderGroups = ({
  groups,
  getItemProps,
  selection,
  highlightedIndex,
  renderOption,
}: Pick<
  Props,
  'getItemProps' | 'selection' | 'highlightedIndex' | 'renderOption'
> & { groups: OptionGroups }) => {
  let optionsCount = 0

  return Object.keys(groups).map(group => {
    const menuGroups = (
      <MenuGroup key={group} group={group}>
        {renderOptions({
          options: groups[group],
          getItemProps,
          selection,
          highlightedIndex,
          offset: optionsCount,
          renderOption,
        })}
      </MenuGroup>
    )

    optionsCount += groups[group].length

    return menuGroups
  })
}

const addOffsetToHighlightedIndex = (
  groups: OptionGroups,
  highlightedIndex: number | null
) => {
  if (!highlightedIndex) {
    return highlightedIndex
  }

  let optionsCount = 0

  const offset =
    Object.values(groups).findIndex(group => {
      optionsCount += group.length
      const isHighlightedOptionInGroup = highlightedIndex < optionsCount

      return isHighlightedOptionInGroup
    }) + 1

  return highlightedIndex + offset
}

const NonNativeSelectOptions = ({
  options,
  renderOption = () => null,
  highlightedIndex,
  getItemProps,
  onBlur,
  selection,
  filterOptionsValue,
  noOptionsText,
  fixedHeader,
  fixedFooter,
  testIds,
}: Props) => {
  const flatOptions: Option[] = useMemo(
    () => flattenOptions(options),
    [options]
  )

  const renderedContent = useMemo(() => {
    if (!flatOptions.length && filterOptionsValue) {
      return (
        <MenuItem titleCase={false} disabled>
          {noOptionsText}
        </MenuItem>
      )
    }

    if (isOptionsType(options)) {
      return renderOptions({
        options,
        getItemProps,
        selection,
        highlightedIndex,
        renderOption,
      })
    }

    return renderGroups({
      groups: options,
      getItemProps,
      selection,
      highlightedIndex,
      renderOption,
    })
  }, [
    options,
    flatOptions,
    filterOptionsValue,
    getItemProps,
    selection,
    highlightedIndex,
    renderOption,
    noOptionsText,
  ])

  if (!flatOptions.length && filterOptionsValue) {
    return (
      <SelectOptions
        data-testid={testIds?.noOptions}
        role='listbox'
        fixedHeader={fixedHeader}
      >
        {renderedContent}
      </SelectOptions>
    )
  }

  return (
    <SelectOptions
      fixedHeader={fixedHeader}
      onBlur={onBlur}
      selectedIndex={
        isOptionsType(options)
          ? highlightedIndex
          : addOffsetToHighlightedIndex(options, highlightedIndex)
      }
      fixedFooter={fixedFooter}
      role='listbox'
    >
      {renderedContent}
    </SelectOptions>
  )
}

NonNativeSelectOptions.displayName = 'NonNativeSelectOptions'

export default NonNativeSelectOptions
