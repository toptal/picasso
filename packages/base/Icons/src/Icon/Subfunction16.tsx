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
const SvgSubfunction16 = forwardRef(function SvgSubfunction16(
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
      <path d='M10 1v5H8v2h5v3.05a2.5 2.5 0 1 1-1 0V9H3v2h2v5H0v-5h2V8h5V6H5V1h5ZM4 12H1v3h3v-3Zm8.5 0a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3ZM9 2H6v3h3V2Z' />
    </svg>
  )
})

SvgSubfunction16.displayName = 'SvgSubfunction16'
export default SvgSubfunction16
