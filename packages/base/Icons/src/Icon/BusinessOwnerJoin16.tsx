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
const SvgBusinessOwnerJoin16 = forwardRef(function SvgBusinessOwnerJoin16(
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
        d='M2 3v1h1.013v-.987H14V14H3.013v-.987H2v2l6.5-.006L15 15l.007-6.5.006-6.5H2v1m4.14 2.153-.353.353 1.246 1.247L8.28 8H0v1.013h8.28L7.033 10.26l-1.247 1.247.354.353.354.353 1.86-1.86 1.859-1.86-1.846-1.846A172.469 172.469 0 0 0 6.506 4.8c-.007 0-.172.159-.366.353'
      />
    </svg>
  )
})

SvgBusinessOwnerJoin16.displayName = 'SvgBusinessOwnerJoin16'
export default SvgBusinessOwnerJoin16
