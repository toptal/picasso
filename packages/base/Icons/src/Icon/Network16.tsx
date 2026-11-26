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
const SvgNetwork16 = forwardRef(function SvgNetwork16(
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
      <path d='M2.5 8a2.5 2.5 0 1 1 0 5 2.5 2.5 0 1 1 0-5Zm0 1a1.5 1.5 0 1 0 0 3 1.5 1.5 0 1 0 0-3Zm3-9a2.5 2.5 0 1 1 0 5 2.5 2.5 0 1 1 0-5Zm0 1a1.5 1.5 0 1 0 0 3 1.5 1.5 0 1 0 0-3ZM9 5a3 3 0 1 1 0 6 3 3 0 1 1 0-6Zm0 1a2 2 0 1 0 0 4 2 2 0 1 0 0-4Zm4.5 5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 1 1 0-5Zm0 1a1.5 1.5 0 1 0 0 3 1.5 1.5 0 1 0 0-3Zm0-12a2.5 2.5 0 1 1 0 5 2.5 2.5 0 1 1 0-5Zm0 1a1.5 1.5 0 1 0 0 3 1.5 1.5 0 1 0 0-3ZM4.18 9.313l2.32-.89.36.934-2.32.89ZM7.239 6.16l-1.09-1.71.844-.538 1.09 1.71Zm2.955-.405 1.66-2.03.774.632-1.66 2.03Zm.774 3.86 1.66 2.03-.774.633-1.66-2.03Z' />
    </svg>
  )
})

SvgNetwork16.displayName = 'SvgNetwork16'
export default SvgNetwork16
