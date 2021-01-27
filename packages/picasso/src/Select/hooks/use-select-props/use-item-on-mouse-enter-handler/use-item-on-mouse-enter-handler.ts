import { useCallback } from 'react'

import { UseSelectProps, ValueType } from '../../../types'

const useItemOnMouseEnterHandler = <
  T extends ValueType,
  M extends boolean = false
>({
  selectState: { highlightedIndex, setHighlightedIndex }
}: UseSelectProps<T, M>) =>
  useCallback(
    (index: number) => {
      if (index === highlightedIndex) {
        return
      }

      setHighlightedIndex(index)
    },
    [highlightedIndex, setHighlightedIndex]
  )

export default useItemOnMouseEnterHandler
