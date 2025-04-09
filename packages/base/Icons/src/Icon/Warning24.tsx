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
const SvgWarning24 = forwardRef(function SvgWarning24(
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
        d='M10.333 2.465c.736-1.287 2.598-1.287 3.334 0l9.829 17.181c.728 1.273-.196 2.854-1.667 2.854H2.17C.7 22.5-.224 20.919.504 19.646l9.829-17.181Zm2.5.472a.961.961 0 0 0-1.667 0L1.338 20.118a.955.955 0 0 0 .833 1.427H21.83a.955.955 0 0 0 .833-1.427L12.834 2.937ZM11.5 7h1v8.662h-1V7Zm1 10.1h-1v1h1v-1Z'
        clipRule='evenodd'
      />
    </svg>
  )
})

SvgWarning24.displayName = 'SvgWarning24'
export default SvgWarning24
