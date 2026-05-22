import type { ReactNode, RefObject } from 'react'
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

export type SliderValueLabelProps = {
  children: ReactNode
  index: number
  value: number
  tooltip: ValueLabelDisplay
  yPlacement: 'top' | 'bottom'
  /** indicates if there are two SliderValueLabels that overlap each other */
  isOverlaped: boolean
  onRender: (index: number, ref: RefObject<HTMLSpanElement>) => void
}

const SliderValueLabel = ({
  children,
  index,
  value,
  tooltip,
  onRender,
  yPlacement,
  isOverlaped,
}: SliderValueLabelProps) => {
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

    const rect = ref.current.getBoundingClientRect()

    // Skip when label is not yet laid out (tooltip='off' applies display:none on
    // first render). A 0×0 rect would otherwise return leftBoundary < gap and
    // stick the label at xPlacement='right' before the tooltip becomes visible,
    // racing the parent's overlap detection on `tooltip='on'`.
    if (rect.width === 0 && rect.height === 0) {
      return
    }

    setXPlacement(
      getXPlacement({
        rect,
        isOverlaped: isOverlaped,
        isFirstLabel: index === 0,
        currentPlacement: xPlacement,
      })
    )
    // we need to recalculate on value change to get new rect
  }, [isOverlaped, index, xPlacement, value, tooltip])

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
