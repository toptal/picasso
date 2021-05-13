import { useCallback } from 'react'

import { ValueType, UseSelectProps } from '../../../types'
import { isRelatedTargetInsidePopper, EMPTY_INPUT_VALUE } from '../../../utils'

const useBlurHandler = <T extends ValueType, M extends boolean = false>({
  popperRef,
  selectState: { close, setFilterOptionsValue },
  selectProps: { onBlur }
}: UseSelectProps<T, M>) =>
  useCallback(
    (event: React.FocusEvent<HTMLInputElement>) => {
      setFilterOptionsValue(EMPTY_INPUT_VALUE)

      if (!isRelatedTargetInsidePopper(event, popperRef)) {
        close()
      }

      onBlur?.(event)
    },
    [close, onBlur, setFilterOptionsValue, popperRef]
  )

export default useBlurHandler
