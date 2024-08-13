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
const SvgQuote16 = forwardRef(function SvgQuote16(
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
  const classNames = ['PicassoSvgQuote16', classes.root]
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
      <path d='M4.5 3a2.5 2.5 0 0 1 2.494 2.671l.003-.17c-.004 2.355-.961 4.693-2.853 7.008l-.264.316-.76-.65c1.283-1.5 2.133-2.99 2.558-4.47A2.5 2.5 0 1 1 4.5 3Zm0 1a1.5 1.5 0 1 0 1.495 1.62l.002-.12L6 5.498l-.007-.143A1.5 1.5 0 0 0 4.5 4Zm7-1a2.5 2.5 0 0 1 2.494 2.671l.003-.17c-.004 2.355-.961 4.693-2.853 7.008l-.264.316-.76-.65c1.283-1.5 2.133-2.99 2.558-4.47A2.5 2.5 0 1 1 11.5 3Zm0 1a1.5 1.5 0 1 0 1.495 1.62l.002-.12.003-.001-.007-.143A1.5 1.5 0 0 0 11.5 4Z' />
    </svg>
  )
})

SvgQuote16.displayName = 'SvgQuote16'
export default SvgQuote16
