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
const SvgBackspace16 = forwardRef(function SvgBackspace16(
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
      <path d='M16 3v10H4L0 8l4-5h12Zm-1 1H4.479L1.28 8l3.2 4H15V4Zm-4.5 1.793.707.707-1.5 1.5 1.5 1.5-.707.707-1.5-1.5-1.5 1.5-.707-.707 1.5-1.5-1.5-1.5.707-.707 1.5 1.5 1.5-1.5Z' />
    </svg>
  )
})

SvgBackspace16.displayName = 'SvgBackspace16'
export default SvgBackspace16
