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
const SvgBilling24 = forwardRef(function SvgBilling24(
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
      <path d='m16 0 6 6v18H2V0h14Zm-.414 1H3v22h18V6.414L15.586 1ZM6 8h3v1H6V8Zm0 4h3v1H6v-1Zm6-4h6v1h-6V8Zm0 4h6v1h-6v-1Zm0 4h6v1h-6v-1Z' />
    </svg>
  )
})

SvgBilling24.displayName = 'SvgBilling24'
export default SvgBilling24
