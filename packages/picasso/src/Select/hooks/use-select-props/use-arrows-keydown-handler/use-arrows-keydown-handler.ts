import { KeyboardEvent, useCallback } from 'react'

import { flattenOptions, getNextWrappingIndex } from '../../../utils'
import { ValueType, UseSelectProps } from '../../../types'

const useArrowsKeyDownHandler = <
  T extends ValueType,
  M extends boolean = false
>({
  selectState: {
    isOpen,
    highlightedIndex,
    filteredOptions,
    setHighlightedIndex,
    open
  }
}: UseSelectProps<T, M>) =>
  useCallback(
    (key: string, event: KeyboardEvent<HTMLInputElement>) => {
      event.preventDefault()

      if (isOpen) {
        const flatOptions = flattenOptions(filteredOptions)

        let nextIndex = -1
        let attempt = 0

        // Find next non-disabled option to highlight
        while (
          (nextIndex < 0 || flatOptions[nextIndex].disabled) &&
          // Breaks if all the options are disabled
          attempt < flatOptions.length
        ) {
          const moveAmount = key === 'ArrowDown' ? 1 + attempt : -(1 + attempt)

          nextIndex = getNextWrappingIndex(
            moveAmount,
            highlightedIndex,
            flatOptions.length
          )

          attempt++
        }

        setHighlightedIndex(nextIndex)
      } else {
        open()
      }
    },
    [isOpen, highlightedIndex, filteredOptions, setHighlightedIndex, open]
  )

export default useArrowsKeyDownHandler
