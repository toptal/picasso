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
const SvgLayers16 = forwardRef(function SvgLayers16(
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
      viewBox='0 0 16 16'
      className={getIconClassNames(className, color)}
      style={svgStyle}
      ref={ref}
      data-testid={testId}
    >
      <path
        fillRule='evenodd'
        d='m8 1 8 4-8 4-8-4 8-4Zm8 7-1.116-.559L8 10.882l-6.884-3.44L0 8l8 4 8-4Zm0 3-1.116-.559L8 13.882l-6.884-3.44L0 11l8 4 8-4ZM2.236 5 8 2.118 13.764 5 8 7.882 2.236 5Z'
        clipRule='evenodd'
      />
    </svg>
  )
})

SvgLayers16.displayName = 'SvgLayers16'
export default SvgLayers16
