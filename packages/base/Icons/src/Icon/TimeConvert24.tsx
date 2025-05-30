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
const SvgTimeConvert24 = forwardRef(function SvgTimeConvert24(
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
      <path d='M24 18a6 6 0 0 1-11.001 3.316L13 24h-1v-4h4v1l-2 .002a5 5 0 0 0 8.995-2.785L23 18h1zM11.5 1c5.631 0 10.227 4.433 10.488 10h-1A9.501 9.501 0 0 0 11.5 2 9.5 9.5 0 0 0 2 11.5c0 5.08 3.986 9.227 9 9.487v1.001C5.433 21.728 1 17.131 1 11.5 1 5.701 5.701 1 11.5 1zM24 12v4h-4v-1h2a5 5 0 0 0-8.996 2.784L13 18h-1a6 6 0 0 1 11.001-3.316L23 12h1zM12 4v8H6v-1h5V4h1z' />
    </svg>
  )
})

SvgTimeConvert24.displayName = 'SvgTimeConvert24'
export default SvgTimeConvert24
