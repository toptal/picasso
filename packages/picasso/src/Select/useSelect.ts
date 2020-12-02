import {
  KeyboardEvent,
  useState,
  ChangeEvent,
  useCallback,
  HTMLAttributes,
  useEffect
} from 'react'
import PopperJs from 'popper.js'

import { Option } from './types'

export type ItemProps = {
  role: string
  'aria-selected': boolean
  onMouseEnter: () => void
  onMouseDown: (event: React.MouseEvent) => void
  close: () => void
  onClick: (event: React.MouseEvent) => void
}

export const EMPTY_INPUT_VALUE = ''

const normalizeArrowKey = (event: KeyboardEvent<HTMLInputElement>) => {
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
// eslint-disable-next-line complexity
const getNextWrappingIndex = (
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

export type FocusEventType = (event: React.FocusEvent<HTMLInputElement>) => void

interface Props {
  searchInputRef: React.Ref<HTMLInputElement>
  selectRef: React.Ref<HTMLInputElement>
  popperRef: React.Ref<PopperJs>
  value: string
  options?: Option[]
  enableAutofill?: boolean
  closeOnEnter?: boolean
  autoComplete?: any
  disabled?: boolean
  selectedIndexes?: number[]
  onSelect?: (event: React.SyntheticEvent, item: Option | null) => void
  onChange?: (value: string) => void
  onKeyDown?: (
    event: KeyboardEvent<HTMLInputElement>,
    inputValue: string
  ) => void
  onBlur?: FocusEventType
  onFocus?: FocusEventType
  showSearch: boolean
}

type GetRootProps = () => {
  onFocus: FocusEventType
  onClick: (event: React.MouseEvent<HTMLInputElement>) => void
  onBlur: FocusEventType
}
type GetInputProps = () => Partial<HTMLAttributes<HTMLInputElement>>
type GetSearchInputProps = () => Partial<HTMLAttributes<HTMLInputElement>>

interface UseSelectOutput {
  getItemProps: (index: number, item: Option) => ItemProps
  getRootProps: GetRootProps
  getInputProps: GetInputProps
  getSearchInputProps: GetSearchInputProps
  isOpen: boolean
  highlightedIndex: number
  setHighlightedIndex: (index: number) => void
}

const focusRef = <T extends HTMLElement>(ref: React.Ref<T>) => {
  if (typeof ref === 'object' && ref?.current) {
    ref.current.focus()
  }
}

// eslint-disable-next-line max-lines-per-function
// eslint-disable-next-line max-statements
const useSelect = ({
  selectRef,
  popperRef,
  searchInputRef,
  closeOnEnter,
  value,
  options = [],
  selectedIndexes = [],
  disabled = false,
  showSearch,
  onChange = () => {},
  onKeyDown = () => {},
  onSelect = () => {},
  onBlur = () => {},
  onFocus = () => {}
}: Props): UseSelectOutput => {
  const [isOpen, setOpen] = useState<boolean>(false)

  useEffect(() => {
    if (!isOpen) {
      setHighlightedIndex(selectedIndexes.length === 1 ? selectedIndexes[0] : 0)
    }
  }, [isOpen, selectedIndexes])

  const [highlightedIndex, setHighlightedIndex] = useState<number>(0)

  const handleSelect = (event: React.SyntheticEvent, item: Option | null) => {
    onSelect(event, item)
  }

  const handleItemOnMouseDown = useCallback(
    (event: React.MouseEvent) => {
      // This prevents the activeElement from being changed
      // to the item so it can remain with the current activeElement
      // which is a more common use case.
      event.preventDefault()
      focusRef(selectRef)
    },
    [selectRef]
  )

  const close = useCallback(() => {
    setOpen(false)
  }, [setOpen])

  const getItemProps = (index: number, item: Option): ItemProps => ({
    role: 'option',
    'aria-selected': highlightedIndex === index,
    onMouseEnter: () => {
      if (index === highlightedIndex) {
        return
      }

      setHighlightedIndex(index)
    },
    onMouseDown: handleItemOnMouseDown,
    close,
    onClick: (event: React.MouseEvent) => {
      close()
      handleSelect(event, item)
    }
  })

  const handleFocusOrClick = (
    event:
      | React.FocusEvent<HTMLInputElement>
      | React.MouseEvent<HTMLInputElement>
  ) => {
    if (!isOpen && !disabled) {
      onFocus(event as React.FocusEvent<HTMLInputElement>)
      setOpen(true)
    }
  }

  const isRelatedTargetInsidePopper = (event: React.FocusEvent) =>
    typeof popperRef === 'object' &&
    popperRef?.current &&
    popperRef.current.popper.contains(event.relatedTarget as Node)

  const handleSelectBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    if (!isRelatedTargetInsidePopper(event)) {
      onBlur(event)
      close()
    }
  }

  const handleSearchBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    if (isRelatedTargetInsidePopper(event)) {
      focusRef(selectRef)
    } else {
      close()
    }
  }

  const handleEscapeKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    event.preventDefault()
    close()
  }

  const handleEnterKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    event.preventDefault()

    const item = options[highlightedIndex]

    if (item == null) {
      return
    }

    if (closeOnEnter) {
      close()
    }
    handleSelect(event, item)
  }

  const handleArrowsKeyDown = (
    key: string,
    event: KeyboardEvent<HTMLInputElement>
  ) => {
    event.preventDefault()

    if (isOpen) {
      setHighlightedIndex(
        getNextWrappingIndex(
          key === 'ArrowDown' ? 1 : -1,
          highlightedIndex,
          options.length
        )
      )
    } else {
      setOpen(true)
    }
  }

  // eslint-disable-next-line max-lines-per-function
  // eslint-disable-next-line complexity
  const handleSearchKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    const key = normalizeArrowKey(event)

    if (key === 'Tab') {
      focusRef(selectRef)
      event.preventDefault()
    } else if (key === 'ArrowUp' || key === 'ArrowDown') {
      handleArrowsKeyDown(key, event)
    } else if (key === 'Enter') {
      handleEnterKeyDown(event)
    } else if (key === 'Escape') {
      handleEscapeKeyDown(event)
    }

    onKeyDown(event, value)
  }

  // eslint-disable-next-line complexity
  const handleSelectKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    const isValidInputValue =
      Boolean(event.key.match(/^[A-z\d]$/)) || event.key === 'Backspace'

    if (isValidInputValue) {
      focusRef(searchInputRef)
    }

    const key = normalizeArrowKey(event)

    if (key === 'Tab' && isOpen && showSearch) {
      event.preventDefault()
      focusRef(searchInputRef)
    } else if (key === 'ArrowUp' || key === 'ArrowDown') {
      handleArrowsKeyDown(key, event)
    } else if (key === 'Enter') {
      handleEnterKeyDown(event)
    } else if (key === 'Escape') {
      handleEscapeKeyDown(event)
    }

    onKeyDown(event, value)
  }

  const handleResetClick = (event: React.MouseEvent<HTMLInputElement>) => {
    // keep select options closed
    event.stopPropagation()

    close()
    handleSelect(event, null)
  }

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value)
  }

  const getRootProps = () => ({
    onFocus: handleFocusOrClick,
    onClick: handleFocusOrClick,
    onBlur: handleSelectBlur
  })

  const getInputProps = () => ({
    onKeyDown: handleSelectKeyDown,
    onResetClick: handleResetClick
  })

  const getSearchInputProps = () => ({
    'aria-autocomplete': 'list' as React.AriaAttributes['aria-autocomplete'],
    onChange: handleSearchChange,
    onKeyDown: handleSearchKeyDown,
    onBlur: handleSearchBlur
  })

  return {
    getItemProps,
    getRootProps,
    getInputProps,
    getSearchInputProps,
    isOpen,
    highlightedIndex,
    setHighlightedIndex
  }
}

export default useSelect
