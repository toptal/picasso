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
const SvgTwitter24 = forwardRef(function SvgTwitter24(
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
      <path d='M13.976 10.162 22.72 0h-2.072l-7.591 8.824L6.993 0H0l9.168 13.343L0 24h2.072l8.016-9.318L16.491 24h6.993l-9.508-13.838Zm-2.838 3.299-.928-1.329L2.818 1.56H6l5.965 8.532.93 1.329 7.753 11.09h-3.182l-6.328-9.05Z' />
    </svg>
  )
})

SvgTwitter24.displayName = 'SvgTwitter24'
export default SvgTwitter24
