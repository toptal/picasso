import React from 'react'
import { twJoin } from '@toptal/picasso-tailwind-merge'

import { getBgColor } from '../utils'

export type SliderMarkProps = {
  markActive: boolean
  value?: number | readonly number[]
  position: number
  dataIndex: number
  forceInactive: boolean
}

const SliderMark = ({
  markActive,
  value,
  position,
  dataIndex,
  forceInactive,
}: SliderMarkProps) => {
  return (
    <span
      data-index={dataIndex}
      style={{ left: `${position}%` }}
      className={twJoin(
        'absolute w-[6px] h-[6px] rounded-[50%] border-[2px] top-[1.5px] border-solid border-white opacity-100 -translate-x-2/4 box-content',
        getBgColor({ markActive, forceInactive, value })
      )}
    />
  )
}

export default SliderMark
