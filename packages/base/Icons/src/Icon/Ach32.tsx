import type { Ref } from 'react'
import React, { forwardRef } from 'react'
import type { StandardProps } from '@toptal/picasso-shared'
import { twMerge } from '@toptal/picasso-tailwind-merge'

import { getColorClass } from './styles'

const BASE_SIZE = 32

type ScaleType = 1 | 2 | 3 | 4
export interface Props extends StandardProps {
  scale?: ScaleType
  color?: string
  base?: number
  classes?: {
    root?: string
  }
}
const SvgAch32 = forwardRef(function SvgAch32(
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
      viewBox='0 0 32 32'
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
      <path d='M25 12v-1h5a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V13a2 2 0 0 1 2-2h6v1H2a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h28a1 1 0 0 0 1-1V13a1 1 0 0 0-1-1h-5ZM14 24h14v1H14v-1Zm4-4h10v1H18v-1Zm-.5-13.793L5 18.707V23h4.293l12.5-12.5L17.5 6.207Zm.707-.707L22.5 9.793 24.793 7.5 20.5 3.207 18.207 5.5ZM4 18.293l16.5-16.5L26.207 7.5 9.707 24H4v-5.707Z' />
    </svg>
  )
})

SvgAch32.displayName = 'SvgAch32'
export default SvgAch32
