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
const SvgCritical16 = forwardRef(function SvgCritical16(
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
        d='M14.503 8.001 8 1.5 1.5 8.001l6.501 6.502L14.503 8ZM8.709.793a1 1 0 0 0-1.415 0L.793 7.294a1 1 0 0 0 0 1.415l6.501 6.501a1 1 0 0 0 1.415 0l6.501-6.501a1 1 0 0 0 0-1.415L8.709.793ZM7.5 4h1v6h-1V4Zm1 7h-1v1h1v-1Z'
        clipRule='evenodd'
      />
    </svg>
  )
})

SvgCritical16.displayName = 'SvgCritical16'
export default SvgCritical16
