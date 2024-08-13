import type { Ref } from 'react'
import React, { forwardRef } from 'react'
import { twMerge } from '@toptal/picasso-tailwind-merge'
import type { StandardProps } from '@toptal/picasso-shared'
import { kebabToCamelCase } from '@toptal/picasso-utils'

import { classes } from './styles'
const BASE_SIZE = 16

type ScaleType = 1 | 2 | 3 | 4
export interface Props extends StandardProps {
  scale?: ScaleType
  color?: string
  base?: number
}
const SvgControl16 = forwardRef(function SvgControl16(
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
  const classNames = ['PicassoSvgControl16', classes.root]
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
      viewBox='0 0 16 16'
      className={twMerge(...classNames)}
      style={svgStyle}
      ref={ref}
      data-testid={testId}
    >
      <path d='M10 5H0V4h10v1Zm6 0h-3V4h3v1ZM3 13H0v-1h3v1Zm13 0H6v-1h10v1ZM11.5 3a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3ZM9 4.5a2.5 2.5 0 1 1 5 0 2.5 2.5 0 0 1-5 0ZM4.5 11a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3ZM2 12.5a2.5 2.5 0 1 1 5 0 2.5 2.5 0 0 1-5 0Z' />
    </svg>
  )
})

SvgControl16.displayName = 'SvgControl16'
export default SvgControl16
