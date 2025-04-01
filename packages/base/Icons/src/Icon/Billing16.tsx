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
const SvgBilling16 = forwardRef(function SvgBilling16(
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
      <path d='m11 0 4 4v12H1V0h10Zm-.414 1H2v14h12V4.414L10.586 1ZM4 5h2v1H4V5Zm0 3h2v1H4V8Zm4-3h4v1H8V5Zm0 3h4v1H8V8Zm0 3h4v1H8v-1Z' />
    </svg>
  )
})

SvgBilling16.displayName = 'SvgBilling16'
export default SvgBilling16
