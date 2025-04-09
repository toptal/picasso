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
const SvgEye24 = forwardRef(function SvgEye24(
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
      <path d='M12 4c4.418 0 8.418 2.667 12 8-3.582 5.333-7.582 8-12 8s-8.418-2.667-12-8c3.582-5.333 7.582-8 12-8Zm0 1C8.155 5 4.605 7.241 1.332 11.833L1.214 12l.118.167c3.19 4.474 6.641 6.717 10.373 6.829L12 19c3.845 0 7.395-2.241 10.668-6.833l.117-.167-.117-.167c-3.19-4.474-6.641-6.717-10.373-6.829L12 5Zm0 2a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 1a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z' />
    </svg>
  )
})

SvgEye24.displayName = 'SvgEye24'
export default SvgEye24
