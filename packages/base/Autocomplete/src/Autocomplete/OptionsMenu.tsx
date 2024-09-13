import type { ReactNode } from 'react'
import React from 'react'
import { SelectOptions } from '@toptal/picasso-select'
import { MenuItem } from '@toptal/picasso-menu'
import { unsafeErrorLog } from '@toptal/picasso-utils'

import PoweredByGoogle from './PoweredByGoogle'
import NoOptionsMenuItem from './NoOptionsMenuItem'
import OtherOptionMenuItem from './OtherOptionMenuItem'
import type {
  Item,
  GetItemPropsSignature,
  GetOtherItemPropsSignature,
} from './types'

export type OptionsMenuProps = {
  options?: Item[] | null
  /** Show the "Powered By Google" label */
  poweredByGoogle?: boolean
  /** Callback responsible for rendering the other option given the input's value */
  renderOtherOption?: (value: string) => ReactNode
  /** Label to show when no options were found (pass "null" to hide label completely) */
  noOptionsText?: string | null
  /** Text prefix for other option */
  otherOptionText?: string
  /** Callback responsible for rendering the option given the option and its index in the list of options */
  renderOption?: (option: Item, index: number) => ReactNode
  highlightedIndex: number
  testIds?: {
    menuItem?: string
    scrollMenu?: string
    otherOption?: string
    noOptions?: string
  }
  getKey?: (item: Item) => string
  getDisplayValue: (item: Item | null) => string
  value: string
  getItemProps: GetItemPropsSignature
  getOtherItemProps: GetOtherItemPropsSignature
  shouldShowOtherOption: boolean
}

const OptionsMenu = ({
  options,
  getItemProps,
  getOtherItemProps,
  renderOtherOption,
  otherOptionText = 'Other option: ',
  getDisplayValue,
  value,
  getKey: customGetKey,
  renderOption,
  noOptionsText,
  poweredByGoogle,
  shouldShowOtherOption,
  highlightedIndex,
  testIds,
}: OptionsMenuProps) => {
  const getKey = (item: Item) => {
    if (customGetKey) {
      return customGetKey(item)
    }

    const displayValue = getDisplayValue(item)

    if (!displayValue) {
      unsafeErrorLog(
        'Autocomplete expects you to provide key prop value with getKey or Item.value!'
      )
    }

    return displayValue
  }

  const optionsLength = options ? options.length : 0
  const menuItems =
    options?.map((option, index) => (
      <MenuItem
        data-testid={
          testIds?.menuItem ? `${testIds?.menuItem}-${index}` : undefined
        }
        key={getKey(option)}
        {...getItemProps(index, option)}
        titleCase={false}
        description={option.description}
      >
        {renderOption ? renderOption(option, index) : getDisplayValue(option)}
      </MenuItem>
    )) || []

  if (shouldShowOtherOption) {
    menuItems.push(
      <OtherOptionMenuItem
        key='other-option-menu-item'
        data-testid={testIds?.otherOption}
        value={value}
        renderOtherOption={renderOtherOption}
        otherOptionText={otherOptionText}
        {...getOtherItemProps(optionsLength, value)}
      />
    )
  }

  const showNoOptionsText =
    !optionsLength && !shouldShowOtherOption && noOptionsText

  if (showNoOptionsText) {
    menuItems.push(
      <NoOptionsMenuItem
        key='no-options-menu-item'
        data-testid={testIds?.noOptions}
      >
        {noOptionsText}
      </NoOptionsMenuItem>
    )
  }

  if (menuItems.length === 0 || !options) {
    return null
  }

  return (
    options && (
      <SelectOptions
        data-testid={testIds?.scrollMenu}
        selectedIndex={highlightedIndex}
        fixedFooter={
          optionsLength > 0 && poweredByGoogle && <PoweredByGoogle />
        }
      >
        {menuItems}
      </SelectOptions>
    )
  )
}

export default OptionsMenu
