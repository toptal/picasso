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
const SvgEye16 = forwardRef(function SvgEye16(
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
      <path d='M8 3c2.946 0 5.612 1.667 8 5-2.388 3.333-5.054 5-8 5-2.946 0-5.612-1.667-8-5 2.388-3.333 5.054-5 8-5Zm0 1C5.671 4 3.507 5.207 1.482 7.703L1.247 8l.011.015c2.014 2.59 4.168 3.89 6.484 3.98L8 12c2.329 0 4.493-1.207 6.518-3.703L14.752 8l-.01-.015c-2.014-2.59-4.168-3.89-6.484-3.98L8 4Zm0 1a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 1a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z' />
    </svg>
  )
})

SvgEye16.displayName = 'SvgEye16'
export default SvgEye16
