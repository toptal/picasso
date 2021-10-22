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

        let attempts = 0
        let nextIndex = highlightedIndex

        while (attempts < flatOptions.length) {
          const moveAmount = key === 'ArrowDown' ? 1 : -1

          nextIndex = getNextWrappingIndex(
            moveAmount,
            nextIndex,
            flatOptions.length
          )

          if (!flatOptions[nextIndex].disabled) {
            setHighlightedIndex(nextIndex)
            break
          }

          attempts += 1
        }
      } else {
        open()
      }
    },
    [isOpen, highlightedIndex, filteredOptions, setHighlightedIndex, open]
  )

export default useArrowsKeyDownHandler
