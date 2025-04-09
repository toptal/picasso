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
const SvgBellSolid16 = forwardRef(function SvgBellSolid16(
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
        d='M8 0H7v1.022A5.5 5.5 0 0 0 2 6.5v3.505c0 .72-.275.995-1 .995v1h13v-1c-.723 0-1-.275-1-.995V6.5a5.5 5.5 0 0 0-5-5.478V0ZM5 13.5a2.5 2.5 0 0 0 5 0V13H5v.5Z'
        clipRule='evenodd'
      />
    </svg>
  )
})

SvgBellSolid16.displayName = 'SvgBellSolid16'
export default SvgBellSolid16
