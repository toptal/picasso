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
const SvgOwnerDefault24 = forwardRef(function SvgOwnerDefault24(
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
      <path d='M13 9a4 4 0 0 1 4 4h3a4 4 0 0 1 4 4v2a4 4 0 0 1-4 4h-9a4 4 0 0 1-4-4H4a4 4 0 0 1-4-4v-2a4 4 0 0 1 4-4h9Zm7 5h-3v1a4 4 0 0 1-4 4H8a3 3 0 0 0 3 3h9a3 3 0 0 0 3-3v-2a3 3 0 0 0-3-3Zm-7-4H4a3 3 0 0 0-3 3v2a3 3 0 0 0 3 3h3v-1a4 4 0 0 1 4-4h5a3 3 0 0 0-3-3Zm3 4h-5a3 3 0 0 0-3 3v1h5a3 3 0 0 0 3-3v-1Zm5-13v3h3v1h-3v3h-1V5h-3V4h3V1h1Z' />
    </svg>
  )
})

SvgOwnerDefault24.displayName = 'SvgOwnerDefault24'
export default SvgOwnerDefault24
