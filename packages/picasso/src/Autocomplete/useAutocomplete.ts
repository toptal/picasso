/* eslint-disable complexity, max-statements */ // Squiggly lines makes code difficult to work with

import { KeyboardEvent, useState, ChangeEvent, FocusEventHandler } from 'react'

import { Item, ChangedOptions } from './types'

export const EMPTY_INPUT_VALUE = ''

function normalizeArrowKey(event: KeyboardEvent<HTMLInputElement>) {
  const { key, keyCode } = event

  // compatibility for older browsers
  // https://stackoverflow.com/questions/5597060/detecting-arrow-key-presses-in-javascript/9310900#comment91057577_44213036
  if (keyCode >= 37 && keyCode <= 40 && key.indexOf('Arrow') !== 0) {
    return `Arrow${key}`
  }
  return key
}

/**
 * Returns the new index in the list, in a circular way. If next value is out of bonds from the total,
 * it will wrap to either 0 or itemCount - 1.
 *
 * @param {number} moveAmount Number of positions to move. Negative to move backwards, positive forwards.
 * @param {number} initialIndex The initial position to move from.
 * @param {number} itemCount The total number of items.
 * @returns {number} The new index after the move.
 */
function getNextWrappingIndex(
  moveAmount: number,
  initialIndex: number | null,
  itemCount: number
) {
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

export interface UseAutocompleteConfig<T> {
  value: T
  options?: T[] | null
  onSelect?: (item: T) => void
  onOtherOptionSelect?: (value: string) => void
  onChange?: (value: string, options: ChangedOptions) => void
  onKeyDown?: (
    event: KeyboardEvent<HTMLInputElement>,
    inputValue: string
  ) => void
  onFocus?: FocusEventHandler<HTMLInputElement>
  onBlur?: FocusEventHandler<HTMLInputElement>
  getDisplayValue: (item: T) => string
  enableReset?: boolean
  showOtherOption?: boolean
}

const useAutocomplete = <T extends Item>({
  value,
  options = [],
  onChange = () => {},
  onKeyDown = () => {},
  onFocus = () => {},
  onBlur = () => {},
  onSelect = () => {},
  onOtherOptionSelect = () => {},
  getDisplayValue,
  enableReset,
  showOtherOption
}: UseAutocompleteConfig<T>) => {
  const [isOpen, setOpen] = useState<boolean>(false)
  const [highlightedIndex, setHighlightedIndex] = useState<number | null>(null)

  const shouldShowOtherOption =
    showOtherOption &&
    value &&
    Array.isArray(options) &&
    options.every(option => getDisplayValue!(option) !== getDisplayValue(value))

  const handleChange = (newValue: T | string, isSelected = false) => {
    if (newValue !== value) {
      onChange(
        typeof newValue === 'string' ? newValue : getDisplayValue(newValue),
        { isSelected }
      )
    }
  }

  const handleSelect = (item: T) => {
    const displayValue = getDisplayValue(item)

    if (item === null || displayValue === null) {
      return
    }

    onSelect(item)
  }

  const getBaseItemProps = (index: number) => ({
    role: 'option',
    'aria-selected': highlightedIndex === index,
    selected: highlightedIndex === index,
    onMouseMove: () => {
      if (index === highlightedIndex) {
        return
      }

      setHighlightedIndex(index)
    },
    onMouseDown: (event: React.MouseEvent) => {
      // This prevents the activeElement from being changed
      // to the item so it can remain with the current activeElement
      // which is a more common use case.
      event.preventDefault()
    }
  })

  const getItemProps = (index: number, item: T) => ({
    ...getBaseItemProps(index),
    onClick: () => {
      setOpen(false)
      handleChange(item, true)
      handleSelect(item)
    }
  })

  const getOtherItemProps = (index: number, newValue: string) => ({
    ...getBaseItemProps(index),
    onClick: () => {
      setOpen(false)
      onOtherOptionSelect(newValue)
    }
  })

  const handleClick = () => {
    if (isOpen) {
      return
    }

    setOpen(true)
  }

  const handleFocus: FocusEventHandler<HTMLInputElement> = event => {
    handleClick()
    onFocus(event)
  }

  const handleBlur: FocusEventHandler<HTMLInputElement> = event => {
    setOpen(false)
    onBlur(event)
  }

  const getInputProps = () => ({
    'aria-autocomplete': 'list' as React.AriaAttributes['aria-autocomplete'],
    onFocus: handleFocus,
    onClick: handleClick,
    onChange: (
      event: ChangeEvent<
        HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement
      >
    ) => {
      setOpen(true)
      handleChange(event.target.value)
    },

    onKeyDown: (event: KeyboardEvent<HTMLInputElement>) => {
      onKeyDown(event, getDisplayValue(value))

      const key = normalizeArrowKey(event)

      const optionsCount = options?.length || 0
      const otherOptionsCount = shouldShowOtherOption ? 1 : 0
      const itemsCount = optionsCount + otherOptionsCount

      if (key === 'ArrowUp') {
        event.preventDefault()

        setOpen(true)
        setHighlightedIndex(
          getNextWrappingIndex(-1, highlightedIndex, itemsCount)
        )
      }

      if (key === 'ArrowDown') {
        event.preventDefault()

        setOpen(true)
        setHighlightedIndex(
          getNextWrappingIndex(1, highlightedIndex, itemsCount)
        )
      }

      if (key === 'Backspace') {
        if (getDisplayValue(value) !== EMPTY_INPUT_VALUE) {
          return
        }

        setOpen(false)
        setHighlightedIndex(null)
        handleChange(getDisplayValue(null))
      }

      if (key === 'Enter') {
        event.preventDefault()
        setOpen(false)

        const findSelectedItemUsingIndex = () =>
          highlightedIndex === null ? undefined : options?.[highlightedIndex]

        const findSelectedItemUsingValue = () =>
          options?.find(option => option.text === getDisplayValue(value))

        const selectedItem =
          findSelectedItemUsingIndex() ?? findSelectedItemUsingValue()

        if (selectedItem) {
          handleChange(getDisplayValue(selectedItem))
          handleSelect(selectedItem)
        } else if (value) {
          onOtherOptionSelect(getDisplayValue(value))
        }
      }

      if (key === 'Escape') {
        event.preventDefault()

        setOpen(false)
        setHighlightedIndex(null)
        handleChange(getDisplayValue(null))
      }
    },

    onBlur: handleBlur,
    enableReset,
    onResetClick: () => {
      handleChange(getDisplayValue(null))
    }
  })

  return {
    getItemProps,
    getOtherItemProps,
    getInputProps,
    isOpen,
    highlightedIndex,
    shouldShowOtherOption
  }
}

export default useAutocomplete
