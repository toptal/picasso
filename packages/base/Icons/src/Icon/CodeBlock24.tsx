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
const SvgCodeBlock24 = forwardRef(function SvgCodeBlock24(
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
      fill='none'
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
      <path
        fillRule='evenodd'
        d='M23.5 3H16v1h7v16H1V10H0v11h24V3h-.5Zm-18.354.146-4.5 4.5L.293 8l.353.354 4.5 4.5.708-.708L1.707 8l4.147-4.146-.708-.708ZM16.264 8l-4.119-4.147.71-.704 4.47 4.5.35.353-.352.353-4.5 4.5-.707-.708L16.264 8Zm-8.29 4.66 3-9-.948-.317-3 9 .948.316Z'
        clipRule='evenodd'
      />
    </svg>
  )
})

SvgCodeBlock24.displayName = 'SvgCodeBlock24'
export default SvgCodeBlock24
