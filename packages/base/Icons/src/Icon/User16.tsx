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
const SvgUser16 = forwardRef(function SvgUser16(
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
      <path
        fillRule='evenodd'
        d='M7.47.03a5.038 5.038 0 0 0-4.044 2.951 5.038 5.038 0 0 0 0 4.038 4.708 4.708 0 0 0 1.027 1.489c.351.352.598.55.961.771.174.105.209.137.17.151a7.124 7.124 0 0 0-2.5 1.593c-1.277 1.267-1.985 2.867-2.081 4.704L.989 16H1.992l.019-.3a5.862 5.862 0 0 1 .602-2.327 5.965 5.965 0 0 1 2.76-2.76c.88-.426 1.631-.597 2.627-.597.998 0 1.755.172 2.629.599a5.96 5.96 0 0 1 2.744 2.728c.372.755.563 1.486.616 2.357l.019.3h1.005l-.015-.247c-.085-1.472-.504-2.701-1.301-3.82a7.635 7.635 0 0 0-1.275-1.359c-.574-.462-1.41-.939-2.006-1.144-.039-.014-.004-.046.17-.151a5.005 5.005 0 0 0 2.159-5.847C12.015 1.208 9.809-.214 7.47.03M8.8 1.079c1.627.361 2.838 1.603 3.137 3.216a5.283 5.283 0 0 1 0 1.41 4.034 4.034 0 0 1-3.284 3.243 4.84 4.84 0 0 1-1.306 0 4.034 4.034 0 0 1-3.284-3.243 5.283 5.283 0 0 1 0-1.41C4.374 2.62 5.658 1.356 7.36 1.052c.278-.05 1.168-.033 1.44.027'
      />
    </svg>
  )
})

SvgUser16.displayName = 'SvgUser16'
export default SvgUser16
