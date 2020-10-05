import {
  KeyboardEvent,
  useState,
  ChangeEvent,
  useCallback,
  HTMLAttributes,
  useEffect
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
  value: string
  options?: Option[]
  enableAutofill?: boolean
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
}

type GetInputProps = ({
  canCloseOnEnter
}: {
  canCloseOnEnter: boolean
}) => Partial<
  HTMLAttributes<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
>

type GetRootProps = () => {
  onFocus: FocusEventType
  onClick: (event: React.MouseEvent<HTMLInputElement>) => void
  onBlur: FocusEventType
}

interface UseSelectOutput {
  getItemProps: (index: number, item: Option) => ItemProps
  getRootProps: GetRootProps
  getInputProps: GetInputProps
  isOpen: boolean
  highlightedIndex: number
  setHighlightedIndex: (index: number) => void
}

const useSelect = ({
  value,
  options = [],
  selectedIndexes = [],
  disabled = false,
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

  const onMouseDown = useCallback((event: React.MouseEvent) => {
    // This prevents the activeElement from being changed
    // to the item so it can remain with the current activeElement
    // which is a more common use case.
    event.preventDefault()
  }, [])

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
    onMouseDown,
    close,
    onClick: (event: React.MouseEvent) => {
      setOpen(false)
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

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    setOpen(false)
    onBlur(event)
  }

  const getInputProps = ({
    canCloseOnEnter
  }: {
    canCloseOnEnter: boolean
  }) => ({
    'aria-autocomplete': 'list' as React.AriaAttributes['aria-autocomplete'],
    onChange: (
      event: ChangeEvent<
        HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement
      >
    ) => {
      setOpen(true)
      onChange(event.target.value)
    },

    // eslint-disable-next-line max-statements, complexity
    onKeyDown: (event: KeyboardEvent<HTMLInputElement>) => {
      const key = normalizeArrowKey(event)

      if (key === 'Tab') {
        event.currentTarget.blur()
      }

      if (key === 'ArrowUp' || key === 'ArrowDown') {
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

      if (key === 'Backspace') {
        if (value !== EMPTY_INPUT_VALUE) {
          return
        }

        setOpen(false)
      }

      if (key === 'Enter') {
        if (!isOpen) {
          setOpen(true)

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
        handleSelect(event, item)
      }

      if (key === 'Escape') {
        event.preventDefault()

        setOpen(false)
      }

      onKeyDown(event, value)
    },
    onResetClick: (event: React.MouseEvent<HTMLInputElement>) => {
      // keep select options closed
      event.stopPropagation()

      setOpen(false)
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
