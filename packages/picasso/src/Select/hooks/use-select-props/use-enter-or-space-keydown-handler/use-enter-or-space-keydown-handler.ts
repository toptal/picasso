import { KeyboardEvent, useCallback } from 'react'

import { ValueType, UseSelectProps } from '../../../types'
import useSelectHandler from '../use-select-handler'

const useEnterOrSpaceKeyDownHandler = <
  T extends ValueType,
  M extends boolean = false
>({
  selectState: {
    canOpen,
    open,
    filteredOptions,
    highlightedIndex,
    closeOnEnter
  },
  handleSelect
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

      const item = filteredOptions[highlightedIndex]

      if (item == null) {
        return
      }

      if (closeOnEnter) {
        close()
      }

      handleSelect(event, item)
    },
    [
      canOpen,
      open,
      filteredOptions,
      highlightedIndex,
      closeOnEnter,
      handleSelect
    ]
  )

export default useEnterOrSpaceKeyDownHandler
