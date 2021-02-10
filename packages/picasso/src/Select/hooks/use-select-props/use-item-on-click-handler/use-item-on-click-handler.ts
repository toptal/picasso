import { useCallback } from 'react'

import { UseSelectProps, ValueType, Option } from '../../../types'
import useSelectHandler from '../use-select-handler'

const useItemOnClick = <T extends ValueType, M extends boolean = false>({
  selectState: { close },
  selectProps: { multiple },
  handleSelect
}: UseSelectProps<T, M> & {
  handleSelect: ReturnType<typeof useSelectHandler>
}) =>
  useCallback(
    (event: React.MouseEvent, item: Option) => {
      if (!multiple) {
        close()
      }

      handleSelect(event, item)
    },
    [close, handleSelect, multiple]
  )

export default useItemOnClick
