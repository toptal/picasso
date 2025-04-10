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
const SvgBackspace24 = forwardRef(function SvgBackspace24(
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
      <path d='M24 4v16H6l-6-8 6-8h18Zm-1 1H6.5l-5.25 7 5.25 7H23V5Zm-6.5 3.793.707.707-2.5 2.5 2.5 2.5-.707.707-2.5-2.5-2.5 2.5-.707-.707 2.5-2.5-2.5-2.5.707-.707 2.5 2.5 2.5-2.5Z' />
    </svg>
  )
})

SvgBackspace24.displayName = 'SvgBackspace24'
export default SvgBackspace24
