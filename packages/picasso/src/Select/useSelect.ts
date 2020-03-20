import {
  KeyboardEvent,
  useState,
  ChangeEvent,
  useMemo,
  useCallback,
  HTMLAttributes
} from 'react'

import { Option } from './types'

export type ItemProps = {
  role: string
  'aria-selected': boolean
  onMouseEnter: () => void
  onMouseDown: (event: React.MouseEvent) => void
  close: () => void
  onClick: (event: React.MouseEvent) => void
}

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
  options?: Option[]
  enableAutofill?: boolean
  autoComplete?: any
  onSelect?: (event: React.SyntheticEvent, item: Option | null) => void
  onChange?: (value: string) => void
  onKeyDown?: (
    event: KeyboardEvent<HTMLInputElement>,
    inputValue: string
  ) => void
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void
  getDisplayValue: (item: Option | null) => string
}

type GetInputProps = ({
  canCloseOnEnter
}: {
  canCloseOnEnter: boolean
}) => Partial<
  HTMLAttributes<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
>

type GetRootProps = () => {
  onFocus: (event: React.FocusEvent<HTMLInputElement>) => void
  onClick: (event: React.MouseEvent<HTMLInputElement>) => void
  onBlur: (event: React.FocusEvent<HTMLInputElement>) => void
}

interface UseSelectOutput {
  getItemProps: (index: number, item: Option) => ItemProps
  getRootProps: GetRootProps
  getInputProps: GetInputProps
  isOpen: boolean
  highlightedIndex: number | null
  setHighlightedIndex: (index: number | null) => void
}

const useSelect = ({
  value,
  options = [],
  enableAutofill = false,
  autoComplete,
  onChange = () => {},
  onKeyDown = () => {},
  onSelect = () => {},
  onBlur = () => {},
  onFocus = () => {},
  getDisplayValue
}: Props): UseSelectOutput => {
  const [isOpen, setOpen] = useState<boolean>(false)
  const [highlightedIndex, setHighlightedIndex] = useState<number | null>(null)

  const handleChange = (newValue: string) => {
    if (newValue !== value) {
      onChange(newValue)
    }
  }

  const handleSelect = (event: React.SyntheticEvent, item: Option | null) => {
    onSelect(event, item)
  }

  const onMouseDown = useCallback((event: React.MouseEvent) => {
    // This prevents the activeElement from being changed
    // to the item so it can remain with the current activeElement
    // which is a more common use case.
    event.preventDefault()
  }, [])

  const close = useCallback(() => {
    setOpen(false)
  }, [])

  const getItemProps = (index: number, item: Option): ItemProps => ({
    role: 'option',
    'aria-selected': highlightedIndex === index,
    onMouseEnter: () => {
      if (index === highlightedIndex) {
        return
      }

      setHighlightedIndex(index)
    },
    onMouseDown,
    close,
    onClick: (event: React.MouseEvent) => {
      setOpen(false)
      handleChange(getDisplayValue(item))
      handleSelect(event, item)
    }
  })

  const handleFocusOrClick = (
    event:
      | React.FocusEvent<HTMLInputElement>
      | React.MouseEvent<HTMLInputElement>
  ) => {
    if (!isOpen) {
      onFocus(event as React.FocusEvent<HTMLInputElement>)
      setOpen(true)
      setHighlightedIndex(FIRST_ITEM_INDEX)
    }
  }

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    setOpen(false)
    onBlur(event)
  }

  const autoCompletePropValue = useMemo(
    () => getAutocompletePropValue(enableAutofill, autoComplete),
    [enableAutofill, autoComplete]
  )

  const getInputProps = ({
    canCloseOnEnter
  }: {
    canCloseOnEnter: boolean
  }) => ({
    'aria-autocomplete': 'list' as React.AriaAttributes['aria-autocomplete'],
    autoComplete: autoCompletePropValue,
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

        if (canCloseOnEnter) {
          setOpen(false)
        }
        handleChange(getDisplayValue(item))
        handleSelect(event, item)
      }

      if (key === 'Escape') {
        event.preventDefault()

        setOpen(false)
        setHighlightedIndex(null)
        handleChange(getDisplayValue(null))
      }

      onKeyDown(event, value)
    },
    onResetClick: (event: React.MouseEvent<HTMLInputElement>) => {
      // keep select options closed
      event.stopPropagation()

      setOpen(false)
      setHighlightedIndex(null)
      handleSelect(event, null)
    }
  })

  const getRootProps = () => ({
    onFocus: handleFocusOrClick,
    onClick: handleFocusOrClick,
    onBlur: handleBlur
  })

  return {
    getItemProps,
    getRootProps,
    getInputProps,
    isOpen,
    highlightedIndex,
    setHighlightedIndex
  }
}

export default useSelect
