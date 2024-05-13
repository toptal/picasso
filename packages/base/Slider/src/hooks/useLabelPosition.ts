import { useEffect, useState } from 'react'

type Props = {
  ref: React.RefObject<HTMLSpanElement>
  doRangeLabelsOverflow: boolean
  sliderValue?: number | readonly number[]
  index: number
}

export const positionClasses = {
  left: 'right-[calc(100%-13px)]',
  right: 'left-[calc(100%-13px)]',
  center: '',
} as const

//  []       []         []
//   left  center  right
export const useLabelPosition = ({
  ref,
  doRangeLabelsOverflow,
  sliderValue,
  index,
}: Props) => {
  const [position, setPosition] = useState<'left' | 'right' | 'center'>(
    'center'
  )

  useEffect(() => {
    if (!ref.current) {
      return
    }

    const rect = ref.current.getBoundingClientRect()
    const halfWidth = rect.width / 2
    const leftBoundary =
      position === 'right' ? rect.left - halfWidth : rect.left
    const rightBoundary =
      position === 'left' ? rect.right + halfWidth : rect.right

    if (leftBoundary < 16) {
      setPosition('right')
    } else if (rightBoundary > window.innerWidth - 16) {
      setPosition('left')
    } else if (doRangeLabelsOverflow) {
      setPosition(index === 0 ? 'left' : 'right')
    } else {
      setPosition('center')
    }
  }, [sliderValue, doRangeLabelsOverflow, position, setPosition, index, ref])

  return positionClasses[position]
}
