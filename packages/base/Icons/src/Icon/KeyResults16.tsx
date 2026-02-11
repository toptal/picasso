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
      <path d='M17 0v4.326h-1.156a8.478 8.478 0 1 1-3.17-3.171V0H17ZM8.478 1.103a7.418 7.418 0 1 0 6.118 3.223h-1.173l-.842.841a5.299 5.299 0 1 1-.75-.75l.843-.84V2.403a7.384 7.384 0 0 0-4.196-1.3Zm0 3.18a4.24 4.24 0 1 0 3.347 1.64l-1.523 1.523a2.12 2.12 0 1 1-.75-.75l1.524-1.522a4.219 4.219 0 0 0-2.598-.891Z' />
    </svg>
  )
})

SvgKeyResults16.displayName = 'SvgKeyResults16'
export default SvgKeyResults16
