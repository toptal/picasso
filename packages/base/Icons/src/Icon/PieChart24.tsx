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
const SvgPieChart24 = forwardRef(function SvgPieChart24(
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
      <path d='M12 2v10h10v.5C22 18.299 17.299 23 11.5 23S1 18.299 1 12.5C1 6.796 5.548 2.154 11.216 2.004L11.5 2h.5Zm-1 1.013-.306.02C5.824 3.444 2 7.526 2 12.5a9.5 9.5 0 0 0 9.5 9.5c4.975 0 9.057-3.825 9.466-8.694l.019-.267.001-.039H11V3.013ZM13.5 1a9.5 9.5 0 0 1 9.496 9.23l.004.27v.5H13V1h.5Zm.5 1.014V10h7.985A8.505 8.505 0 0 0 14 2.014Z' />
    </svg>
  )
})

SvgPieChart24.displayName = 'SvgPieChart24'
export default SvgPieChart24
