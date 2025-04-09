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
const SvgVerificationBadge24 = forwardRef(function SvgVerificationBadge24(
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
      viewBox='0 0 26 26'
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
        d='M14.297 1.168a2 2 0 0 0-2.594 0L9.53 3.02a2 2 0 0 1-1.138.472l-2.845.227a2 2 0 0 0-1.835 1.834l-.227 2.845a2 2 0 0 1-.471 1.138l-1.851 2.172a2 2 0 0 0 0 2.595l1.851 2.172a2 2 0 0 1 .471 1.138l.227 2.844a2 2 0 0 0 1.835 1.835l2.845.227a2 2 0 0 1 1.138.471l2.172 1.851a2 2 0 0 0 2.594 0l2.172-1.85a2 2 0 0 1 1.138-.472l2.845-.227a2 2 0 0 0 1.834-1.835l.227-2.844a2 2 0 0 1 .472-1.138l1.85-2.172a2 2 0 0 0 0-2.595l-1.85-2.172a2 2 0 0 1-.472-1.138l-.227-2.845a2 2 0 0 0-1.834-1.834l-2.845-.227a2 2 0 0 1-1.138-.472l-2.172-1.85Zm-2.73 12.669 5.685-5.652 2.003 1.99-7.687 7.644-2.004-1.99-2.821-2.807 2.003-1.993 2.822 2.808Z'
        clipRule='evenodd'
      />
    </svg>
  )
})

SvgVerificationBadge24.displayName = 'SvgVerificationBadge24'
export default SvgVerificationBadge24
