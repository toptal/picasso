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
const SvgNumericalAnalysis24 = forwardRef(function SvgNumericalAnalysis24(
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
      <path d='M23 1v22H1V1h22Zm-1 1H2v20h20V2Zm-5 17v1h-1v-1h1Zm-7.379-5.328.707.707-2.12 2.121 2.12 2.121-.707.707-2.121-2.12-2.121 2.12-.707-.707 2.12-2.121-2.12-2.121.707-.707 2.121 2.12 2.121-2.12ZM20 16v1h-7v-1h7Zm-3-3v1h-1v-1h1ZM8 4v3h3v1H8v3H7V8H4V7h3V4h1Zm12 3v1h-7V7h7Z' />
    </svg>
  )
})

SvgNumericalAnalysis24.displayName = 'SvgNumericalAnalysis24'
export default SvgNumericalAnalysis24
