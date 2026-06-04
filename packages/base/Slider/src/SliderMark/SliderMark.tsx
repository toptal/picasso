import React from 'react'
import { twJoin } from '@toptal/picasso-tailwind-merge'

import { getBgColor } from '../utils'

export type SliderMarkProps = {
  markActive: boolean
  value?: number
  style: React.CSSProperties
  'data-index': number
  forceInactive: boolean
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
        // Centered on the track line via top-1/2 + -translate-y, independent of
        // the parent height (the mark now nests inside Slider.Track, h-[1px]).
        'absolute w-[9px] h-[9px] top-1/2 rounded-[50%] -translate-x-2/4 -translate-y-2/4 box-content',
        getBgColor({ markActive, forceInactive, value })
      )}
    />
  )
}

export default SliderMark
