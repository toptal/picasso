import { KeyboardEvent, useState, ChangeEvent, useMemo } from 'react'

import { Item, ChangedOptions } from './types'

export const FIRST_ITEM_INDEX = 0
export const EMPTY_INPUT_VALUE = ''

/**
 * Specification has two options to enable/disable autofill:
 * "on"|"off", but google chrome doesn't respect specification and
 * enables autofill for inputs with common name like "email", "address" etc
 * As a workaround it's possible to use any incorrect string as a value of
 * "autocomplete" field. "none" is our current choice.
 */
const AUTOFILL_DISABLED_STATE = 'none'

export const getAutocompletePropValue = (
  enableAutofill: boolean | undefined,
  autoComplete: string | undefined
) => {
  return enableAutofill ? autoComplete : AUTOFILL_DISABLED_STATE
}

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
  enableAutofill?: boolean
  autoComplete?: string
  onSelect?: (item: Item) => void
  onOtherOptionSelect?: (value: string) => void
  onChange?: (value: string, options: ChangedOptions) => void
  onKeyDown?: (
    event: KeyboardEvent<HTMLInputElement>,
    inputValue: string
  ) => void
  getDisplayValue: (item: Item | null) => string
  enableReset?: boolean
}

const useAutocomplete = ({
  value,
  options = [],
  enableAutofill = false,
  autoComplete,
  onChange = () => {},
  onKeyDown = () => {},
  onSelect = () => {},
  onOtherOptionSelect = () => {},
  getDisplayValue,
  enableReset
}: Props) => {
  const [isOpen, setOpen] = useState<boolean>(false)
  const [highlightedIndex, setHighlightedIndex] = useState<number | null>(null)

  const handleChange = (newValue: string, isSelected = false) => {
    if (newValue !== value) {
      onChange(newValue, { isSelected })
    }
  }

  const handleSelect = (item: Item | null) => {
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

  const getItemProps = (index: number, item: Item) => ({
    ...getBaseItemProps(index),
    onClick: () => {
      setOpen(false)
      handleChange(getDisplayValue(item), true)
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

  const handleFocusOrClick = () => {
    if (isOpen) {
      return
    }

    setOpen(true)
    setHighlightedIndex(FIRST_ITEM_INDEX)
  }

  const autoCompletePropValue = useMemo(
    () => getAutocompletePropValue(enableAutofill, autoComplete),
    [enableAutofill, autoComplete]
  )

  const getInputProps = () => ({
    'aria-autocomplete': 'list' as React.AriaAttributes['aria-autocomplete'],
    autoComplete: autoCompletePropValue,
    onFocus: handleFocusOrClick,
    onClick: handleFocusOrClick,
    onChange: (
      event: ChangeEvent<
        HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement
      >
    ) => {
      setOpen(true)
      setHighlightedIndex(FIRST_ITEM_INDEX)
      handleChange(event.target.value)
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

    onBlur: () => setOpen(false),
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
    highlightedIndex
  }
}

export default useAutocomplete
