import { useCallback } from 'react'

import { UseSelectProps, ValueType, Option } from '../../../types'
import useSelectHandler from '../use-select-handler'

const useItemOnClick = <T extends ValueType, M extends boolean = false>({
  selectState: { close },
  handleSelect
}: UseSelectProps<T, M> & {
  handleSelect: ReturnType<typeof useSelectHandler>
}) =>
  useCallback(
    (event: React.MouseEvent, item: Option) => {
      close()

      handleSelect(event, item)
    },
    [close, handleSelect]
  )

export default useItemOnClick
