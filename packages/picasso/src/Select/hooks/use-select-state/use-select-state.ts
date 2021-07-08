import { useState, useCallback, useEffect, useMemo } from 'react'

import {
  Option,
  OptionGroups,
  ValueType,
  UseSelectStateOutput
} from '../../types'
import {
  getSelection,
  removeDuplicatedOptions,
  getSelectedOptions,
  DEFAULT_SEARCH_THRESHOLD,
  filterOptions,
  flattenOptions
} from '../../utils'
import useHighlightedIndex from '../use-highlighted-index'

export const EMPTY_INPUT_VALUE = ''

export interface Props {
  getDisplayValue: (option: Option | null) => string
  options: Option[] | OptionGroups
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
    searchThreshold = DEFAULT_SEARCH_THRESHOLD
  } = props

  const flatOptions: Option[] = useMemo(() => flattenOptions(options), [
    options
  ])

  const [selectedOptions, setSelectedOptions] = useState(
    getSelectedOptions(options, value)
  )
  const selection = useMemo(
    () =>
      getSelection(
        removeDuplicatedOptions([...flatOptions, ...selectedOptions]),
        value
      ),
    [flatOptions, selectedOptions, value]
  )
  const [displayValue, setDisplayValue] = useState(
    selection.display(getDisplayValue)
  )
  const [filterOptionsValue, setFilterOptionsValue] = useState(
    EMPTY_INPUT_VALUE
  )
  const filteredOptions = useMemo(
    () => filterOptions({ options, filterOptionsValue, getDisplayValue }),
    [options, filterOptionsValue, getDisplayValue]
  )
  const selectedIndexes = useMemo(
    () =>
      flatOptions.reduce(
        (selected: number[], option: Option, index: number) =>
          selection.isOptionSelected(option) ? [...selected, index] : selected,
        []
      ),
    [flatOptions, selection]
  )
  const emptySelectValue: string | string[] = useMemo(
    () => (multiple ? [] : ''),
    [multiple]
  )
  const showSearch = flatOptions.length >= searchThreshold
  const [isOpen, setOpen] = useState<boolean>(false)
  const canOpen = !isOpen && !disabled
  const [highlightedIndex, setHighlightedIndex] = useHighlightedIndex({
    selectedIndexes,
    isOpen
  })

  useEffect(() => {
    const newSelect = getSelection(
      removeDuplicatedOptions([...flatOptions, ...selectedOptions]),
      value
    )

    setDisplayValue(newSelect.display(getDisplayValue))
    setSelectedOptions(getSelectedOptions(options, value))

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, options, flatOptions])

  const close = useCallback(() => {
    setOpen(false)
  }, [])
  const open = useCallback(() => {
    setOpen(true)
  }, [])

  useEffect(() => {
    // we have to close menu if select has became disabled
    if (disabled && isOpen) {
      close()
    }
  }, [disabled, isOpen, close])

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
