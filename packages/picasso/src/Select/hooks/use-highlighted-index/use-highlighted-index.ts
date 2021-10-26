import { useState, useEffect, useCallback, useMemo } from 'react'

import { Option, Selection } from '../../types'

interface Props {
  flatOptions: Option[]
  selection: Selection
  isOpen: boolean
}

const useHighlightedIndex = ({ flatOptions, isOpen, selection }: Props) => {
  const [highlightedIndex, setHighlightedIndex] = useState(0)

  const selectedIndicies = useMemo(
    () =>
      flatOptions.reduce(
        (acc, option, index) =>
          selection.isOptionSelected(option) ? [...acc, index] : acc,
        [] as number[]
      ),
    [selection, flatOptions]
  )

  const nonDisabledIndicies = useMemo(
    () =>
      flatOptions.reduce(
        (acc, option, index) => (!option.disabled ? [...acc, index] : acc),
        [] as number[]
      ),
    [flatOptions]
  )

  const handleChange = useCallback(
    (nextIndex: number) =>
      !flatOptions[nextIndex].disabled && setHighlightedIndex(nextIndex),
    [flatOptions]
  )

  // Reset index on close
  useEffect(() => {
    const nextHighlightedIndex =
      selectedIndicies.length === 1
        ? selectedIndicies[0]
        : nonDisabledIndicies[0]

    setHighlightedIndex(nextHighlightedIndex)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, flatOptions])

  return [highlightedIndex, handleChange] as const
}

export default useHighlightedIndex
