import type { Ref } from 'react'
import React, { forwardRef } from 'react'
import { twMerge } from '@toptal/picasso-tailwind-merge'
import type { StandardProps } from '@toptal/picasso-shared'
import { kebabToCamelCase } from '@toptal/picasso-utils'

import { classes } from './styles'
const BASE_SIZE = 24

type ScaleType = 1 | 2 | 3 | 4
export interface Props extends StandardProps {
  scale?: ScaleType
  color?: string
  base?: number
}
const SvgMicrophoneOn24 = forwardRef(function SvgMicrophoneOn24(
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
  const classNames = ['PicassoSvgMicrophoneOn24', classes.root]
  const scaledSize = base || BASE_SIZE * Math.ceil(scale || 1)
  const colorClassName = kebabToCamelCase(`${color}`)

  if (classes[colorClassName]) {
    classNames.push(classes[colorClassName])
  }
  if (className) {
    classNames.push(className)
  }

  const svgStyle = {
    minWidth: `${scaledSize}px`,
    minHeight: `${scaledSize}px`,
    ...style,
  }

  return (
    <svg
      viewBox='0 0 24 24'
      className={twMerge(...classNames)}
      style={svgStyle}
      ref={ref}
      data-testid={testId}
    >
      <path d='M11 23v-3.016A7.5 7.5 0 0 1 4 12.5h1a6.5 6.5 0 1 0 13 0h1a7.5 7.5 0 0 1-7 7.484V23h5v1H6v-1h5Zm.5-23A4.5 4.5 0 0 1 16 4.5v8a4.5 4.5 0 1 1-9 0v-8A4.5 4.5 0 0 1 11.5 0Zm0 1A3.5 3.5 0 0 0 8 4.5v8a3.5 3.5 0 0 0 7 0v-8A3.5 3.5 0 0 0 11.5 1Z' />
    </svg>
  )
})

SvgMicrophoneOn24.displayName = 'SvgMicrophoneOn24'
export default SvgMicrophoneOn24
