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
const SvgCriticalSolid24 = forwardRef(function SvgCriticalSolid24(
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
        d='M13.063 1.19a1.5 1.5 0 0 0-2.122 0L1.19 10.941a1.5 1.5 0 0 0 0 2.12l9.752 9.753a1.5 1.5 0 0 0 2.122 0l9.752-9.752a1.5 1.5 0 0 0 0-2.122L13.063 1.19ZM11 7.013a1 1 0 1 1 2 0v7a1 1 0 1 1-2 0v-7Zm2 10.99a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z'
        clipRule='evenodd'
      />
    </svg>
  )
})

SvgCriticalSolid24.displayName = 'SvgCriticalSolid24'
export default SvgCriticalSolid24
