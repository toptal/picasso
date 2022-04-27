import { useCallback } from 'react'

import { ValueType, UseSelectProps } from '../../../types'
import { isRelatedTargetInsidePopper, focusRef } from '../../../utils'

const isCurrentTargetInsideSearchWrapper = (
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
        // we check click on icon, but icon has pointer-events none, so we click on the wrapper
        if (isCurrentTargetInsideSearchWrapper(event, searchOutlineRef)) {
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
