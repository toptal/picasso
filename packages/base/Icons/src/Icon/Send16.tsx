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
const SvgSend16 = forwardRef(function SvgSend16(
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
        d='M1.348 2.656c-.478-.86.442-1.82 1.321-1.38L15.22 7.55a.498.498 0 0 1 .135.803.498.498 0 0 1-.135.096L2.67 14.724c-.88.44-1.799-.521-1.321-1.38L4.317 8l-2.97-5.344Zm.874-.486L13.882 8l-11.66 5.83L5.183 8.5h2.793a.5.5 0 0 0 0-1H5.183L2.222 2.17Z'
        clipRule='evenodd'
      />
    </svg>
  )
})

SvgSend16.displayName = 'SvgSend16'
export default SvgSend16
