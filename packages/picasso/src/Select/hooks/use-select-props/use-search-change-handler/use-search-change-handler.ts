import { useCallback, ChangeEvent } from 'react'

import { ValueType, UseSelectProps } from '../../../types'

const useSearchChangeHandler = <
  T extends ValueType,
  M extends boolean = false
>({
  selectState: { setFilterOptionsValue }
}: UseSelectProps<T, M>) =>
  useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setFilterOptionsValue(event.target.value)
    },
    [setFilterOptionsValue]
  )

export default useSearchChangeHandler
