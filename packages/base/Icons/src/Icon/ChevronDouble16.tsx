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
const SvgChevronDouble16 = forwardRef(function SvgChevronDouble16(
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
        d='m1.133 1.147-.346.347 3 3 3 2.999-3 3-3 3 .36.36.359.361L4.86 10.86l3.353-3.353L4.86 4.153A564.803 564.803 0 0 0 1.493.8a6.68 6.68 0 0 0-.36.347m7.014 0-.347.347 3 3 3 2.999-3 3-3 3 .353.354.354.353 3.346-3.347L15.2 7.507l-3.354-3.354L8.493.8l-.346.347'
      />
    </svg>
  )
})

SvgChevronDouble16.displayName = 'SvgChevronDouble16'
export default SvgChevronDouble16
