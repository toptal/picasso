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
const SvgDialpad16 = forwardRef(function SvgDialpad16(
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
      <path d='M7.5 12a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm0 1a.5.5 0 1 0 0 1 .5.5 0 0 0 0-1Zm-5-5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm5 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm5 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm-10 1a.5.5 0 1 0 0 1 .5.5 0 0 0 0-1Zm5 0a.5.5 0 1 0 0 1 .5.5 0 0 0 0-1Zm5 0a.5.5 0 1 0 0 1 .5.5 0 0 0 0-1Zm-10-5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm5 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm5 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm-10 1a.5.5 0 1 0 0 1 .5.5 0 0 0 0-1Zm5 0a.5.5 0 1 0 0 1 .5.5 0 0 0 0-1Zm5 0a.5.5 0 1 0 0 1 .5.5 0 0 0 0-1Zm-10-5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm5 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm5 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm-10 1a.5.5 0 1 0 0 1 .5.5 0 0 0 0-1Zm5 0a.5.5 0 1 0 0 1 .5.5 0 0 0 0-1Zm5 0a.5.5 0 1 0 0 1 .5.5 0 0 0 0-1Z' />
    </svg>
  )
})

SvgDialpad16.displayName = 'SvgDialpad16'
export default SvgDialpad16
