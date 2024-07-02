import type { SliderValueLabelSlotProps } from '@mui/base/Slider'
import type { RefObject } from 'react'
import React, { useEffect, useRef, useState } from 'react'
import { twJoin } from '@toptal/picasso-tailwind-merge'

import { getXPlacement } from '../utils'

type ValueLabelDisplay = 'on' | 'auto' | 'off'

const classesByTooltip: Record<ValueLabelDisplay, string> = {
  off: 'hidden',
  // We need to use visibility: hidden instead of display: none to keep the
  // label visible for javascript calculations.
  auto: 'invisible group-hover/thumb:visible flex justify-center items-center',
  on: 'flex justify-center items-center',
}

const xPlacementClasses = {
  left: 'right-[calc(100%-13px)]',
  right: 'left-[calc(100%-13px)]',
  center: '',
} as const

const yPlacementClasses = {
  bottom: 'top-[calc(100%+2px)]',
  top: 'bottom-[calc(100%+2px)]',
} as const

const SliderValueLabel = ({
  children,
  index = -1,
  tooltip = 'off',
  onRender,
  yPlacement,
  isOverlaped,
  ownerState: { value },
}: SliderValueLabelSlotProps & {
  tooltip: ValueLabelDisplay
  yPlacement: 'top' | 'bottom'
  /** indicates if there are two SliderValueLabels that overlap each other */
  isOverlaped: boolean
  onRender: (index: number, ref: RefObject<HTMLSpanElement>) => void
}) => {
  const ref = useRef<HTMLSpanElement>(null)

  // we need to change the placement of the label if it is overlaped
  // or if it is out of the viewport
  const [xPlacement, setXPlacement] = useState<'left' | 'right' | 'center'>(
    'center'
  )

  useEffect(() => {
    onRender(index, ref)
  }, [index, onRender])

  useEffect(() => {
    if (!ref.current) {
      return
    }

    setXPlacement(
      getXPlacement({
        rect: ref.current.getBoundingClientRect(),
        isOverlaped: isOverlaped,
        isFirstLabel: index === 0,
        currentPlacement: xPlacement,
      })
    )
    // we need to recalculate on value change to get new rect
  }, [isOverlaped, index, xPlacement, value])

  return (
    <span
      ref={ref}
      className={twJoin(
        'absolute will-change-transform transition-transform',
        classesByTooltip[tooltip],
        yPlacementClasses[yPlacement],
        xPlacementClasses[xPlacement]
      )}
    >
      <span
        className={twJoin(
          'shadow-4 text-sm text-white bg-graphite-800',
          'm-1 rounded-sm py-[2px] px-2 max-w-[300px] break-words'
        )}
      >
        {children}
      </span>
    </span>
  )
}

export default SliderValueLabel
