import type { Ref } from 'react'
import React, { forwardRef } from 'react'
import type { StandardProps } from '@toptal/picasso-shared'

import { getIconClassNames } from './styles'
const BASE_SIZE = 16

type ScaleType = 1 | 2 | 3 | 4
export interface Props extends StandardProps {
  scale?: ScaleType
  color?: string
  base?: number
}
const SvgBold16 = forwardRef(function SvgBold16(
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
      viewBox='0 0 16 16'
      className={getIconClassNames(className, color)}
      style={svgStyle}
      ref={ref}
      data-testid={testId}
    >
      <path d='M3 1h5a4 4 0 0 1 3.063 6.573A4 4 0 0 1 9 15H3V1Zm6 8H5v4h4a2 2 0 0 0 .15-3.995L9 9ZM8 3H5v4h3a2 2 0 0 0 .15-3.995L8 3Z' />
    </svg>
  )
})

SvgBold16.displayName = 'SvgBold16'
export default SvgBold16
