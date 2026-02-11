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
const SvgGrid16 = forwardRef(function SvgGrid16(
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
        d='M0 3.507v3.507l3.5-.007L7 7l.007-3.5.007-3.5H0v3.507M8.993 3.5 9 7l3.5.007 3.5.007V0H8.986l.007 3.5M6 3.507V6H1.013V1.013H6v2.494m8.987 0V6H10V1.013h4.987v2.494M0 12.507V16h7.013V9.013H0v3.494m8.987 0V16H16V9.013H8.987v3.494m-2.987 0v2.506H1.013V10H6v2.507m8.987 0v2.506H10V10h4.987v2.507'
      />
    </svg>
  )
})

SvgGrid16.displayName = 'SvgGrid16'
export default SvgGrid16
