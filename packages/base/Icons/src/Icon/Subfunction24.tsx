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
const SvgSubfunction24 = forwardRef(function SvgSubfunction24(
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
      <path d='M15 1v7h-3v4h8v5.036a3.5 3.5 0 1 1-1 0V13H4v4h3v7H0v-7h3v-5h8V8H8V1h7ZM6 18H1v5h5v-5Zm13.5 0a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5ZM14 2H9v5h5V2Z' />
    </svg>
  )
})

SvgSubfunction24.displayName = 'SvgSubfunction24'
export default SvgSubfunction24
