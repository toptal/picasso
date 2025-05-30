import type { Ref } from 'react'
import React, { forwardRef } from 'react'
import type { StandardProps } from '@toptal/picasso-shared'
import { twMerge } from '@toptal/picasso-tailwind-merge'

import { getColorClass } from './styles'

const BASE_SIZE = 16

type ScaleType = 1 | 2 | 3 | 4
export interface Props extends StandardProps {
  scale?: ScaleType
  color?: string
  base?: number
  classes?: {
    root?: string
  }
}
const SvgServices16 = forwardRef(function SvgServices16(
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
      viewBox='0 0 16 16'
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
      <path d='M10 0c.88 0 1.717.19 2.47.53L9 4l.5 2.5L12 7l3.47-3.469a6 6 0 0 1-7.212 8.212L4 16l-4-4 4.257-4.256A6 6 0 0 1 10 0Zm0 1a5 5 0 0 0-4.862 6.171l.076.283.174.573L1.415 12 4 14.585l3.975-3.972.573.173A5 5 0 0 0 15 6l-.007-.269-.024-.285-2.64 2.64L8.65 7.35 7.914 3.67l2.641-2.64-.02-.003a5.043 5.043 0 0 0-.266-.02L10 1Z' />
    </svg>
  )
})

SvgServices16.displayName = 'SvgServices16'
export default SvgServices16
