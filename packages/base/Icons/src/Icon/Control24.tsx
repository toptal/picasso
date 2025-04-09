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
const SvgControl24 = forwardRef(function SvgControl24(
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
      <path d='M17.5 4a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5ZM14 6.5a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0ZM6.5 16a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5ZM3 18.5a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0ZM15 7H0V6h15v1Zm9 0h-4V6h4v1ZM4 19H0v-1h4v1Zm20 0H9v-1h15v1Z' />
    </svg>
  )
})

SvgControl24.displayName = 'SvgControl24'
export default SvgControl24
