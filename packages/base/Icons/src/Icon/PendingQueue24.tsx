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
const SvgPendingQueue24 = forwardRef(function SvgPendingQueue24(
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
      <path d='M15 19h3.98c-1.88 2.51-4.8 4-7.98 4-5.51 0-10-4.49-10-10 0-.8.1-1.61.29-2.38l-.97-.24C.11 11.23.01 12.11.01 13c0 6.07 4.93 11 11 11 3.63 0 6.94-1.76 9-4.71V24h1v-6h-6v1Zm-8-6c0-1.1-.9-2-2-2s-2 .9-2 2 .9 2 2 2 2-.9 2-2Zm-3 0c0-.55.45-1 1-1s1 .45 1 1-.45 1-1 1-1-.45-1-1Zm9 0c0-1.1-.9-2-2-2s-2 .9-2 2 .9 2 2 2 2-.9 2-2Zm-3 0c0-.55.45-1 1-1s1 .45 1 1-.45 1-1 1-1-.45-1-1Zm9 0c0-1.1-.9-2-2-2s-2 .9-2 2 .9 2 2 2 2-.9 2-2Zm-3 0c0-.55.45-1 1-1s1 .45 1 1-.45 1-1 1-1-.45-1-1ZM11 2C7.94 2 5.08 3.26 3 5.47V1H2v6h6V6H3.86C5.73 4.08 8.28 3 11 3c5.51 0 10 4.49 10 10 0 .8-.1 1.61-.29 2.38l.97.24c.21-.85.31-1.73.31-2.62 0-6.07-4.93-11-11-11Z' />
    </svg>
  )
})

SvgPendingQueue24.displayName = 'SvgPendingQueue24'
export default SvgPendingQueue24
