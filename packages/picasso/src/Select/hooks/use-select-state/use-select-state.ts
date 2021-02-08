import { useState, useCallback, useEffect, useMemo } from 'react'

import { Option, ValueType, UseSelectStateOutput } from '../../types'
import {
  getSelection,
  removeDuplicatedOptions,
  getSelectedOptions,
  DEFAULT_SEARCH_TRESHOLD
} from '../../utils'
import { isSubstring } from '../../../utils'
import useHighlightedIndex from '../use-highlighted-index'

export const EMPTY_INPUT_VALUE = ''

export interface Props {
  getDisplayValue: (option: Option | null) => string
  options: Option[]
  disabled?: boolean
  multiple?: boolean
  value?: ValueType | ValueType[]
  searchThreshold?: number
}

const useSelectState = (props: Props): UseSelectStateOutput => {
  const {
    getDisplayValue,
    options = [],
    disabled = false,
    multiple,
    value,
    searchThreshold = DEFAULT_SEARCH_TRESHOLD
  } = props

  const [selectedOptions, setSelectedOptions] = useState(
    getSelectedOptions(options, value)
  )
  const selection = useMemo(
    () =>
      getSelection(
        removeDuplicatedOptions([...options, ...selectedOptions]),
        value
      ),
    [options, selectedOptions, value]
  )
  const [displayValue, setDisplayValue] = useState(
    selection.display(getDisplayValue)
  )
  const [filterOptionsValue, setFilterOptionsValue] = useState(
    EMPTY_INPUT_VALUE
  )
  const filteredOptions = useMemo(
    () =>
      options.filter(option =>
        isSubstring(filterOptionsValue, getDisplayValue(option))
      ),
    [options, filterOptionsValue, getDisplayValue]
  )
  const selectedIndexes = useMemo(
    () =>
      options.reduce(
        (selected: number[], option: Option, index: number) =>
          selection.isOptionSelected(option) ? [...selected, index] : selected,
        []
      ),
    [options, selection]
  )
  const emptySelectValue: string | string[] = useMemo(
    () => (multiple ? [] : ''),
    [multiple]
  )
  const showSearch = options.length >= searchThreshold
  const [isOpen, setOpen] = useState<boolean>(false)
  const canOpen = !isOpen && !disabled
  const [highlightedIndex, setHighlightedIndex] = useHighlightedIndex({
    selectedIndexes,
    isOpen
  })

  useEffect(() => {
    const newSelect = getSelection(
      removeDuplicatedOptions([...options, ...selectedOptions]),
      value
    )

    setDisplayValue(newSelect.display(getDisplayValue))
    setSelectedOptions(getSelectedOptions(options, value))

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, options])

  const close = useCallback(() => {
    setOpen(false)
  }, [])
  const open = useCallback(() => {
    setOpen(true)
  }, [])

  return {
    ...props,
    setSelectedOptions,
    selectedOptions,
    filteredOptions,
    selectedIndexes,
    isOpen,
    canOpen,
    open,
    close,
    highlightedIndex,
    closeOnEnter: !multiple,
    setHighlightedIndex,
    showSearch,
    filterOptionsValue,
    displayValue,
    selection,
    emptySelectValue,
    setFilterOptionsValue,
    setDisplayValue
  }
}

export default useSelectState
