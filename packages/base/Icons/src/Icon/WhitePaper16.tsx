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
const SvgWhitePaper16 = forwardRef(function SvgWhitePaper16(
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
      <path d='M15 0v16H1V0h14Zm-1 1H2v14h12V1ZM8 12v1H4v-1h4Zm3-2v1H4v-1h7ZM7 3l2 5H8l-.4-1H5.4L5 8H4l2-5h1Zm-.5 1.25L5.8 6h1.4l-.7-1.75Z' />
    </svg>
  )
})

SvgWhitePaper16.displayName = 'SvgWhitePaper16'
export default SvgWhitePaper16
