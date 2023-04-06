import type { KeyboardEvent } from 'react'
import { useCallback } from 'react'

import type { ValueType, UseSelectProps } from '../../../types'
import flattenOptions from '../../../utils/flatten-options'
import type useSelectHandler from '../use-select-handler'

const useEnterOrSpaceKeyDownHandler = <
  T extends ValueType,
  M extends boolean = false
>({
  selectState: {
    canOpen,
    open,
    filteredOptions,
    highlightedIndex,
    closeOnEnter,
    close,
  },
  handleSelect,
}: UseSelectProps<T, M> & {
  handleSelect: ReturnType<typeof useSelectHandler>
}) =>
  useCallback(
    (event: KeyboardEvent<HTMLInputElement>) => {
      event.preventDefault()

      if (canOpen) {
        open()

        return
      }

      const item = flattenOptions(filteredOptions)[highlightedIndex]

      if (!item) {
        return
      }

      if (closeOnEnter) {
        close()
      }

      handleSelect(event, item)
    },
    [
      canOpen,
      filteredOptions,
      highlightedIndex,
      closeOnEnter,
      handleSelect,
      open,
      close,
    ]
  )

export default useEnterOrSpaceKeyDownHandler
