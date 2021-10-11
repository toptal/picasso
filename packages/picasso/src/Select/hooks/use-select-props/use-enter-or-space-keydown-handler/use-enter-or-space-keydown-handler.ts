import { KeyboardEvent, useCallback } from 'react'

import { ValueType, UseSelectProps } from '../../../types'
import flattenOptions from '../../../utils/flatten-options'
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
    closeOnEnter,
    close
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

      if (highlightedIndex === null) {
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
      close
    ]
  )

export default useEnterOrSpaceKeyDownHandler
