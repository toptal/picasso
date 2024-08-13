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
const SvgSettings24 = forwardRef(function SvgSettings24(
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
  const classNames = ['PicassoSvgSettings24', classes.root]
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
      <path d='m7.209 19.62-1.573 1.572-2.828-2.828 1.572-1.573A8.948 8.948 0 0 1 3.223 14H1v-4h2.223A8.948 8.948 0 0 1 4.38 7.209L2.808 5.636l2.828-2.828L7.209 4.38A8.948 8.948 0 0 1 10 3.223V1h4v2.223a8.948 8.948 0 0 1 2.791 1.157l1.573-1.572 2.828 2.828-1.572 1.573c.533.845.929 1.786 1.157 2.791H23v4h-2.223a8.948 8.948 0 0 1-1.157 2.791l1.572 1.573-2.828 2.828-1.573-1.572A8.948 8.948 0 0 1 14 20.777V23h-4v-2.223a8.948 8.948 0 0 1-2.791-1.157Zm-.143-1.272.676.426c.76.48 1.598.828 2.48 1.028l.778.176V22h2v-2.022l.779-.176a7.947 7.947 0 0 0 2.48-1.028l.675-.426 1.43 1.43 1.414-1.414-1.43-1.43.426-.676a7.947 7.947 0 0 0 1.028-2.48l.176-.778H22v-2h-2.022l-.176-.779a7.947 7.947 0 0 0-1.028-2.48l-.426-.675 1.43-1.43-1.414-1.414-1.43 1.43-.676-.426a7.947 7.947 0 0 0-2.48-1.028L13 4.022V2h-2v2.022l-.779.176c-.881.2-1.718.549-2.48 1.028l-.675.426-1.43-1.43-1.414 1.414 1.43 1.43-.426.676a7.947 7.947 0 0 0-1.028 2.48L4.022 11H2v2h2.022l.176.779c.2.881.549 1.718 1.028 2.48l.426.675-1.43 1.43 1.414 1.414 1.43-1.43ZM12 17a5 5 0 1 1 0-10 5 5 0 0 1 0 10Zm0-1a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z' />
    </svg>
  )
})

SvgSettings24.displayName = 'SvgSettings24'
export default SvgSettings24
