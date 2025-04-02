import type { Ref } from 'react'
import React, { forwardRef } from 'react'
import type { StandardProps } from '@toptal/picasso-shared'

import { getIconClassNames } from './styles'
const BASE_SIZE = 24

type ScaleType = 1 | 2 | 3 | 4
export interface Props extends StandardProps {
  scale?: ScaleType
  color?: string
  base?: number
}
const SvgTimeSolid24 = forwardRef(function SvgTimeSolid24(
  props: Props,
  ref: Ref<SVGSVGElement>
) {
  const {
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
      viewBox='0 0 24 24'
      className={getIconClassNames(className, color)}
      style={svgStyle}
      ref={ref}
      data-testid={testId}
    >
      <path
        fillRule='evenodd'
        d='M22 11.5C22 17.299 17.299 22 11.5 22S1 17.299 1 11.5 5.701 1 11.5 1 22 5.701 22 11.5ZM11 11V4h1v8H6v-1h5Z'
        clipRule='evenodd'
      />
    </svg>
  )
})

SvgTimeSolid24.displayName = 'SvgTimeSolid24'
export default SvgTimeSolid24
