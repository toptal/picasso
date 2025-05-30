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
const SvgNight24 = forwardRef(function SvgNight24(
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
      <path d='M20 13v-1h1v1h1v1h-1v1h-1v-1h-1v-1h1Zm-2-7V4h1v2h2v1h-2v2h-1V7h-2V6h2ZM9 9a9 9 0 0 0 8.712 8.995 9 9 0 1 1-6.425-14.991A8.966 8.966 0 0 0 9 9Zm-6 3a8 8 0 0 0 12.426 6.666C11.143 17.529 8 13.624 8 9c0-1.709.43-3.352 1.227-4.803A8.003 8.003 0 0 0 3 12Z' />
    </svg>
  )
})

SvgNight24.displayName = 'SvgNight24'
export default SvgNight24
