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
const SvgVideo24 = forwardRef(function SvgVideo24(
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
      viewBox='0 0 24 24'
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
        d='M0 12v9h24V3H0v9m23 0v8H1V4h22v8M9 12v4.009l.09-.057c.049-.032 1.615-.929 3.48-1.993 1.864-1.065 3.39-1.946 3.39-1.959 0-.013-1.526-.894-3.39-1.959a652.318 652.318 0 0 1-3.48-1.993L9 7.991V12m4.958 0c.001.011-.795.475-1.768 1.03l-1.98 1.131-.21.121V9.726l1.979 1.127c1.088.62 1.979 1.136 1.979 1.147'
      />
    </svg>
  )
})

SvgVideo24.displayName = 'SvgVideo24'
export default SvgVideo24
