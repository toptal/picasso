import type { Ref } from 'react'
import React, { forwardRef } from 'react'
import type { StandardProps } from '@toptal/picasso-shared'
import { twMerge } from '@toptal/picasso-tailwind-merge'

import { getColorClass } from './styles'

const BASE_SIZE = 24

type ScaleType = 1 | 2 | 3 | 4
export interface Props extends StandardProps {
  scale?: ScaleType
  color?: string
  base?: number
  classes?: {
    root?: string
  }
}
const SvgCallMissed24 = forwardRef(function SvgCallMissed24(
  props: Props,
  ref: Ref<SVGSVGElement>
) {
  const {
    classes,
    className,
    style = {},
    color,
    scale,
    base,
    'data-testid': testId,
  } = props
  const scaledSize = base || BASE_SIZE * Math.ceil(scale || 1)
  const svgStyle = {
    minWidth: `${scaledSize}px`,
    minHeight: `${scaledSize}px`,
    ...style,
  }

  return (
    <svg
      fill='none'
      viewBox='0 0 24 24'
      className={twMerge(
        'fill-current inline-block text-inherit h-[1em] align-[-.125em]',
        classes?.root,
        className,
        getColorClass(color)
      )}
      style={svgStyle}
      ref={ref}
      data-testid={testId}
    >
      <path
        fillRule='evenodd'
        d='M17 1.5V2h3.3l-4.15 4.15L12 10.3 7.5 5.8 3 1.3l-.36.36-.36.36 4.86 4.86L12 11.74l4.5-4.5 4.5-4.5V6h1V1h-5v.5m-6.06 12.526c-3.017.142-5.946.773-8.611 1.856-.771.313-.962.431-1.389.858-.417.416-.608.721-.791 1.26l-.128.38-.013 1.656c-.012 1.57-.008 1.67.069 1.92.098.318.316.617.578.794.373.25.369.25 2.848.25 2.173 0 2.258-.003 2.521-.084.235-.073.31-.121.538-.35.43-.431.451-.514.47-1.816.015-1.059.016-1.07.101-1.09.048-.011.402-.065.787-.119a28.674 28.674 0 0 1 7.2-.118c.575.064 1.603.207 1.747.243.085.021.086.033.101 1.087.019 1.299.041 1.383.471 1.814.232.232.301.277.546.351.273.083.331.085 2.597.074 2.301-.012 2.319-.013 2.511-.101.416-.192.7-.513.833-.941.067-.213.074-.391.074-1.755 0-1.657-.02-1.858-.237-2.421-.232-.598-.794-1.248-1.345-1.556-.626-.351-2.617-1.051-3.958-1.392-2.473-.629-5.132-.912-7.52-.8m3.22 1.074a25.01 25.01 0 0 1 5.463 1.104c1.005.324 2.112.762 2.404.95.458.297.799.805.916 1.369.048.229.058.573.048 1.744l-.011 1.459-.15.138-.151.138-2.219-.011-2.218-.011-.111-.111-.111-.111-.02-1.467-.02-1.467-.58-.092c-2.416-.382-3.426-.469-5.4-.468-1.889.001-3.051.095-5.04.411l-.94.149L6 20.291l-.02 1.467-.111.111-.111.111-2.218.011-2.219.011-.151-.138-.15-.138-.011-1.459c-.01-1.185 0-1.514.049-1.753a2.161 2.161 0 0 1 .914-1.359c.484-.312 2.422-1.003 3.799-1.353a25.955 25.955 0 0 1 5.129-.777c.581-.032 2.587.015 3.26.075'
      />
    </svg>
  )
})

SvgCallMissed24.displayName = 'SvgCallMissed24'
export default SvgCallMissed24
