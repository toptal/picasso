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
const SvgBusinessOwnerLeave24 = forwardRef(function SvgBusinessOwnerLeave24(
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
      <path
        fillRule='evenodd'
        d='M1 12.5V22h19v-3h-1v2H2V4h17v2h1V3H1v9.5m16.15-4.35-.35.35 1.75 1.75L20.3 12H9v1h11.3l-1.751 1.751-1.75 1.75.351.349.351.349 2.349-2.349 2.35-2.35-2.35-2.35L17.5 7.8l-.35.35'
      />
    </svg>
  )
})

SvgBusinessOwnerLeave24.displayName = 'SvgBusinessOwnerLeave24'
export default SvgBusinessOwnerLeave24
