import { useCallback } from 'react'

import type { ValueType, UseSelectProps } from '../../../types'
import type useSelectHandler from '../use-select-handler'

const useResetClickHandler = <T extends ValueType, M extends boolean = false>({
  selectState: { close },
  handleSelect,
}: UseSelectProps<T, M> & {
  handleSelect: ReturnType<typeof useSelectHandler>
}) =>
  useCallback(
    (event: React.MouseEvent<HTMLInputElement>) => {
      // keep select options closed
      event.stopPropagation()

      close()

      handleSelect(event, null)
    },
    [close, handleSelect]
  )

export default useResetClickHandler
