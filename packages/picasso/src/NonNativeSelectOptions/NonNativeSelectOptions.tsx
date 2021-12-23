import React, { ReactNode, useMemo } from 'react'
import { BaseProps } from '@toptal/picasso-shared'
import { makeStyles, Theme } from '@material-ui/core/styles'

import MenuItem from '../MenuItem'
import NonNativeSelectOption from '../NonNativeSelectOption'
import ScrollMenu from '../ScrollMenu'
import {
  flattenOptions,
  isOptionsType,
  FocusEventType,
  ItemProps,
  Option,
  OptionGroups,
  SelectProps,
  Selection
} from '../Select'
import Typography from '../Typography'
import styles from './styles'

const useStyles = makeStyles<Theme>(styles)

// TODO: Replace with a real component as soon as it's implemented
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
  const classes = useStyles()

  return (
    <>
      <MenuItem
        role='option'
        titleCase={false}
        nonSelectable
        className={classes.menuGroup}
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
  'multiple' | 'size' | 'noOptionsText' | 'renderOption'
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

const renderOptions = ({
  options,
  getItemProps,
  selection,
  size,
  highlightedIndex,
  offset = 0,
  renderOption
}: Pick<
  Props,
  'getItemProps' | 'selection' | 'size' | 'highlightedIndex' | 'renderOption'
> & { options: Option[]; offset?: number }) => {
  return options.map((option, index) => {
    return (
      <NonNativeSelectOption
        key={option.key || option.value}
        option={option}
        size={size}
        selected={selection.isOptionSelected(option)}
        highlighted={highlightedIndex === index + offset}
        description={option.description}
        {...getItemProps(option, index + offset)}
      >
        {renderOption?.(option)}
      </NonNativeSelectOption>
    )
  })
}

const renderGroups = ({
  groups,
  getItemProps,
  selection,
  size,
  highlightedIndex,
  renderOption
}: Pick<
  Props,
  'getItemProps' | 'selection' | 'size' | 'highlightedIndex' | 'renderOption'
> & { groups: OptionGroups }) => {
  let optionsCount = 0

  return Object.keys(groups).map(group => {
    const menuGroups = (
      <MenuGroup key={group} group={group}>
        {renderOptions({
          options: groups[group],
          getItemProps,
          selection,
          size,
          highlightedIndex,
          offset: optionsCount,
          renderOption
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
  size,
  filterOptionsValue,
  noOptionsText,
  fixedHeader,
  fixedFooter,
  testIds
}: Props) => {
  const flatOptions: Option[] = useMemo(() => flattenOptions(options), [
    options
  ])

  if (!flatOptions.length && filterOptionsValue) {
    return (
      <ScrollMenu
        data-testid={testIds?.noOptions}
        role='listbox'
        fixedHeader={fixedHeader}
      >
        <MenuItem titleCase={false} disabled>
          {noOptionsText}
        </MenuItem>
      </ScrollMenu>
    )
  }

  return (
    <ScrollMenu
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
      {isOptionsType(options)
        ? renderOptions({
            options,
            getItemProps,
            selection,
            size,
            highlightedIndex,
            renderOption
          })
        : renderGroups({
            groups: options,
            getItemProps,
            selection,
            size,
            highlightedIndex,
            renderOption
          })}
    </ScrollMenu>
  )
}

NonNativeSelectOptions.displayName = 'NonNativeSelectOptions'

export default NonNativeSelectOptions
