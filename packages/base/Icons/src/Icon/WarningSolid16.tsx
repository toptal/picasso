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
const SvgWarningSolid16 = forwardRef(function SvgWarningSolid16(
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
  const classNames = ['PicassoSvgWarningSolid16', classes.root]
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
      fill='none'
      viewBox='0 0 16 16'
      className={twMerge(...classNames)}
      style={svgStyle}
      ref={ref}
      data-testid={testId}
    >
      <path
        fillRule='evenodd'
        d='M8.869 1.505a1 1 0 0 0-1.738 0L.299 13.503a1 1 0 0 0 .87 1.495H14.83a1 1 0 0 0 .87-1.495L8.868 1.505ZM7.25 4.76a.75.75 0 1 1 1.5 0V9.08a.75.75 0 1 1-1.5 0V4.759Zm1.5 7.33a.751.751 0 0 1-.75.752.751.751 0 0 1-.75-.753c0-.415.336-.752.75-.752s.75.336.75.752Z'
        clipRule='evenodd'
      />
    </svg>
  )
})

SvgWarningSolid16.displayName = 'SvgWarningSolid16'
export default SvgWarningSolid16
