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
const SvgFunction16 = forwardRef(function SvgFunction16(
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
  const classNames = ['PicassoSvgFunction16', classes.root]
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
      <path d='M7.5 1A2.5 2.5 0 0 1 8 5.95V8h5v3h2v5h-5v-5h2V9H3v2h2v5H0v-5h2V8h5V5.95A2.5 2.5 0 0 1 7.5 1ZM14 12h-3v3h3v-3ZM4 12H1v3h3v-3ZM7.5 2a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Z' />
    </svg>
  )
})

SvgFunction16.displayName = 'SvgFunction16'
export default SvgFunction16
