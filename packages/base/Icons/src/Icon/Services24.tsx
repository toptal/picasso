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
const SvgServices24 = forwardRef(function SvgServices24(
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
      <path d='M15 0c1.186 0 2.318.23 3.355.646L14 5l1 4 4 1 4.355-4.353a9 9 0 0 1-10.968 11.968L6 24l-6-6 6.386-6.385A9 9 0 0 1 15 0Zm0 1a8 8 0 0 0-7.748 10.002l.09.323.174.573-6.102 6.101L6 22.585l6.103-6.101.573.174A8 8 0 0 0 22.885 7.64l-.018-.093-3.56 3.56-5.132-1.283-1.282-5.132 3.56-3.56-.092-.018a8.033 8.033 0 0 0-1.017-.108L15 1Z' />
    </svg>
  )
})

SvgServices24.displayName = 'SvgServices24'
export default SvgServices24
