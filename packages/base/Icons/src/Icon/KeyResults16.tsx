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
const SvgKeyResults16 = forwardRef(function SvgKeyResults16(
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
      <path d='M15.097 0v3.842h-1.026a7.53 7.53 0 1 1-2.815-2.816V0h3.841ZM7.53.98a6.588 6.588 0 1 0 5.433 2.862h-1.041l-.748.747a4.706 4.706 0 1 1-.665-.665l.748-.748V2.134A6.558 6.558 0 0 0 7.529.98Zm0 2.823a3.765 3.765 0 1 0 2.973 1.457L9.149 6.613a1.882 1.882 0 1 1-.665-.665l1.352-1.353a3.747 3.747 0 0 0-2.307-.792Z' />
    </svg>
  )
})

SvgKeyResults16.displayName = 'SvgKeyResults16'
export default SvgKeyResults16
