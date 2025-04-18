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
const SvgDashboard24 = forwardRef(function SvgDashboard24(
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
      <path d='M21.5 3h-19A2.5 2.5 0 0 0 0 5.5v13A2.5 2.5 0 0 0 2.5 21h19a2.5 2.5 0 0 0 2.5-2.5v-13A2.5 2.5 0 0 0 21.5 3Zm-19 1H7v4H1V5.5C1 4.67 1.67 4 2.5 4Zm0 16c-.83 0-1.5-.67-1.5-1.5V9h6v11H2.5ZM23 18.5c0 .83-.67 1.5-1.5 1.5H8V4h13.5c.83 0 1.5.67 1.5 1.5v13ZM10 12h11V8H10v4Zm1-3h9v2h-9V9Zm-1 9h11v-4H10v4Zm1-3h9v2h-9v-2Z' />
    </svg>
  )
})

SvgDashboard24.displayName = 'SvgDashboard24'
export default SvgDashboard24
