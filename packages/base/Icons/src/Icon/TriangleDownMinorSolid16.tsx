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
const SvgTriangleDownMinorSolid16 = forwardRef(
  function SvgTriangleDownMinorSolid16(props: Props, ref: Ref<SVGSVGElement>) {
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
        fill='none'
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
        <path
          fillRule='evenodd'
          d='m3.114 5.14 2.484 2.98C6.906 9.689 7.987 10.973 8 10.973c.013 0 1.094-1.284 2.402-2.853l2.484-2.98.106-.127H3.008l.106.127'
        />
      </svg>
    )
  }
)

SvgTriangleDownMinorSolid16.displayName = 'SvgTriangleDownMinorSolid16'
export default SvgTriangleDownMinorSolid16
