/* eslint-disable complexity, max-statements */ // Squiggly lines makes code difficult to work with

import {
  MouseEvent,
  KeyboardEvent,
  useState,
  ChangeEvent,
  FocusEventHandler,
  useEffect,
  useMemo
} from 'react'

import { Item, ChangedOptions } from '../types'

export const EMPTY_INPUT_VALUE = ''
export const INITIAL_HIGHLIGH_INDEX = 0

export const normalizeInitialIndex = ({
  initialIndex,
  itemCount,
  moveAmount
}: {
  initialIndex: number
  itemCount: number
  moveAmount: number
}) => {
  const outOfBounds = initialIndex < 0 || initialIndex >= itemCount

  if (outOfBounds) {
    const lastIndex = itemCount - 1

    return moveAmount > 0 ? -1 : lastIndex + 1
  }

  return initialIndex
}

/**
 * Returns the new index in the list, in a circular way. If next value is out of bonds from the total,
 * it will wrap to either 0 or itemCount - 1.
 *
 * @param {number} moveAmount Number of positions to move. Negative to move backwards, positive forwards.
 * @param {number} calculatedInitialIndex The initial position to move from.
 * @param {number} itemCount The total number of items.
 * @returns {number} The new index after the move.
 */

export const getNextWrappingIndex = (
  moveAmount: number,
  initialIndex: number,
  itemCount: number
) => {
  const lastIndex = itemCount - 1

  const normalizedInitialIndex = normalizeInitialIndex({
    initialIndex,
    itemCount,
    moveAmount
  })

  const newIndex = normalizedInitialIndex + moveAmount

  if (newIndex < 0) {
    return lastIndex
  }

  if (newIndex > lastIndex) {
    return 0
  }

  return newIndex
}

export interface Props {
  value: string
  options?: Item[] | null
  onSelect?: (item: Item, event: MouseEvent | KeyboardEvent) => void
  onOtherOptionSelect?: (
    value: string,
    event: MouseEvent | KeyboardEvent
  ) => void
  onChange?: (value: string, options: ChangedOptions) => void
  onKeyDown?: (
    event: KeyboardEvent<HTMLInputElement>,
    inputValue: string
  ) => void
  onFocus?: FocusEventHandler<HTMLInputElement>
  onBlur?: FocusEventHandler<HTMLInputElement>
  getDisplayValue: (item: Item | null) => string
  enableReset?: boolean
  showOtherOption?: boolean
}

export const useAutocomplete = ({
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
}: Props) => {
  const [isOpen, setOpen] = useState<boolean>(false)
  const [highlightedIndex, setHighlightedIndex] = useState<number>(
    INITIAL_HIGHLIGH_INDEX
  )

  const selectedIndex = useMemo(
    () =>
      value && Array.isArray(options)
        ? options.findIndex(option => getDisplayValue!(option) === value)
        : null,
    [getDisplayValue, options, value]
  )

  useEffect(() => {
    if (!isOpen) {
      setHighlightedIndex(
        selectedIndex && selectedIndex !== -1 ? selectedIndex : 0
      )
    }
  }, [isOpen, selectedIndex])

  const shouldShowOtherOption = Boolean(showOtherOption) && selectedIndex === -1

  const handleChange = (newValue: string, isSelected = false) => {
    if (newValue !== value) {
      onChange(newValue, { isSelected })
    }
  }

  const handleSelect = (
    item: Item | null,
    event: MouseEvent | KeyboardEvent
  ) => {
    const displayValue = getDisplayValue(item)

    if (item === null || displayValue === null) {
      return
    }

    onSelect(item, event)
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
    onClick: (event: MouseEvent) => {
      setOpen(false)
      handleChange(getDisplayValue(item), true)
      handleSelect(item, event)
    }
  })

  const getOtherItemProps = (index: number, newValue: string) => ({
    ...getBaseItemProps(index),
    onClick: (event: MouseEvent) => {
      setOpen(false)
      onOtherOptionSelect(newValue, event)
    }
  })

  const handleClick = () => {
    if (isOpen) {
      return
    }

    setOpen(true)
  }

  const handleBlur: FocusEventHandler<HTMLInputElement> = event => {
    setOpen(false)
    onBlur(event)
  }

  const getInputProps = () => ({
    'aria-autocomplete': 'list' as React.AriaAttributes['aria-autocomplete'],
    onFocus,
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
      onKeyDown(event, value)

      const optionsCount = options?.length || 0
      const otherOptionsCount = shouldShowOtherOption ? 1 : 0
      const itemsCount = optionsCount + otherOptionsCount

      if (event.key === 'ArrowUp') {
        event.preventDefault()

        setOpen(true)
        setHighlightedIndex(
          getNextWrappingIndex(-1, highlightedIndex, itemsCount)
        )
      }

      if (event.key === 'ArrowDown') {
        event.preventDefault()

        setOpen(true)
        setHighlightedIndex(
          getNextWrappingIndex(1, highlightedIndex, itemsCount)
        )
      }

      if (event.key === 'Backspace') {
        if (value !== EMPTY_INPUT_VALUE) {
          return
        }

        setOpen(false)
        handleChange(getDisplayValue(null))
      }

      if (event.key === 'Enter') {
        event.preventDefault()

        if (!isOpen) {
          setOpen(true)

          return
        }

        setOpen(false)

        const findSelectedItemUsingIndex = () =>
          highlightedIndex === null ? undefined : options?.[highlightedIndex]

        const findSelectedItemUsingValue = () =>
          options?.find(option => option.text === value)

        const selectedItem =
          findSelectedItemUsingIndex() ?? findSelectedItemUsingValue()

        if (selectedItem) {
          handleChange(getDisplayValue(selectedItem), true)
          handleSelect(selectedItem, event)
        } else if (value) {
          onOtherOptionSelect(value, event)
        }
      }

      if (event.key === 'Escape') {
        event.preventDefault()

        setOpen(false)
        handleChange(getDisplayValue(null))
      }
    },

    onBlur: handleBlur,
    enableReset,
    onResetClick: (
      event: MouseEvent<HTMLButtonElement & HTMLAnchorElement>
    ) => {
      event.stopPropagation()
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
