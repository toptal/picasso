import { useState, useEffect } from 'react'

interface Props {
  selectedIndexes: number[]
  indexes: number[]
  isOpen: boolean
}

const useHighlightedIndex = ({ selectedIndexes, isOpen, indexes }: Props) => {
  const [highlightedIndex, setHighlightedIndex] = useState<number | null>(
    indexes.length ? indexes[0] : null
  )

  useEffect(() => {
    if (!isOpen) {
      if (!indexes.length) {
        return
      }

      const nextHighlightedIndex =
        selectedIndexes.length === 1 ? selectedIndexes[0] : indexes[0]

      setHighlightedIndex(nextHighlightedIndex)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, selectedIndexes.length, selectedIndexes[0], indexes.length, indexes[0]])

  return [highlightedIndex, setHighlightedIndex] as [
    number | null,
    (value: number) => void
  ]
}

export default useHighlightedIndex
