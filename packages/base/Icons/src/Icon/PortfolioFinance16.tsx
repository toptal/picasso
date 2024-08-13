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
const SvgPortfolioFinance16 = forwardRef(function SvgPortfolioFinance16(
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
  const classNames = ['PicassoSvgPortfolioFinance16', classes.root]
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
      <path d='M14.883 10.441 16 11l-8 4-8-4 1.117-.559L8 13.882l6.883-3.44Zm0-3L16 8l-8 4-8-4 1.117-.559L8 10.882l6.883-3.44ZM8 1l8 4-8 4-8-4 8-4Zm0 1.118L2.236 5 8 7.882 13.764 5 8 2.118Z' />
    </svg>
  )
})

SvgPortfolioFinance16.displayName = 'SvgPortfolioFinance16'
export default SvgPortfolioFinance16
