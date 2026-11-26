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
const SvgNetwork24 = forwardRef(function SvgNetwork24(
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
      <path d='M3.5 12a3.5 3.5 0 1 1 0 7 3.5 3.5 0 1 1 0-7Zm0 1a2.5 2.5 0 1 0 0 5 2.5 2.5 0 1 0 0-5Zm4-13a3.5 3.5 0 1 1 0 7 3.5 3.5 0 1 1 0-7Zm0 1a2.5 2.5 0 1 0 0 5 2.5 2.5 0 1 0 0-5Zm6 7a4.5 4.5 0 1 1 0 9 4.5 4.5 0 1 1 0-9Zm0 1a3.5 3.5 0 1 0 0 7 3.5 3.5 0 1 0 0-7Zm7 8a3.5 3.5 0 1 1 0 7 3.5 3.5 0 1 1 0-7Zm0 1a2.5 2.5 0 1 0 0 5 2.5 2.5 0 1 0 0-5Zm0-18a3.5 3.5 0 1 1 0 7 3.5 3.5 0 1 1 0-7Zm0 1a2.5 2.5 0 1 0 0 5 2.5 2.5 0 1 0 0-5ZM6.226 14.161l3.3-.99.288.958-3.3.99Zm4.638-4.713-2.12-3.17.832-.556 2.12 3.17Zm4.691-.405 2.71-3.49.79.614-2.71 3.49Zm.951 6.138 2.39 2.73-.752.658-2.39-2.73Z' />
    </svg>
  )
})

SvgNetwork24.displayName = 'SvgNetwork24'
export default SvgNetwork24
