import React from 'react'
import { twJoin } from 'tailwind-merge'

import { getBgColor } from '../utils'

export type SliderMarkProps = {
  markActive: boolean
  ownerState: { value: number }
  style: React.CSSProperties
  'data-index': number
}

// We need custom Mark component because we have
// different bg color based on value of the Slider
const SliderMark = ({
  markActive,
  ownerState,
  'data-index': dataIndex,
  style,
  hideTrack,
}: SliderMarkProps & { hideTrack: boolean }) => {
  return (
    <span
      data-index={dataIndex}
      style={style}
      className={twJoin(
        'absolute w-[6px] h-[6px] rounded-[50%] border-[2px] top-[1.5px] border-solid border-white opacity-100 -translate-x-2/4 box-content',
        getBgColor({ markActive, hideTrack, value: ownerState.value })
      )}
    />
  )
}

export default SliderMark
