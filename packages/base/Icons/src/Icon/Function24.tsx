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
const SvgFunction24 = forwardRef(function SvgFunction24(
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
      <path d='M11.5 1a3.5 3.5 0 0 1 .5 6.964V12h8v5h3v7h-7v-7h3v-4H4v4h3v7H0v-7h3v-5h8V7.965A3.5 3.5 0 0 1 11.5 1ZM22 18h-5v5h5v-5ZM6 18H1v5h5v-5Zm5.5-16a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5Z' />
    </svg>
  )
})

SvgFunction24.displayName = 'SvgFunction24'
export default SvgFunction24
