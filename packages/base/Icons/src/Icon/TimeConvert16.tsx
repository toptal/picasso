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
const SvgTimeConvert16 = forwardRef(function SvgTimeConvert16(
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
      <path d='M16 12a4 4 0 0 1-7 2.647V16H8v-3h3v1H9.764a3 3 0 0 0 5.23-1.825L15 12h1zM7.5 0a7.5 7.5 0 0 1 7.484 7H13.98A6.5 6.5 0 1 0 7 13.981v1.003A7.5 7.5 0 0 1 7.5 0zM16 8v3h-3v-1h1.236a3 3 0 0 0-5.231 1.824L9 12H8a4 4 0 0 1 7.002-2.645L15 8h1zM8 2v6H4V7h3V2h1z' />
    </svg>
  )
})

SvgTimeConvert16.displayName = 'SvgTimeConvert16'
export default SvgTimeConvert16
