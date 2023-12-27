import type { KeyboardEvent } from 'react'
import { useCallback } from 'react'

import type { ValueType, UseSelectProps } from '../../../types'
import { normalizeArrowKey, focusRef } from '../../../utils'
import type useArrowsKeyDownHandler from '../use-arrows-keydown-handler'
import type useEnterOrSpaceKeyDownHandler from '../use-enter-or-space-keydown-handler'
import type useEscapeKeyDownHandler from '../use-escape-keydown-handler'

const useSelectKeyDownHandler = <
  T extends ValueType,
  M extends boolean = false
>({
  selectProps: { onKeyDown, native },
  searchInputRef,
  selectState: { isOpen, showSearch },
  handleArrowsKeyDown,
  handleEnterOrSpaceKeyDown,
  handleEscapeKeyDown,
}: UseSelectProps<T, M> & {
  handleArrowsKeyDown: ReturnType<typeof useArrowsKeyDownHandler>
  handleEnterOrSpaceKeyDown: ReturnType<typeof useEnterOrSpaceKeyDownHandler>
  handleEscapeKeyDown: ReturnType<typeof useEscapeKeyDownHandler>
}) =>
  // eslint-disable-next-line complexity
  useCallback(
    // eslint-disable-next-line complexity
    (event: KeyboardEvent<HTMLInputElement>) => {
      if (native) {
        onKeyDown?.(event)

        // for the native select we don't want to prevent defaults for the event
        // and don't need any manual operations for keydown event
        return
      }

      const key = normalizeArrowKey(event)
      const isCharacterKey = key.length === 1

      if (key === 'ArrowUp' || key === 'ArrowDown') {
        handleArrowsKeyDown(key, event)
      } else if (key === 'Enter' || key === ' ') {
        handleEnterOrSpaceKeyDown(event)
      } else if (key === 'Escape') {
        handleEscapeKeyDown(event)
      } else if (key === 'Tab' && isOpen && showSearch) {
        event.preventDefault()
        focusRef(searchInputRef)
      } else if (isCharacterKey || key === 'Backspace') {
        focusRef(searchInputRef)
      }

      onKeyDown?.(event)
    },
    [
      native,
      onKeyDown,
      searchInputRef,
      isOpen,
      showSearch,
      handleArrowsKeyDown,
      handleEnterOrSpaceKeyDown,
      handleEscapeKeyDown,
    ]
  )

export default useSelectKeyDownHandler
