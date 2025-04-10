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
const SvgNumericalAnalysis16 = forwardRef(function SvgNumericalAnalysis16(
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
      <path d='M16 0v16H0V0h16Zm-1 1H1v14h14V1Zm-3 12v1h-1v-1h1ZM5.914 9.379l.707.707L5.207 11.5l1.414 1.414-.707.707L4.5 12.207l-1.414 1.414-.707-.707L3.793 11.5l-1.414-1.414.707-.707L4.5 10.793l1.414-1.414ZM14 11v1H9v-1h5Zm-2-2v1h-1V9h1ZM5 2v2h2v1H5v2H4V5H2V4h2V2h1Zm9 2v1H9V4h5Z' />
    </svg>
  )
})

SvgNumericalAnalysis16.displayName = 'SvgNumericalAnalysis16'
export default SvgNumericalAnalysis16
