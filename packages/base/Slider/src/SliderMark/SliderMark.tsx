import React from 'react'
import { twJoin } from '@toptal/picasso-tailwind-merge'

import { getBgColor } from '../utils'

export type SliderMarkProps = {
  index: number
  markValue: number
  sliderValue?: number | number[]
  positionPercent: number
  forceInactive: boolean
}

const isMarkActive = (
  markValue: number,
  value?: number | number[]
): boolean => {
  if (Array.isArray(value)) {
    return markValue >= value[0] && markValue <= value[1]
  }

  if (typeof value === 'number') {
    return markValue <= value
  }

  return false
}

// We need custom Mark component because we have
// different bg color based on value of the Slider
const SliderMark = ({
  index,
  markValue,
  sliderValue,
  positionPercent,
  forceInactive,
}: SliderMarkProps) => {
  const markActive = isMarkActive(markValue, sliderValue)

  return (
    <span
      data-index={index}
      style={{ left: `${positionPercent}%` }}
      className={twJoin(
        'absolute w-[6px] h-[6px] rounded-[50%] border-[2px] top-[1.5px] border-solid border-white opacity-100 -translate-x-2/4 box-content',
        getBgColor({ markActive, forceInactive, value: sliderValue })
      )}
    />
  )
}

export default SliderMark
