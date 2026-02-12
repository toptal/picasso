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
const SvgExit16 = forwardRef(function SvgExit16(
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
        d='M0 8.507V16h5.013v-.987h-4V2h4v-.987H0v7.494m11.133-3.36-.346.347 1.253 1.253L13.293 8H4.985l.008.5L5 9l4.133.007 4.133.007-1.239 1.239-1.24 1.24.36.36.36.36 1.853-1.853 1.853-1.853-1.853-1.854A173.629 173.629 0 0 0 11.493 4.8a6.68 6.68 0 0 0-.36.347'
      />
    </svg>
  )
})

SvgExit16.displayName = 'SvgExit16'
export default SvgExit16
