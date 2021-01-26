import { useCallback } from 'react'

import { ValueType, UseSelectProps } from '../../../types'
import {
  isEmpty,
  fireOnChangeEvent,
  removeDuplicatedOptions,
  getSelection,
  isRelatedTargetInsidePopper,
  EMPTY_INPUT_VALUE
} from '../../../utils'

const useSelectBlurHandler = <T extends ValueType, M extends boolean = false>({
  popperRef,
  selectState: {
    close,
    displayValue,
    setDisplayValue,
    selectedOptions,
    setFilterOptionsValue
  },
  selectProps: {
    value,
    multiple,
    options,
    onBlur,
    name,
    onChange,
    getDisplayValue
  }
}: UseSelectProps<T, M>) =>
  useCallback(
    (event: React.FocusEvent<HTMLInputElement>) => {
      if (!multiple) {
        const hasValue = displayValue !== EMPTY_INPUT_VALUE
        const isInputCleaned = !hasValue && !isEmpty(value)

        if (isInputCleaned) {
          fireOnChangeEvent({ event, value: EMPTY_INPUT_VALUE, name, onChange })
          setDisplayValue(EMPTY_INPUT_VALUE)
        } else {
          const select = getSelection(
            removeDuplicatedOptions([...options, ...selectedOptions]),
            value
          )

          setDisplayValue(select.display(getDisplayValue!))
        }
      }

      setFilterOptionsValue(EMPTY_INPUT_VALUE)

      if (!isRelatedTargetInsidePopper(event, popperRef)) {
        close()
      }

      onBlur?.(event)
    },
    [
      name,
      onChange,
      onBlur,
      popperRef,
      close,
      displayValue,
      multiple,
      value,
      setDisplayValue,
      selectedOptions,
      options,
      getDisplayValue,
      setFilterOptionsValue
    ]
  )

export default useSelectBlurHandler
