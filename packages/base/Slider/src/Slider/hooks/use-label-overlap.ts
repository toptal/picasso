import type { RefObject } from 'react'
import { useCallback, useEffect, useState } from 'react'

import { checkOverlap } from '../../utils'

export const useLabelOverlap = ({ value }: { value?: number | number[] }) => {
  const [isPartiallyOverlaped, setIsPartiallyOverlaped] = useState(false)
  const [valueLabels, setValueLabels] = useState<RefObject<HTMLSpanElement>[]>(
    []
  )
  const isRangeSlider = Array.isArray(value)

  useEffect(() => {
    if (!isRangeSlider) {
      return
    }
    const isFullyOverlaped = value[0] === value[1]

    if (isFullyOverlaped) {
      setIsPartiallyOverlaped(false)
    } else {
      if (!(valueLabels[0]?.current && valueLabels[1]?.current)) {
        return
      }

      setIsPartiallyOverlaped(
        checkOverlap({
          firstLabelRect: valueLabels[0].current.getBoundingClientRect(),
          secondLabelRect: valueLabels[1].current.getBoundingClientRect(),
          isPartiallyOverlaped,
        })
      )
    }
  }, [value, isRangeSlider, isPartiallyOverlaped, valueLabels])

  const handleValueLabelOnRender = useCallback(
    (index: number, labelRef: RefObject<HTMLSpanElement>) => {
      setValueLabels(prev => {
        const next = [...prev]

        next[index] = labelRef

        return next
      })
    },
    [setValueLabels]
  )

  return { isPartiallyOverlaped, handleValueLabelOnRender }
}
