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
const SvgTimesheet24 = forwardRef(function SvgTimesheet24(
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
      <path d='M5 6v1H1v16h21V7h-4V6h5v18H0V6h5Zm9 12v1H5v-1h9Zm4 0v1h-2v-1h2Zm-4-4v1H5v-1h9Zm4 0v1h-2v-1h2ZM11.5 0a5.5 5.5 0 1 1 0 11 5.5 5.5 0 0 1 0-11Zm0 1a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9Zm.5 1v4H9V5h2V2h1Z' />
    </svg>
  )
})

SvgTimesheet24.displayName = 'SvgTimesheet24'
export default SvgTimesheet24
