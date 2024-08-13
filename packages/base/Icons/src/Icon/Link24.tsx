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
const SvgLink24 = forwardRef(function SvgLink24(
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
  const classNames = ['PicassoSvgLink24', classes.root]
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
      <path d='M4 15a4 4 0 0 1-4-4V9a4 4 0 0 1 4-4h9a4 4 0 0 1 4 4h3a4 4 0 0 1 4 4v2a4 4 0 0 1-4 4h-9a4 4 0 0 1-4-4H4Zm16-5h-3v1a4 4 0 0 1-4 4H8a3 3 0 0 0 3 3h9a3 3 0 0 0 3-3v-2a3 3 0 0 0-3-3Zm-7-4H4a3 3 0 0 0-3 3v2a3 3 0 0 0 3 3h3v-1a4 4 0 0 1 4-4h5a3 3 0 0 0-3-3Zm3 4h-5a3 3 0 0 0-3 3v1h5a3 3 0 0 0 3-3v-1Z' />
    </svg>
  )
})

SvgLink24.displayName = 'SvgLink24'
export default SvgLink24
