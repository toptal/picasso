/* eslint-disable max-lines */
import { useCallback } from 'react'

import { Option, ValueType, UseSelectProps } from '../../../types'
import {
  isOptionInSelectedValues,
  EMPTY_INPUT_VALUE,
  toggleMultipleSelectValue,
  focusRef,
  fireOnChangeEvent
} from '../../../utils'

const useSelectHandler = <T extends ValueType, M extends boolean = false>({
  selectState: { emptySelectValue, setSelectedOptions, setFilterOptionsValue },
  selectProps: { multiple, value, options, name, onChange },
  selectRef
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

      setSelectedOptions(
        options.filter(option =>
          Array.isArray(newValue)
            ? isOptionInSelectedValues(option, newValue)
            : newValue === String(option.value)
        )
      )

      fireOnChangeEvent({ event, value: newValue, name, onChange })
      setFilterOptionsValue(EMPTY_INPUT_VALUE)

      focusRef(selectRef)
    },
    [
      name,
      onChange,
      options,
      emptySelectValue,
      setFilterOptionsValue,
      multiple,
      value,
      selectRef,
      setSelectedOptions
    ]
  )

export default useSelectHandler
