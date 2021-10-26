/* eslint-disable max-statements */
import { useState, useCallback, useEffect, useMemo } from 'react'

import {
  Option,
  OptionGroups,
  ValueType,
  UseSelectStateOutput
} from '../../types'
import {
  getMultipleSelection,
  getSingleSelection,
  getSelectedOptions,
  DEFAULT_SEARCH_THRESHOLD,
  DEFAULT_LIMIT,
  filterOptions,
  flattenOptions,
  limitOptions
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
  limit?: number
}

const useSelectState = (props: Props): UseSelectStateOutput => {
  const {
    getDisplayValue,
    options = [],
    disabled = false,
    multiple,
    value: valueProp,
    searchThreshold = DEFAULT_SEARCH_THRESHOLD,
    limit = DEFAULT_LIMIT
  } = props

  const flatOptions: Option[] = useMemo(() => flattenOptions(options), [
    options
  ])
  const [value, setValue] = useState(valueProp)
  const selectedOptions = useMemo(
    () => getSelectedOptions(flatOptions, value),
    [flatOptions, value]
  )
  const selection = useMemo(
    () =>
      multiple
        ? getMultipleSelection(selectedOptions)
        : getSingleSelection(selectedOptions[0]),
    [selectedOptions, multiple]
  )
  const displayValue = useMemo(() => selection.display(getDisplayValue), [
    selection,
    getDisplayValue
  ])
  const [filterOptionsValue, setFilterOptionsValue] = useState(
    EMPTY_INPUT_VALUE
  )
  const filteredOptions = useMemo(
    () =>
      filterOptions({
        options,
        filterOptionsValue,
        getDisplayValue
      }),
    [options, filterOptionsValue, getDisplayValue]
  )
  const filteredLimitedOptions = useMemo(
    () => limitOptions({ options: filteredOptions, limit }),
    [filteredOptions, limit]
  )
  const filteredLimitedFlatOptions = useMemo(
    () => flattenOptions(filteredLimitedOptions),
    [filteredLimitedOptions]
  )

  const emptySelectValue: string | string[] = useMemo(
    () => (multiple ? [] : ''),
    [multiple]
  )
  // Search should be shown when limit < searchThreshold
  // otherwise user might not be able to search through long list
  const showSearch = flatOptions.length >= Math.min(searchThreshold, limit)
  const [isOpen, setOpen] = useState<boolean>(false)
  const canOpen = !isOpen && !disabled
  const [highlightedIndex, setHighlightedIndex] = useHighlightedIndex({
    flatOptions: filteredLimitedFlatOptions,
    selection,
    isOpen
  })

  useEffect(() => {
    setValue(valueProp)
  }, [valueProp])

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
    setValue,
    selectedOptions,
    // TODO: keep consistent naming
    filteredOptions: filteredLimitedOptions,
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
    setFilterOptionsValue
  }
}

export default useSelectState
