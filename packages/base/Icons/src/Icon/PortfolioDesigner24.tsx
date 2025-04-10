import type { Ref } from 'react'
import React, { forwardRef } from 'react'
import type { StandardProps } from '@toptal/picasso-shared'
import { twMerge } from '@toptal/picasso-tailwind-merge'

import { getColorClass } from './styles'

const BASE_SIZE = 24

type ScaleType = 1 | 2 | 3 | 4
export interface Props extends StandardProps {
  scale?: ScaleType
  color?: string
  base?: number
  classes?: {
    root?: string
  }
}
const SvgPortfolioDesigner24 = forwardRef(function SvgPortfolioDesigner24(
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
      viewBox='0 0 24 24'
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
      <path d='M1 1h9v9H1V1Zm1 1v7h7V2H2Zm12-1h9v9h-9V1Zm1 1v7h7V2h-7ZM1 14h9v9H1v-9Zm1 8h7v-7H2v7Zm12-8h9v9h-9v-9Zm1 8h7v-7h-7v7Z' />
    </svg>
  )
})

SvgPortfolioDesigner24.displayName = 'SvgPortfolioDesigner24'
export default SvgPortfolioDesigner24
