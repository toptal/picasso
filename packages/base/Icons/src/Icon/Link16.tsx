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
const SvgLink16 = forwardRef(function SvgLink16(
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
      <path d='M3 10a3 3 0 0 1-3-3V6a3 3 0 0 1 3-3h5a3 3 0 0 1 3 3h2a3 3 0 0 1 3 3v1a3 3 0 0 1-3 3H8a3 3 0 0 1-3-3H3Zm10-3h-2a3 3 0 0 1-3 3H6a2 2 0 0 0 2 2h5a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2ZM8 4H3a2 2 0 0 0-2 2v1a2 2 0 0 0 2 2h2a3 3 0 0 1 3-3h2a2 2 0 0 0-2-2Zm2 3H8a2 2 0 0 0-2 2h2a2 2 0 0 0 2-2Z' />
    </svg>
  )
})

SvgLink16.displayName = 'SvgLink16'
export default SvgLink16
