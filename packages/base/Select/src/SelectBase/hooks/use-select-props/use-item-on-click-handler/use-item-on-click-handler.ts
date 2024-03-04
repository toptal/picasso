import { useCallback } from 'react'

import type { Option, UseSelectProps, ValueType } from '../../../types'
import type useSelectHandler from '../use-select-handler'
import { focusRef } from '../../../utils'

const useItemOnClick = <T extends ValueType, M extends boolean = false>({
  selectState: { close },
  selectProps: { multiple },
  handleSelect,
  selectRef,
}: UseSelectProps<T, M> & {
  handleSelect: ReturnType<typeof useSelectHandler>
}) =>
  useCallback(
    (event: React.MouseEvent, item: Option) => {
      if (!multiple) {
        close()
        focusRef(selectRef)
      }

      handleSelect(event, item)
    },
    [close, handleSelect, multiple, selectRef]
  )

export default useItemOnClick
