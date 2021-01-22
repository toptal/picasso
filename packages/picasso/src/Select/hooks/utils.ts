import { KeyboardEvent } from 'react'

import { Option, ValueType } from '../types'

export const EMPTY_INPUT_VALUE = ''

export const getOptionText = (option: Option | null) =>
  (option && option.text) || EMPTY_INPUT_VALUE

export type Selection = {
  isSelected(): boolean
  isOptionSelected(option: Option): boolean
  display(getDisplayValue: (option: Option | null) => string): string
}

export const isOptionInSelectedValues = (option: Option, value: ValueType[]) =>
  value.includes(String(option.value))

export const getMultipleSelection = (
  options: Option[],
  value: ValueType[]
): Selection => {
  const getSelectedOptions = () =>
    options.filter(option => isOptionInSelectedValues(option, value))

  return {
    display: (getDisplayValue: (option: Option | null) => string) =>
      getSelectedOptions()
        .map(getDisplayValue)
        .join(', '),
    isSelected: () => !isEmpty(value),
    isOptionSelected: option => isOptionInSelectedValues(option, value)
  }
}

export const getSingleSelection = (
  options: Option[],
  value?: ValueType
): Selection => {
  const getSelectedOption = () =>
    options.find(option => option.value === value) || null

  return {
    display: (getDisplayValue: (option: Option | null) => string) =>
      getDisplayValue(getSelectedOption()),
    isSelected: () => !isEmpty(value),
    isOptionSelected: option => option.value === value
  }
}

export const getSelection = (
  options: Option[],
  value?: ValueType | ValueType[]
) =>
  Array.isArray(value)
    ? getMultipleSelection(options, value as ValueType[])
    : getSingleSelection(options, value as ValueType | undefined)

export const removeDuplicatedOptions = (options: Option[]) =>
  options.filter((option, index) => {
    const innerIndex = options.findIndex(
      innerOption => innerOption.value === option.value
    )

    return innerIndex === index
  })

export const isEmpty = (value?: ValueType | ValueType[]) =>
  Array.isArray(value) ? value.length === 0 : value === ''

export const getSelectedOptions = (
  options: Option[],
  value?: ValueType | ValueType[]
) =>
  options.filter(option =>
    Array.isArray(value)
      ? value.includes(String(option.value))
      : value === String(option.value)
  )

/**
 * Returns the new index in the list, in a circular way. If next value is out of bonds from the total,
 * it will wrap to either 0 or itemCount - 1.
 *
 * @param {number} moveAmount Number of positions to move. Negative to move backwards, positive forwards.
 * @param {number} initialIndex The initial position to move from.
 * @param {number} itemCount The total number of items.
 * @returns {number} The new index after the move.
 */
// eslint-disable-next-line complexity
export const getNextWrappingIndex = (
  moveAmount: number,
  initialIndex: number | null,
  itemCount: number
) => {
  const itemsLastIndex = itemCount - 1

  if (
    typeof initialIndex !== 'number' ||
    initialIndex < 0 ||
    initialIndex >= itemCount
  ) {
    initialIndex = moveAmount > 0 ? -1 : itemsLastIndex + 1
  }

  const newIndex = initialIndex + moveAmount

  if (newIndex < 0) {
    return itemsLastIndex
  }

  if (newIndex > itemsLastIndex) {
    return 0
  }

  return newIndex
}

export const normalizeArrowKey = (event: KeyboardEvent<HTMLInputElement>) => {
  const { key, keyCode } = event

  // compatibility for older browsers
  // https://stackoverflow.com/questions/5597060/detecting-arrow-key-presses-in-javascript/9310900#comment91057577_44213036
  if (keyCode >= 37 && keyCode <= 40 && key.indexOf('Arrow') !== 0) {
    return `Arrow${key}`
  }

  return key
}
