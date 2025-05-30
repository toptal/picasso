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
const SvgExpand24 = forwardRef(function SvgExpand24(
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
        d='M2 5.5V9h1V3.7l2.95 2.95L8.9 9.6l.35-.35.35-.35-2.95-2.95L3.7 3H9V2H2v3.5m13-3V3h5.3l-2.95 2.95L14.4 8.9l.35.35.35.35 2.95-2.95L21 3.7V9h1V2h-7v.5M5.95 17.35 3 20.3V15H2v7h7v-1H3.7l2.95-2.95 2.951-2.951-.351-.349-.351-.349L5.95 17.35m8.8-2.6-.35.35 2.95 2.95L20.3 21H15v1h7v-7h-1v5.3l-2.95-2.95-2.95-2.95-.35.35'
      />
    </svg>
  )
})

SvgExpand24.displayName = 'SvgExpand24'
export default SvgExpand24
