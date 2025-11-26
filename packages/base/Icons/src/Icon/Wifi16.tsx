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
const SvgWifi16 = forwardRef(function SvgWifi16(
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
      <path d='M8 15.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3ZM11.34 10.98A4.477 4.477 0 0 0 8 9.5c-1.33 0-2.52.57-3.34 1.48M12.82 8.25A7.475 7.475 0 0 0 8 6.5c-1.84 0-3.52.66-4.82 1.75M14.27 5.58C12.52 4.28 10.35 3.5 8 3.5c-2.35 0-4.52.77-6.27 2.08M15.71 2.92A13.467 13.467 0 0 0 8 .5C5.13.5 2.48 1.39.29 2.92' />
    </svg>
  )
})

SvgWifi16.displayName = 'SvgWifi16'
export default SvgWifi16
