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
const SvgBellOff24 = forwardRef(function SvgBellOff24(
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
      <path d='M10 21v.5a1.5 1.5 0 0 0 3 0V21h1v.5a2.5 2.5 0 1 1-5 0V21h1ZM21.5 1.793l.707.707L2.5 22.207l-.707-.707L21.5 1.793ZM20 10.5V18a1 1 0 0 0 1 1v1H6.12l1-1h12.148A1.99 1.99 0 0 1 19 18v-7.5c0-1-.196-1.954-.55-2.826l.759-.76A8.468 8.468 0 0 1 20 10.5ZM12 0v2.014a8.471 8.471 0 0 1 5.45 2.415l-.708.707A7.5 7.5 0 0 0 4 10.5v7.378l-2 2V19a1 1 0 0 0 1-1v-7.5a8.5 8.5 0 0 1 8-8.486V0h1Z' />
    </svg>
  )
})

SvgBellOff24.displayName = 'SvgBellOff24'
export default SvgBellOff24
