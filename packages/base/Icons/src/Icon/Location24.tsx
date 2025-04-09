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
const SvgLocation24 = forwardRef(function SvgLocation24(
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
      <path d='M19.97 12A8.491 8.491 0 0 0 12 4.03V1h-1v3.03A8.491 8.491 0 0 0 3.03 12H0v1h3.03A8.491 8.491 0 0 0 11 20.97V24h1v-3.03A8.491 8.491 0 0 0 19.97 13H23v-1h-3.03Zm-1 1c-.25 3.74-3.24 6.73-6.97 6.97V17h-1v2.97c-3.74-.25-6.73-3.24-6.97-6.97H7v-1H4.03C4.28 8.26 7.27 5.27 11 5.03V8h1V5.03c3.74.25 6.73 3.24 6.97 6.97H16v1h2.97Z' />
    </svg>
  )
})

SvgLocation24.displayName = 'SvgLocation24'
export default SvgLocation24
