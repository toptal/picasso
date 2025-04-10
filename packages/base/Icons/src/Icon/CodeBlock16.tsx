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
const SvgCodeBlock16 = forwardRef(function SvgCodeBlock16(
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
        d='M15.5 2H11v1h4v10H1V7H0v7h16V2h-.5Zm-12.349.142-2.57 2.5L.213 5l.368.358 2.59 2.52.698-.716L1.647 5l2.202-2.142-.698-.716ZM10.231 5 8.023 2.86l.696-.72 2.58 2.5.37.36-.37.359-2.6 2.52-.696-.718L10.232 5Zm-4.24 2.598 1-5-.981-.196-1 5 .98.196Z'
        clipRule='evenodd'
      />
    </svg>
  )
})

SvgCodeBlock16.displayName = 'SvgCodeBlock16'
export default SvgCodeBlock16
