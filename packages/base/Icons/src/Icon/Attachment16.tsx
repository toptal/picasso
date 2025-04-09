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
const SvgAttachment16 = forwardRef(function SvgAttachment16(
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
      <path d='M8.296 5.333a1.676 1.676 0 0 1 2.456 2.279l-.085.092-3.26 3.259-.592-.593 3.26-3.259a.838.838 0 0 0-1.113-1.25l-.073.065-4.445 4.444a2.095 2.095 0 0 0 2.863 3.058l.1-.095 5.037-5.037a3.352 3.352 0 0 0-4.62-4.856l-.12.116-3.852 3.851-.593-.592 3.852-3.852a4.19 4.19 0 0 1 6.052 5.795l-.126.13L8 13.927a2.933 2.933 0 0 1-4.259-4.031l.11-.117 4.445-4.445Z' />
    </svg>
  )
})

SvgAttachment16.displayName = 'SvgAttachment16'
export default SvgAttachment16
