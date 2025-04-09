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
const SvgAward24 = forwardRef(function SvgAward24(
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
      <path d='M12 0a8 8 0 0 1 5 14.245V24l-5-3-5 3v-9.754A8 8 0 0 1 12 0Zm0 16a7.963 7.963 0 0 1-4-1.07v7.303l4-2.4 4 2.401.001-7.305A7.963 7.963 0 0 1 12 16Zm0-15a7 7 0 1 0 0 14 7 7 0 0 0 0-14Z' />
    </svg>
  )
})

SvgAward24.displayName = 'SvgAward24'
export default SvgAward24
