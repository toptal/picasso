import type { RefObject } from 'react'
import { useCallback, useEffect, useState } from 'react'

import { checkOverlap } from '../../utils'

export const useLabelOverlap = ({ value }: { value?: number | number[] }) => {
  const [isPartiallyOverlapped, setIsPartiallyOverlapped] = useState(false)
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
      setIsPartiallyOverlapped(false)
    } else {
      if (!(valueLabels[0]?.current && valueLabels[1]?.current)) {
        return
      }

      setIsPartiallyOverlapped(
        checkOverlap({
          firstLabelRect: valueLabels[0].current.getBoundingClientRect(),
          secondLabelRect: valueLabels[1].current.getBoundingClientRect(),
          previousResult: isPartiallyOverlapped,
        })
      )
    }
  }, [value, isRangeSlider, isPartiallyOverlapped, valueLabels])

  const handleValueLabelOnRender = useCallback(
    (index: number, labelRef: RefObject<HTMLSpanElement>) => {
      setValueLabels(valLabels => {
        valLabels[index] = labelRef

        return valLabels
      })
    },
    [setValueLabels]
  )

  return { isPartiallyOverlapped, handleValueLabelOnRender }
}
