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
const SvgDashboard16 = forwardRef(function SvgDashboard16(
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
      data-name='Layer 2'
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
      <path d='M14.2 2H1.8C.81 2 0 2.81 0 3.8v8.4c0 .99.81 1.8 1.8 1.8h12.4c.99 0 1.8-.81 1.8-1.8V3.8c0-.99-.81-1.8-1.8-1.8ZM1 3.8c0-.44.36-.8.8-.8H5v2H1V3.8Zm.8 9.2c-.44 0-.8-.36-.8-.8V6h4v7H1.8Zm13.2-.8c0 .44-.36.8-.8.8H6V3h8.2c.44 0 .8.36.8.8v8.4ZM7 8h7V5H7v3Zm1-2h5v1H8V6Zm-1 6h7V9H7v3Zm1-2h5v1H8v-1Z' />
    </svg>
  )
})

SvgDashboard16.displayName = 'SvgDashboard16'
export default SvgDashboard16
