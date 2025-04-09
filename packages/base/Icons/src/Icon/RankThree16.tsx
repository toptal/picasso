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
const SvgRankThree16 = forwardRef(function SvgRankThree16(
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
      <path d='m8 8.882 6.198 4.508-.588.808L8 10.118l-5.61 4.08-.588-.808L8 8.882Zm0-4 6.198 4.508-.588.808L8 6.118l-5.61 4.08-.588-.808L8 4.882Zm0-4 6.198 4.508-.588.808L8 2.118l-5.61 4.08-.588-.808L8 .882Z' />
    </svg>
  )
})

SvgRankThree16.displayName = 'SvgRankThree16'
export default SvgRankThree16
