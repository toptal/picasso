import { useState, useEffect, useCallback } from 'react'

import { flattenOptions } from '../../utils'
import { Option, OptionGroups, Selection } from '../../types'

interface Props {
  options: Option[] | OptionGroups
  selection: Selection
  isOpen: boolean
}

const useHighlightedIndex = ({ options, isOpen, selection }: Props) => {
  const [highlightedIndex, setHighlightedIndex] = useState(0)
  const flatOptions = flattenOptions(options)

  const handleChange = (nextIndex: number) =>
    !flatOptions[nextIndex].disabled && setHighlightedIndex(nextIndex)

  const calculateHighlightedIndex = useCallback(() => {
    const selectedIndicies = flatOptions.reduce(
      (acc, option, index) =>
        selection.isOptionSelected(option) ? [...acc, index] : acc,
      [] as number[]
    )

    const nonDisabledIndicies = flatOptions.reduce(
      (acc, option, index) => (!option.disabled ? [...acc, index] : acc),
      [] as number[]
    )

    const nextHighlightedIndex =
      selectedIndicies.length === 1
        ? selectedIndicies[0]
        : nonDisabledIndicies[0]

    setHighlightedIndex(nextHighlightedIndex)
  }, [selection, flatOptions])

  // Reset index on close and filtering
  useEffect(() => {
    calculateHighlightedIndex()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, flatOptions.length])

  return [highlightedIndex, handleChange] as const
}

export default useHighlightedIndex
