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
const SvgPortfolioDesigner16 = forwardRef(function SvgPortfolioDesigner16(
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
      <path d='M0 0h7v7H0V0Zm1 1v5h5V1H1Zm8-1h7v7H9V0Zm1 1v5h5V1h-5ZM0 9h7v7H0V9Zm1 6h5v-5H1v5Zm8-6h7v7H9V9Zm1 6h5v-5h-5v5Z' />
    </svg>
  )
})

SvgPortfolioDesigner16.displayName = 'SvgPortfolioDesigner16'
export default SvgPortfolioDesigner16
