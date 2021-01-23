import { useState, useCallback, useEffect, useMemo } from 'react'

import { Option, ValueType } from '../types'
import {
  Selection,
  getSelection,
  removeDuplicatedOptions,
  getSelectedOptions
} from './utils'
import { isSubstring } from '../../utils'

export const EMPTY_INPUT_VALUE = ''

interface Props {
  getDisplayValue?: (option: Option | null) => string
  options: Option[]
  disabled?: boolean
  multiple?: boolean
  value?: ValueType | ValueType[]
  searchThreshold?: number
}

export type UseSelectStateOutput = {
  selectedIndexes: number[]
  isOpen: boolean
  canOpen: boolean
  open: () => void
  close: () => void
  highlightedIndex: number
  closeOnEnter: boolean
  setHighlightedIndex: (index: number) => void
  setFilterOptionsValue: (value: string) => void
  showSearch: boolean
  filterOptionsValue: string
  displayValue: string
  setDisplayValue: (value: string) => void
  selection: Selection
  filteredOptions: Option[]
  emptySelectValue: string | string[]
  selectedOptions: Option<ValueType>[]
  setSelectedOptions: (options: Option<ValueType>[]) => void
}

const useSelectState = (props: Props): UseSelectStateOutput => {
  const {
    getDisplayValue,
    options = [],
    disabled = false,
    multiple,
    value,
    searchThreshold = 0
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
    selection.display(getDisplayValue!)
  )
  const [filterOptionsValue, setFilterOptionsValue] = useState(
    EMPTY_INPUT_VALUE
  )
  const filteredOptions = useMemo(
    () =>
      options.filter(option =>
        isSubstring(filterOptionsValue, getDisplayValue!(option))
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
  const showSearch = options.length >= searchThreshold!
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

    setDisplayValue(newSelect.display(getDisplayValue!))
    setSelectedOptions(getSelectedOptions(options, value))

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, options, getDisplayValue])

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

const useHighlightedIndex = ({
  selectedIndexes,
  isOpen
}: Pick<UseSelectStateOutput, 'selectedIndexes' | 'isOpen'>) => {
  const [highlightedIndex, setHighlightedIndex] = useState<number>(0)

  useEffect(() => {
    if (!isOpen) {
      setHighlightedIndex(selectedIndexes.length === 1 ? selectedIndexes[0] : 0)
    }
  }, [isOpen, selectedIndexes])

  return [highlightedIndex, setHighlightedIndex] as [
    number,
    (value: number) => void
  ]
}

export default useSelectState
