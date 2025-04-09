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
const SvgLinkedin16 = forwardRef(function SvgLinkedin16(
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
      <path d='M13.631 13.635h-2.369V9.922c0-.885-.018-2.025-1.235-2.025-1.235 0-1.424.964-1.424 1.96v3.778H6.234V6H8.51v1.04h.03c.319-.6 1.092-1.233 2.247-1.233 2.401 0 2.845 1.58 2.845 3.637v4.19ZM3.558 4.955A1.375 1.375 0 0 1 2.183 3.58a1.376 1.376 0 1 1 1.375 1.377Zm1.188 8.68H2.37V6h2.376v7.635ZM14.816 0H1.182C.528 0 0 .516 0 1.153v13.694C0 15.485.528 16 1.18 16h13.635c.652 0 1.185-.515 1.185-1.153V1.153C16 .516 15.467 0 14.815 0h.002Z' />
    </svg>
  )
})

SvgLinkedin16.displayName = 'SvgLinkedin16'
export default SvgLinkedin16
