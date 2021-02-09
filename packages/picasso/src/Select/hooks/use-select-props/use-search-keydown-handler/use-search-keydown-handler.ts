import { KeyboardEvent, useCallback } from 'react'

import { ValueType, UseSelectProps } from '../../../types'
import { normalizeArrowKey, focusRef } from '../../../utils'
import useArrowsKeyDownHandler from '../use-arrows-keydown-handler'
import useEnterOrSpaceKeyDownHandler from '../use-enter-or-space-keydown-handler'
import useEscapeKeyDownHandler from '../use-escape-keydown-handler'

const useSearchKeyDownHandler = <
  T extends ValueType,
  M extends boolean = false
>({
  selectRef,
  selectProps: { onKeyDown },
  handleArrowsKeyDown,
  handleEnterOrSpaceKeyDown,
  handleEscapeKeyDown
}: UseSelectProps<T, M> & {
  handleArrowsKeyDown: ReturnType<typeof useArrowsKeyDownHandler>
  handleEnterOrSpaceKeyDown: ReturnType<typeof useEnterOrSpaceKeyDownHandler>
  handleEscapeKeyDown: ReturnType<typeof useEscapeKeyDownHandler>
}) =>
  // eslint-disable-next-line complexity
  useCallback(
    // eslint-disable-next-line complexity
    (event: KeyboardEvent<HTMLInputElement>) => {
      const key = normalizeArrowKey(event)

      if (key === 'Tab') {
        focusRef(selectRef)
        event.preventDefault()
      } else if (key === 'ArrowUp' || key === 'ArrowDown') {
        handleArrowsKeyDown(key, event)
      } else if (key === 'Enter') {
        handleEnterOrSpaceKeyDown(event)
      } else if (key === 'Escape') {
        handleEscapeKeyDown(event)
      }

      onKeyDown?.(event)
    },
    [
      selectRef,
      onKeyDown,
      handleArrowsKeyDown,
      handleEnterOrSpaceKeyDown,
      handleEscapeKeyDown
    ]
  )

export default useSearchKeyDownHandler
