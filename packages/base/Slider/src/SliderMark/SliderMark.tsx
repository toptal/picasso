import React from 'react'
import { twJoin } from '@toptal/picasso-tailwind-merge'

import { getBgColor } from '../utils'

export type SliderMarkProps = {
  markActive: boolean
  /** The current value of the slider, used to decide whether active marks are highlighted */
  value?: number | number[]
  style: React.CSSProperties
  'data-index': number
  forceInactive?: boolean
}

// We need custom Mark component because we have
// different bg color based on value of the Slider
const SliderMark = ({
  markActive,
  value,
  'data-index': dataIndex,
  style,
  forceInactive,
}: SliderMarkProps) => {
  return (
    <span
      data-index={dataIndex}
      style={style}
      className={twJoin(
        'absolute w-[6px] h-[6px] rounded-[50%] border-[2px] top-1/2 border-solid border-white opacity-100 -translate-x-2/4 -translate-y-2/4 box-content',
        getBgColor({ markActive, forceInactive, value })
      )}
    />
  )
}

export default SliderMark
