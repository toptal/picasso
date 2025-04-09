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
const SvgBell16 = forwardRef(function SvgBell16(
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
      <path d='M7 1.022V0h1v1.022A5.5 5.5 0 0 1 13 6.5v3.505c0 .72.276.995 1 .995v1H1v-1c.724 0 1-.275 1-.995V6.5a5.5 5.5 0 0 1 5-5.478ZM5 13.5V13h1v.5a1.5 1.5 0 0 0 3 0V13h1v.5a2.5 2.5 0 1 1-5 0Zm7-3.495V6.5a4.5 4.5 0 1 0-9 0v3.505c0 .383-.066.716-.192.995h9.384a2.397 2.397 0 0 1-.192-.995Z' />
    </svg>
  )
})

SvgBell16.displayName = 'SvgBell16'
export default SvgBell16
