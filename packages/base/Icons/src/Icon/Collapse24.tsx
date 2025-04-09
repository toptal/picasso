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
const SvgCollapse24 = forwardRef(function SvgCollapse24(
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
        d='m1.75 1.75-.35.35 3.45 3.45L8.3 9H3v1h7V3H9v5.3L5.55 4.85 2.1 1.4l-.35.35m16.7 3.1L15 8.3V3h-1v7h7V9h-5.3l3.45-3.45 3.451-3.451-.351-.349-.351-.349L18.45 4.85M3 14.5v.5h5.3l-3.45 3.45L1.4 21.9l.35.35.35.35 3.45-3.45L9 15.7V21h1v-7H3v.5m11 3V21h1v-5.3l3.45 3.45 3.45 3.45.35-.35.35-.35-3.45-3.45L15.7 15H21v-1h-7v3.5'
      />
    </svg>
  )
})

SvgCollapse24.displayName = 'SvgCollapse24'
export default SvgCollapse24
