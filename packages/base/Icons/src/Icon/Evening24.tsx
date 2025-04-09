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
const SvgEvening24 = forwardRef(function SvgEvening24(
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
      <path d='M19 16v-1h1v1h1v1h-1v1h-1v-1h-1v-1h1Zm-9-3v-1h1v1h1v1h-1v1h-1v-1H9v-1h1Zm7-4V7h1v2h2v1h-2v2h-1v-2h-2V9h2ZM5 17v-2h1v2h2v1H6v2H5v-2H3v-1h2ZM9 6h2v1H9v2H8V7H6V6h2V4h1v2Z' />
    </svg>
  )
})

SvgEvening24.displayName = 'SvgEvening24'
export default SvgEvening24
