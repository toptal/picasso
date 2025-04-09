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
const SvgImage16 = forwardRef(function SvgImage16(
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
        d='M16 1H0v13h16V1ZM1 11.5V2h14v4.293l-2.5-2.5-6.099 6.099-1.954-.977L1 11.5Zm0 1.25V13h14V7.707l-2.5-2.5-5.901 5.902-2.046-1.024L1 12.75ZM5 5a1 1 0 1 0 0 2 1 1 0 0 0 0-2ZM3 6a2 2 0 1 1 4 0 2 2 0 0 1-4 0Z'
        clipRule='evenodd'
      />
    </svg>
  )
})

SvgImage16.displayName = 'SvgImage16'
export default SvgImage16
