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
const SvgReferral16 = forwardRef(function SvgReferral16(
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
      <path d='M4 7a3 3 0 0 1 1.777 5.418A3.994 3.994 0 0 1 7.995 15.8L8 16H7a3 3 0 0 0-5.995-.176L1 16H0a4 4 0 0 1 2.223-3.585A3 3 0 0 1 4 7Zm0 1a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8-8v1h.5a2.5 2.5 0 0 1 2.495 2.336L15 3.5h-1a1.5 1.5 0 0 0-1.356-1.493L12.5 2H12v3h.5a2.5 2.5 0 0 1 .164 4.995L12.5 10H12v1h-1v-1h-.5a2.5 2.5 0 0 1-2.495-2.336L8 7.5h1a1.5 1.5 0 0 0 1.356 1.493L10.5 9h.5V6h-.5a2.5 2.5 0 0 1-.164-4.995L10.5 1h.5V0h1Zm.5 6H12v3h.5a1.5 1.5 0 0 0 .144-2.993L12.5 6ZM11 2h-.5a1.5 1.5 0 0 0-.144 2.993L10.5 5h.5V2Z' />
    </svg>
  )
})

SvgReferral16.displayName = 'SvgReferral16'
export default SvgReferral16
