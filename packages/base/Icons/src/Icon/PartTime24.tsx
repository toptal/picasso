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
const SvgPartTime24 = forwardRef(function SvgPartTime24(
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
      <path d='M11.5 1C17.299 1 22 5.701 22 11.5c0 .168-.004.335-.012.5h-1A9.5 9.5 0 1 0 12 20.987v1.001c-.166.008-.333.012-.501.012C5.701 22 1 17.299 1 11.5S5.701 1 11.5 1Zm6.368 13.261c1.309 0 1.869 1.232 1.869 2.408s-.56 2.415-1.869 2.415-1.869-1.239-1.869-2.415.56-2.408 1.869-2.408Zm-4.312 0c.903 0 1.694.511 1.694 1.442 0 .76-.616 1.449-1.621 2.25l-.423.326h2.072V19h-3.381v-.644c1.813-1.372 2.52-1.981 2.52-2.653 0-.49-.42-.714-.847-.714-.546 0-.966.224-1.26.56l-.476-.539c.413-.497 1.071-.749 1.722-.749Zm7.679.07v1.75a1.616 1.616 0 0 1 1.197-.546c.728 0 1.092.378 1.092 1.071V19h-.735v-2.128c0-.525-.273-.686-.686-.686-.371 0-.693.224-.868.455V19H20.5v-4.669h.735Zm-3.367.658c-.763 0-1.036.791-1.036 1.68 0 .889.273 1.687 1.036 1.687s1.036-.798 1.036-1.687-.273-1.68-1.036-1.68ZM12 4v8H6v-1h5V4h1Z' />
    </svg>
  )
})

SvgPartTime24.displayName = 'SvgPartTime24'
export default SvgPartTime24
