import type { KeyboardEvent } from 'react'
import { useCallback } from 'react'

import { flattenOptions, getNextWrappingIndex } from '../../../utils'
import type { ValueType, UseSelectProps } from '../../../types'

const useArrowsKeyDownHandler = <
  T extends ValueType,
  M extends boolean = false
>({
  selectState: {
    isOpen,
    highlightedIndex,
    filteredOptions,
    setHighlightedIndex,
    open,
  },
}: UseSelectProps<T, M>) =>
  useCallback(
    (key: string, event: KeyboardEvent<HTMLInputElement>) => {
      event.preventDefault()

      if (isOpen) {
        // Use only non-disabled options
        const nonDisabledOptions = flattenOptions(filteredOptions)
          .map((option, actualIndex) => ({ ...option, actualIndex }))
          .filter(option => !option.disabled)

        // Find the non-disabled index for highlightedIndex
        const initialIndex = nonDisabledOptions.findIndex(
          option => option.actualIndex === highlightedIndex
        )
        const moveAmount = key === 'ArrowDown' ? 1 : -1
        // Find the next wrapping non-disabled index
        const nextNonDisabledIndex = getNextWrappingIndex(
          moveAmount,
          initialIndex,
          nonDisabledOptions.length
        )
        // Convert non-disabled index to the actual one
        const nextOption = nonDisabledOptions[nextNonDisabledIndex]

        if (nextOption != null) {
          setHighlightedIndex(nextOption.actualIndex)
        }
      } else {
        open()
      }
    },
    [isOpen, highlightedIndex, filteredOptions, setHighlightedIndex, open]
  )

export default useArrowsKeyDownHandler
