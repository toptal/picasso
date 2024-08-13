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
const SvgDollar24 = forwardRef(function SvgDollar24(
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
  const classNames = ['PicassoSvgDollar24', classes.root]
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
      viewBox='0 0 24 24'
      className={twMerge(...classNames)}
      style={svgStyle}
      ref={ref}
      data-testid={testId}
    >
      <path
        fillRule='evenodd'
        d='M10.333 2h.834v2.083h1.666V2h.834v2.084c2.272.02 4.347 1.262 5.37 3.223l.192.37-.74.385-.192-.37c-.877-1.682-2.665-2.754-4.63-2.775v6.666h1.093c2.384 0 4.323 1.862 4.323 4.167 0 2.305-1.939 4.167-4.323 4.167h-1.093V22h-.834v-2.083h-1.666V22h-.834v-2.084c-2.272-.02-4.347-1.262-5.37-3.223l-.192-.37.74-.385.192.37c.877 1.683 2.665 2.754 4.63 2.775v-6.666H9.24a4.407 4.407 0 0 1-3.051-1.215A4.092 4.092 0 0 1 4.917 8.25c0-2.305 1.939-4.167 4.323-4.167h1.093V2Zm3.334 17.083h1.093c1.931 0 3.49-1.496 3.49-3.333 0-1.837-1.559-3.333-3.49-3.333h-1.093v6.666Zm-.834-6.666v6.666h-1.666v-6.666h1.666Zm0-.834V4.917h-1.666v6.666h1.666ZM9.24 4.917h1.093v6.666H9.24a3.574 3.574 0 0 1-2.474-.982 3.259 3.259 0 0 1-1.016-2.35c0-1.838 1.559-3.334 3.49-3.334Z'
        clipRule='evenodd'
      />
    </svg>
  )
})

SvgDollar24.displayName = 'SvgDollar24'
export default SvgDollar24
