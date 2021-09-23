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

  if (!flatOptions.length && filterOptionsValue) {
    return (
      <ScrollMenu data-testid='no-options' fixedHeader={fixedHeader}>
        <MenuItem titleCase={false} disabled>
          {noOptionsText}
        </MenuItem>
      </ScrollMenu>
    )
  }

  const flatOptionComponents = (
    optionsList: Option[],
    limit?: number,
    offset = 0
  ) => {
    const limitedOptions = limit ? optionsList.slice(0, limit) : optionsList

    return limitedOptions.map((option, currentIndex) => {
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
  }

  const groupedOptionComponents = (
    optionGroups: OptionGroups,
    limit: number
  ) => {
    let cursor = 0

    return Object.keys(optionGroups).reduce((rendered, group) => {
      const remainingLimit = limit - cursor

      cursor += 1 // for the group item itself
      const offset = cursor

      if (remainingLimit > 0) {
        rendered.push(
          <MenuGroup key={group} group={group}>
            {flatOptionComponents(optionGroups[group], remainingLimit, offset)}
          </MenuGroup>
        )
        cursor += optionGroups[group].length
      }

      return rendered
    }, [] as JSX.Element[])
  }

  const optionComponents = isOptionsType(options)
    ? flatOptionComponents(options, limit)
    : groupedOptionComponents(options, limit)

  const fixedFooter =
    limit && flatOptions.length > limit ? (
      <MenuItem titleCase={false} className={classes.fixedFooter} disabled>
        Showing only first {limit} of {flatOptions.length} items
      </MenuItem>
    ) : null

  return (
    <ScrollMenu
      fixedHeader={fixedHeader}
      onBlur={onBlur}
      selectedIndex={highlightedIndex}
      fixedFooter={fixedFooter}
    >
      {optionComponents}
    </ScrollMenu>
  )
}

NonNativeSelectOptions.displayName = 'NonNativeSelectOptions'

export default NonNativeSelectOptions
