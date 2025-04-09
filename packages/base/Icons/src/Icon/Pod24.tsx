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
const SvgPod24 = forwardRef(function SvgPod24(
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
      <path d='M6 13a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm12 0a5 5 0 1 1 0 10 5 5 0 0 1 0-10ZM6 14a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm12 0a4 4 0 1 0 0 8 4 4 0 0 0 0-8ZM6 1a5 5 0 1 1 0 10A5 5 0 0 1 6 1Zm12 0a5 5 0 1 1 0 10 5 5 0 0 1 0-10ZM6 2a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm12 0a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z' />
    </svg>
  )
})

SvgPod24.displayName = 'SvgPod24'
export default SvgPod24
