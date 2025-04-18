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
const SvgProject16 = forwardRef(function SvgProject16(
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
      <path d='M16 0v16H0V0h16Zm-1 1H1v14h14V1Zm-1 13H2V7h12v7Zm-1-1v-2h-2v2h2Zm-3-2H6v2h4v-2Zm-5 0H3v2h2v-2Zm8-1V8h-2v2h2Zm-3-2H6v2h4V8ZM5 8H3v2h2V8Zm2-4v1H2V4h5ZM6 2v1H2V2h4Z' />
    </svg>
  )
})

SvgProject16.displayName = 'SvgProject16'
export default SvgProject16
