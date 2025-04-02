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
const SvgPinSolid24 = forwardRef(function SvgPinSolid24(
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
      viewBox='0 0 24 24'
      className={getIconClassNames(className, color)}
      style={svgStyle}
      ref={ref}
      data-testid={testId}
    >
      <path d='M12 0a9 9 0 0 1 9 9c0 3.314-3 8.314-9 15-6-6.686-9-11.686-9-15a9 9 0 0 1 9-9Zm0 6a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z' />
    </svg>
  )
})

SvgPinSolid24.displayName = 'SvgPinSolid24'
export default SvgPinSolid24
