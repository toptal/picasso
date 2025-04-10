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
const SvgPendingQueue16 = forwardRef(function SvgPendingQueue16(
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
      <path d='M10 13h2.18c-1.22 1.26-2.9 2-4.68 2C3.92 15 1 12.08 1 8.5c0-.31.02-.62.07-.93l-.99-.14C.03 7.78 0 8.14 0 8.5 0 12.64 3.36 16 7.5 16c2.1 0 4.09-.89 5.5-2.41V16h1v-4h-4v1ZM5 8.5C5 7.67 4.33 7 3.5 7S2 7.67 2 8.5 2.67 10 3.5 10 5 9.33 5 8.5Zm-2 0c0-.28.22-.5.5-.5s.5.22.5.5-.22.5-.5.5-.5-.22-.5-.5Zm6 0C9 7.67 8.33 7 7.5 7S6 7.67 6 8.5 6.67 10 7.5 10 9 9.33 9 8.5Zm-2 0c0-.28.22-.5.5-.5s.5.22.5.5-.22.5-.5.5-.5-.22-.5-.5Zm6 0c0-.83-.67-1.5-1.5-1.5S10 7.67 10 8.5s.67 1.5 1.5 1.5S13 9.33 13 8.5Zm-2 0c0-.28.22-.5.5-.5s.5.22.5.5-.22.5-.5.5-.5-.22-.5-.5ZM7.5 1C5.4 1 3.41 1.89 2 3.41V1H1v4h4V4H2.82c1.22-1.26 2.9-2 4.68-2C11.08 2 14 4.92 14 8.5c0 .31-.02.62-.07.93l.99.14c.05-.35.08-.71.08-1.07C15 4.36 11.64 1 7.5 1Z' />
    </svg>
  )
})

SvgPendingQueue16.displayName = 'SvgPendingQueue16'
export default SvgPendingQueue16
