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
const SvgBox24 = forwardRef(function SvgBox24(
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
      <path d='m11.5.997 10.505 5.002v11.997L11.5 23.002 1 17.996V5.999L11.5.997ZM2 7.029v10.336l9.002 4.292V11.316L2 7.029Zm19.004 0-9.002 4.286v10.34l9.002-4.291V7.029ZM11.5 2.104 2.744 6.276l8.757 4.17 8.758-4.17L11.5 2.104Z' />
    </svg>
  )
})

SvgBox24.displayName = 'SvgBox24'
export default SvgBox24
