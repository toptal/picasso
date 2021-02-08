import { useCallback, ChangeEvent } from 'react'

import { ValueType, UseSelectProps } from '../../../types'

const useSearchChangeHandler = <
  T extends ValueType,
  M extends boolean = false
>({
  selectState: { setFilterOptionsValue },
  selectProps: { onSearchChange }
}: UseSelectProps<T, M>) =>
  useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      onSearchChange?.(event.target.value)
      setFilterOptionsValue(event.target.value)
    },
    [onSearchChange, setFilterOptionsValue]
  )

export default useSearchChangeHandler
