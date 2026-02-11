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
const SvgRemovedUser24 = forwardRef(function SvgRemovedUser24(
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
        d='M11.26 1.044a7.042 7.042 0 0 0-4.968 2.908 8.172 8.172 0 0 0-.852 1.609 7 7 0 0 0 2.19 7.899l.427.342.352-.351c.193-.192.347-.362.341-.376a3.285 3.285 0 0 0-.34-.271c-1.154-.853-1.98-2.165-2.295-3.644-.129-.605-.129-1.715 0-2.32.529-2.482 2.378-4.287 4.865-4.75.55-.103 1.632-.09 2.18.026a6.063 6.063 0 0 1 3.605 2.249c.339.473.259.467.674.054l.363-.362-.285-.358A6.087 6.087 0 0 0 16.5 2.648a7 7 0 0 0-5.24-1.604m.389 10.607-9.85 9.85.351.349.351.349 9.85-9.85 9.85-9.85-.351-.349-.351-.349-9.85 9.85m6.825-3.982-.465.471-.049.457a5.738 5.738 0 0 1-.6 2.083 6.021 6.021 0 0 1-4.91 3.304l-.322.027-.514.515-.513.514.539-.025a7.987 7.987 0 0 1 7.542 4.485c.457.934.696 1.82.785 2.91l.049.59H21v-.236c0-1.102-.367-2.587-.916-3.709-1.061-2.167-2.858-3.747-5.224-4.591-.063-.023.01-.075.36-.258a6.968 6.968 0 0 0 3.563-4.48c.183-.705.275-1.886.185-2.377l-.028-.151-.466.471M3.579 22.561 3.141 23h.847l.028-.425c.015-.234.021-.431.014-.439-.008-.007-.211.184-.451.425'
      />
    </svg>
  )
})

SvgRemovedUser24.displayName = 'SvgRemovedUser24'
export default SvgRemovedUser24
