/* eslint-disable max-lines */
import { useCallback } from 'react'

import type { Option, ValueType, UseSelectProps } from '../../../types'
import {
  EMPTY_INPUT_VALUE,
  toggleMultipleSelectValue,
  fireOnChangeEvent,
} from '../../../utils'

const useSelectHandler = <T extends ValueType, M extends boolean = false>({
  selectState: { emptySelectValue, setFilterOptionsValue },
  selectProps: { multiple, value, name, onChange },
}: UseSelectProps<T, M>) =>
  useCallback(
    (event: React.SyntheticEvent, option: Option | null) => {
      let newValue: ValueType | ValueType[]

      if (option === null) {
        newValue = emptySelectValue
      } else if (multiple) {
        newValue = toggleMultipleSelectValue(
          (value ?? []) as ValueType[],
          option
        )
      } else {
        newValue = option.value
      }

      fireOnChangeEvent({ event, value: newValue, name, onChange })
      if (!multiple) {
        setFilterOptionsValue(EMPTY_INPUT_VALUE)
      }
    },
    [name, onChange, emptySelectValue, setFilterOptionsValue, multiple, value]
  )

export default useSelectHandler
