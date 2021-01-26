import { getNextWrappingIndex } from '@toptal/picasso/Select/utils'
import { KeyboardEvent, useCallback } from 'react'

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
        setHighlightedIndex(
          getNextWrappingIndex(
            key === 'ArrowDown' ? 1 : -1,
            highlightedIndex,
            filteredOptions.length
          )
        )
      } else {
        open()
      }
    },
    [isOpen, highlightedIndex, filteredOptions, setHighlightedIndex, open]
  )

export default useArrowsKeyDownHandler
