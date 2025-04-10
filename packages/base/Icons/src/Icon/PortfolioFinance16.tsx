import type { Ref } from 'react'
import React, { forwardRef } from 'react'
import type { StandardProps } from '@toptal/picasso-shared'
import { twMerge } from '@toptal/picasso-tailwind-merge'

import { getColorClass } from './styles'

const BASE_SIZE = 16

type ScaleType = 1 | 2 | 3 | 4
export interface Props extends StandardProps {
  scale?: ScaleType
  color?: string
  base?: number
  classes?: {
    root?: string
  }
}
const SvgPortfolioFinance16 = forwardRef(function SvgPortfolioFinance16(
  props: Props,
  ref: Ref<SVGSVGElement>
) {
  const {
    classes,
    className,
    style = {},
    color,
    scale,
    base,
    'data-testid': testId,
  } = props
  const scaledSize = base || BASE_SIZE * Math.ceil(scale || 1)
  const svgStyle = {
    minWidth: `${scaledSize}px`,
    minHeight: `${scaledSize}px`,
    ...style,
  }

  return (
    <svg
      viewBox='0 0 16 16'
      className={twMerge(
        'fill-current inline-block text-inherit h-[1em] align-[-.125em]',
        classes?.root,
        className,
        getColorClass(color)
      )}
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
