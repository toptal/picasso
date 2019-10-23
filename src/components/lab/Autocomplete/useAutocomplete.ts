import { KeyboardEvent, useState, ChangeEvent } from 'react'

import { Item } from './types'

export const FIRST_ITEM_INDEX = 0
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

interface Props {
  value: string
  options?: Item[]
  onSelect?: (item: Item) => void
  onChange?: (value: string) => void
  onKeyDown?: (
    event: KeyboardEvent<HTMLInputElement>,
    inputValue: string
  ) => void
  getDisplayValue: (item: Item | null) => string
}

const useAutocomplete = ({
  value,
  options = [],
  onChange = () => {},
  onKeyDown = () => {},
  onSelect = () => {},
  getDisplayValue
}: Props) => {
  const [isOpen, setOpen] = useState<boolean>(false)
  const [highlightedIndex, setHighlightedIndex] = useState<number | null>(null)

  const handleChange = (newValue: string) => {
    if (newValue !== value) {
      onChange(newValue)
    }
  }

  const handleSelect = (item: Item | null) => {
    const displayValue = getDisplayValue(item)

    if (item === null || displayValue === null) {
      return
    }

    onSelect(item)
  }

  const itemProps = (index: number, item: any) => ({
    role: 'option',
    'aria-selected': highlightedIndex === index,
    selected: highlightedIndex === index,
    onMouseMove: () => {
      if (index === highlightedIndex) {
        return
      }

      setHighlightedIndex(index)
    },
    onMouseDown: (event: any) => {
      // This prevents the activeElement from being changed
      // to the item so it can remain with the current activeElement
      // which is a more common use case.
      event.preventDefault()
    },
    onClick: () => {
      setOpen(false)
      handleChange(getDisplayValue(item))
      handleSelect(item)
    }
  })

  const handleFocusOrClick = () => {
    if (isOpen) {
      return
    }

    setOpen(true)
    setHighlightedIndex(FIRST_ITEM_INDEX)
  }

  const inputProps = () => ({
    'aria-autocomplete': 'list' as React.AriaAttributes['aria-autocomplete'],
    onFocus: handleFocusOrClick,
    onClick: handleFocusOrClick,
    onChange: (
      event: ChangeEvent<
        HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement
      >
    ) => {
      setOpen(true)
      setHighlightedIndex(FIRST_ITEM_INDEX)
      onChange(event.target.value)
    },

    onKeyDown: (event: KeyboardEvent<HTMLInputElement>) => {
      const key = normalizeArrowKey(event)

      if (key === 'ArrowUp') {
        event.preventDefault()

        setOpen(true)
        setHighlightedIndex(
          getNextWrappingIndex(-1, highlightedIndex, options.length)
        )
      }

      if (key === 'ArrowDown') {
        event.preventDefault()

        setOpen(true)
        setHighlightedIndex(
          getNextWrappingIndex(1, highlightedIndex, options.length)
        )
      }

      if (key === 'Backspace') {
        if (value !== EMPTY_INPUT_VALUE) {
          return
        }

        setOpen(false)
        setHighlightedIndex(null)
        handleChange(getDisplayValue(null))
      }

      if (key === 'Enter') {
        if (!isOpen || highlightedIndex === null) {
          return
        }

        event.preventDefault()

        const item = options[highlightedIndex]

        if (item == null) {
          return
        }

        setOpen(false)
        handleChange(getDisplayValue(item))
        handleSelect(item)
      }

      if (key === 'Escape') {
        event.preventDefault()

        setOpen(false)
        setHighlightedIndex(null)
        handleChange(getDisplayValue(null))
      }

      onKeyDown(event, value)
    },

    onBlur: () => setOpen(false)
  })

  return {
    itemProps,
    inputProps,
    isOpen,
    highlightedIndex
  }
}

export default useAutocomplete
