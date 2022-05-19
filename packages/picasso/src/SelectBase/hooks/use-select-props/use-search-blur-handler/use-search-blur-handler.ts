import { useCallback } from 'react'

import { ValueType, UseSelectProps } from '../../../types'
import { isRelatedTargetInsidePopper, focusRef } from '../../../utils'

const useSearchBlurHandler = <T extends ValueType, M extends boolean = false>({
  selectRef,
  popperRef,
  selectState: { close }
}: UseSelectProps<T, M>) =>
  useCallback(
    (event: React.FocusEvent<HTMLInputElement>) => {
      if (isRelatedTargetInsidePopper(event, popperRef)) {
        focusRef(selectRef)
      } else {
        close()
      }
    },
    [selectRef, popperRef, close]
  )

export default useSearchBlurHandler
