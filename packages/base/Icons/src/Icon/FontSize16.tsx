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
const SvgFontSize16 = forwardRef(function SvgFontSize16(
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
        d='M4.018 2.073C4.008 2.091.585 12.612.266 13.607L.14 14h1.048l.484-1.487.483-1.486 2.343-.007 2.343-.007.483 1.487.483 1.487.527.007c.492.007.525.004.513-.04-.007-.026-.881-2.714-1.941-5.974L4.978 2.053h-.474c-.261 0-.479.009-.486.02m1.493 4.852c.547 1.682.991 3.062.986 3.067-.005.005-.908.005-2.006.002l-1.998-.007.999-3.073c.549-1.689 1.005-3.066 1.012-3.059.007.007.46 1.388 1.007 3.07m6.95-1.874a3.088 3.088 0 0 0-1.525.777 3.024 3.024 0 0 0-.507.626l-.056.1.327.18c.18.099.376.209.437.244l.11.064.075-.128c.1-.171.443-.506.631-.617a1.995 1.995 0 0 1 1.154-.286 1.977 1.977 0 0 1 1.73 1.209c.119.273.149.476.149 1.025l.001.499-.194-.146a3.413 3.413 0 0 0-.961-.477 3.015 3.015 0 0 0-2.935.745 2.988 2.988 0 0 0-.014 4.251 2.993 2.993 0 0 0 3.918.279l.186-.14V14H16.002l-.008-3.233-.008-3.234-.07-.253c-.251-.903-.804-1.581-1.61-1.976-.411-.201-.709-.269-1.226-.28a3.366 3.366 0 0 0-.619.027m1.021 4.015a1.996 1.996 0 0 1 1.291 2.841 1.965 1.965 0 0 1-1.156.987 1.978 1.978 0 0 1-2.402-1.014 1.843 1.843 0 0 1-.202-.88c0-.336.058-.586.202-.88a1.999 1.999 0 0 1 1.295-1.054c.277-.068.7-.068.972 0'
      />
    </svg>
  )
})

SvgFontSize16.displayName = 'SvgFontSize16'
export default SvgFontSize16
