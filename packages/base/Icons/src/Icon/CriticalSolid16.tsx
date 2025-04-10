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
const SvgCriticalSolid16 = forwardRef(function SvgCriticalSolid16(
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
      <path
        fillRule='evenodd'
        d='M8.709.793a1 1 0 0 0-1.415 0L.793 7.294a1 1 0 0 0 0 1.415l6.501 6.501a1 1 0 0 0 1.415 0l6.501-6.501a1 1 0 0 0 0-1.415L8.709.793ZM7.25 4.759a.75.75 0 0 1 1.5 0V9.08a.75.75 0 0 1-1.5 0V4.759Zm1.5 7.33a.751.751 0 0 1-.75.752.751.751 0 0 1-.75-.753c0-.415.336-.752.75-.752s.75.336.75.752Z'
        clipRule='evenodd'
      />
    </svg>
  )
})

SvgCriticalSolid16.displayName = 'SvgCriticalSolid16'
export default SvgCriticalSolid16
