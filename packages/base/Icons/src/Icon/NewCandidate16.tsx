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
const SvgNewCandidate16 = forwardRef(function SvgNewCandidate16(
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
  const classNames = ['PicassoSvgNewCandidate16', classes.root]
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
      <path d='M13 3V1h1v2h2v1h-2v2h-1V4h-2V3h2ZM3.873 9.388a4 4 0 1 1 4.255 0A6.002 6.002 0 0 1 12 15h-1a5 5 0 0 0-10 0H0a6.002 6.002 0 0 1 3.873-5.612ZM6 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z' />
    </svg>
  )
})

SvgNewCandidate16.displayName = 'SvgNewCandidate16'
export default SvgNewCandidate16
