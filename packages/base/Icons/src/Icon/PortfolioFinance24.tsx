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
const SvgPortfolioFinance24 = forwardRef(function SvgPortfolioFinance24(
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
      <path d='M1.106 15.447 12 20.882l10.894-5.435L24 16l-12 6-12-6 1.106-.553Zm0-4L12 16.882l10.894-5.435L24 12l-12 6-12-6 1.106-.553ZM0 8l12-6 12 6-12 6L0 8Zm12 4.882L21.764 8 12 3.118 2.236 8 12 12.882Z' />
    </svg>
  )
})

SvgPortfolioFinance24.displayName = 'SvgPortfolioFinance24'
export default SvgPortfolioFinance24
