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
const SvgNumericalAnalysis24 = forwardRef(function SvgNumericalAnalysis24(
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
  const classNames = ['PicassoSvgNumericalAnalysis24', classes.root]
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
      <path d='M23 1v22H1V1h22Zm-1 1H2v20h20V2Zm-5 17v1h-1v-1h1Zm-7.379-5.328.707.707-2.12 2.121 2.12 2.121-.707.707-2.121-2.12-2.121 2.12-.707-.707 2.12-2.121-2.12-2.121.707-.707 2.121 2.12 2.121-2.12ZM20 16v1h-7v-1h7Zm-3-3v1h-1v-1h1ZM8 4v3h3v1H8v3H7V8H4V7h3V4h1Zm12 3v1h-7V7h7Z' />
    </svg>
  )
})

SvgNumericalAnalysis24.displayName = 'SvgNumericalAnalysis24'
export default SvgNumericalAnalysis24
