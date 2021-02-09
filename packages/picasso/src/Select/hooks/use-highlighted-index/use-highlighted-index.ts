import { useState, useEffect } from 'react'

interface Props {
  selectedIndexes: number[]
  isOpen: boolean
}

const useHighlightedIndex = ({ selectedIndexes, isOpen }: Props) => {
  const [highlightedIndex, setHighlightedIndex] = useState<number>(0)

  useEffect(() => {
    if (!isOpen) {
      const nextHighlightedIndex =
        selectedIndexes.length === 1 ? selectedIndexes[0] : 0

      setHighlightedIndex(nextHighlightedIndex)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, selectedIndexes.length, selectedIndexes[0]])

  return [highlightedIndex, setHighlightedIndex] as [
    number,
    (value: number) => void
  ]
}

export default useHighlightedIndex
