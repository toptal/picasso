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
const SvgSubArrowRight24 = forwardRef(function SvgSubArrowRight24(
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
        d='M2.04 8.118v4.118l.101.318c.163.519.54.961 1.029 1.21.489.249-.053.235 8.95.235l8.22.001-2.58 2.58-2.58 2.58.35.35.35.35 3.18-3.18 3.18-3.18-3.18-3.18-3.18-3.18-.35.35-.35.35 2.58 2.58 2.58 2.581-8.26-.011c-8.122-.01-8.263-.011-8.419-.089-.202-.1-.422-.32-.522-.522-.077-.155-.079-.274-.09-4.269L3.039 4H2.04v4.118'
      />
    </svg>
  )
})

SvgSubArrowRight24.displayName = 'SvgSubArrowRight24'
export default SvgSubArrowRight24
