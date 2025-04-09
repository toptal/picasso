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
const SvgUpdate16 = forwardRef(function SvgUpdate16(
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
      <path d='M3.5 12.753V14.5h-1v-4h4v1H3.816A5.435 5.435 0 0 0 8 13.455 5.455 5.455 0 0 0 13.455 8h1.09A6.545 6.545 0 0 1 3.5 12.753Zm9-9.506V1.5h1v4h-4v-1h2.684A5.435 5.435 0 0 0 8 2.545 5.455 5.455 0 0 0 2.545 8h-1.09A6.545 6.545 0 0 1 12.5 3.247Z' />
    </svg>
  )
})

SvgUpdate16.displayName = 'SvgUpdate16'
export default SvgUpdate16
