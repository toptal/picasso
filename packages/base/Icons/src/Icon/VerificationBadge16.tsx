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
const SvgVerificationBadge16 = forwardRef(function SvgVerificationBadge16(
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
        d='M9.3.478a2 2 0 0 0-2.595 0l-.852.726a2 2 0 0 1-1.138.471l-1.116.09a2 2 0 0 0-1.835 1.834l-.089 1.116a2 2 0 0 1-.471 1.138l-.726.852a2 2 0 0 0 0 2.594l.726.853a2 2 0 0 1 .471 1.138l.09 1.116a2 2 0 0 0 1.834 1.834l1.116.09a2 2 0 0 1 1.138.47l.852.727a2 2 0 0 0 2.594 0l.853-.726a2 2 0 0 1 1.138-.472l1.116-.089a2 2 0 0 0 1.834-1.835l.09-1.115a2 2 0 0 1 .47-1.138l.727-.853a2 2 0 0 0 0-2.594l-.726-.852a2 2 0 0 1-.472-1.138l-.089-1.116a2 2 0 0 0-1.835-1.835l-1.115-.089a2 2 0 0 1-1.138-.471L9.299.478Zm-2.253 8.08 3.79-3.77 1.337 1.328-5.127 5.097-1.336-1.328L3.83 8.014l1.336-1.33 1.882 1.873Z'
        clipRule='evenodd'
      />
    </svg>
  )
})

SvgVerificationBadge16.displayName = 'SvgVerificationBadge16'
export default SvgVerificationBadge16
