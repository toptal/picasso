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
const SvgSoundOff16 = forwardRef(function SvgSoundOff16(
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
      <path d='M7 2v12l-3-3H0V5h4l3-3ZM6 4.414 4.414 6H1v4h3.414L6 11.585V4.414Zm7.5 1.379.707.707-1.5 1.5 1.5 1.5-.707.707-1.5-1.5-1.5 1.5-.707-.707 1.5-1.5-1.5-1.5.707-.707 1.5 1.5 1.5-1.5Z' />
    </svg>
  )
})

SvgSoundOff16.displayName = 'SvgSoundOff16'
export default SvgSoundOff16
