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
const SvgPin16 = forwardRef(function SvgPin16(
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
  const classNames = ['PicassoSvgPin16', classes.root]
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
      <path d='M8 16C4 11.542 2 8.21 2 6a6 6 0 1 1 12 0c0 2.21-2 5.542-6 10ZM3 6c0 1.754 1.657 4.633 5 8.489 3.343-3.856 5-6.735 5-8.489A5 5 0 0 0 3 6Zm5 2a2 2 0 1 1 0-4 2 2 0 0 1 0 4ZM7 6a1 1 0 1 0 2 0 1 1 0 0 0-2 0Z' />
    </svg>
  )
})

SvgPin16.displayName = 'SvgPin16'
export default SvgPin16
