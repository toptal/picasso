import { useCallback } from 'react'

import { ValueType, UseSelectProps } from '../../../types'
import { isRelatedTargetInsidePopper, focusRef } from '../../../utils'

const isRelatedTargetSearchIcon = (
  event: React.FocusEvent<HTMLInputElement>,
  searchOutlineRef?: React.RefObject<HTMLDivElement>
) => searchOutlineRef?.current?.contains(event.currentTarget as Node)

const useSearchBlurHandler = <T extends ValueType, M extends boolean = false>({
  selectRef,
  searchOutlineRef,
  popperRef,
  selectState: { close }
}: UseSelectProps<T, M>) =>
  useCallback(
    (event: React.FocusEvent<HTMLInputElement>) => {
      if (isRelatedTargetInsidePopper(event, popperRef)) {
        if (isRelatedTargetSearchIcon(event, searchOutlineRef)) {
          return
        }

        focusRef(selectRef)
      } else {
        close()
      }
    },
    [selectRef, popperRef, close, searchOutlineRef]
  )

export default useSearchBlurHandler
