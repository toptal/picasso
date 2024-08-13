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
const SvgEmployee16 = forwardRef(function SvgEmployee16(
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
  const classNames = ['PicassoSvgEmployee16', classes.root]
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
        d='M8 1a2 2 0 1 0 0 4 2 2 0 0 0 0-4ZM5 3a3 3 0 1 1 6 0 3 3 0 0 1-6 0ZM.708 11H3.1A4.994 4.994 0 0 1 8 7a4.995 4.995 0 0 1 4.9 4h2.352l-.193.644-.9 3-.107.356H13v1h-1v-2h1.308l.6-2H2.052l.6 2H4v2H3v-1H1.908l-.107-.356-.9-3L.708 11Zm3.417 0h7.75A3.994 3.994 0 0 0 8 8a3.994 3.994 0 0 0-3.875 3Z'
        clipRule='evenodd'
      />
    </svg>
  )
})

SvgEmployee16.displayName = 'SvgEmployee16'
export default SvgEmployee16
