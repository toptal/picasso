import React, { ReactNode, useMemo } from 'react'
import { BaseProps } from '@toptal/picasso-shared'
import { makeStyles, Theme } from '@material-ui/core/styles'

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
  SelectProps,
  DEFAULT_LIMIT
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
        <Typography size='small' weight='semibold' color='dark-grey'>
          {group}
        </Typography>
      </MenuItem>
      {children}
    </>
  )
}

export type Props = Pick<
  SelectProps,
  'value' | 'multiple' | 'size' | 'noOptionsText' | 'renderOption' | 'limit'
> & {
  options: Option[] | OptionGroups
  highlightedIndex: number | null
  filterOptionsValue: string
  getItemProps: (option: Option, index: number) => ItemProps
  onBlur?: FocusEventType
  fixedHeader?: ReactNode
}

const renderOptions = ({
  options,
  getItemProps,
  value,
  size,
  highlightedIndex,
  limit,
  offset = 0,
  renderOption
}: Pick<
  Props,
  | 'getItemProps'
  | 'value'
  | 'size'
  | 'highlightedIndex'
  | 'limit'
  | 'renderOption'
> & { options: Option[]; offset?: number }) => {
  const limitedOptions = limit ? options.slice(0, limit) : options

  return limitedOptions.map((option, index) => {
    const selection = getSelection(options, value)

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
  value,
  size,
  highlightedIndex,
  limit,
  renderOption
}: Pick<
  Props,
  'getItemProps' | 'value' | 'size' | 'highlightedIndex' | 'renderOption'
> & { groups: OptionGroups; limit: number }) => {
  let optionsCount = 0

  return Object.keys(groups).map(group => {
    const menuGroups = (
      <MenuGroup key={group} group={group}>
        {renderOptions({
          options: groups[group],
          getItemProps,
          value,
          size,
          highlightedIndex,
          limit: limit - optionsCount,
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
  value,
  size,
  filterOptionsValue,
  noOptionsText,
  fixedHeader,
  limit = DEFAULT_LIMIT
}: Props) => {
  const classes = useStyles()
  const flatOptions: Option[] = useMemo(() => flattenOptions(options), [
    options
  ])
  const header = fixedHeader ? (
    <ScrollMenu.Header>{fixedHeader}</ScrollMenu.Header>
  ) : null

  if (!flatOptions.length && filterOptionsValue) {
    return (
      <ScrollMenu
        data-testid='no-options'
        fixedHeader={header}
        role='listbox'
        size={size}
      >
        <MenuItem titleCase={false} disabled>
          {noOptionsText}
        </MenuItem>
      </ScrollMenu>
    )
  }

  const fixedFooter =
    limit && flatOptions.length > limit ? (
      <ScrollMenu.Footer className={classes.fixedFooter}>
        <Typography size='xsmall'>
          Showing only first {limit} of {flatOptions.length} items
        </Typography>
      </ScrollMenu.Footer>
    ) : null

  return (
    <ScrollMenu
      fixedHeader={header}
      onBlur={onBlur}
      selectedIndex={
        isOptionsType(options)
          ? highlightedIndex
          : addOffsetToHighlightedIndex(options, highlightedIndex)
      }
      fixedFooter={fixedFooter}
      role='listbox'
      size={size}
    >
      {isOptionsType(options)
        ? renderOptions({
            options,
            getItemProps,
            value,
            size,
            highlightedIndex,
            limit,
            renderOption
          })
        : renderGroups({
            groups: options,
            getItemProps,
            value,
            size,
            highlightedIndex,
            limit,
            renderOption
          })}
    </ScrollMenu>
  )
}

NonNativeSelectOptions.displayName = 'NonNativeSelectOptions'

export default NonNativeSelectOptions
