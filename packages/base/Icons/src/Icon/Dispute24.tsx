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
const SvgDispute24 = forwardRef(function SvgDispute24(
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
      <path d='M8.5.793 15.207 7.5l-.707.707-.5-.5-2.793 2.793 1.147 1.147L13 11l10 10-2 2-10-10 .647-.646-1.147-1.147L7.707 14l.5.5-.707.707L.793 8.5l.707-.707.5.5L8.293 2l-.5-.5L8.5.793ZM13 12.415l-.585.585L21 21.585l.585-.585L13 12.415ZM9 2.707 2.707 9 7 13.293 13.293 7 9 2.707Z' />
    </svg>
  )
})

SvgDispute24.displayName = 'SvgDispute24'
export default SvgDispute24
