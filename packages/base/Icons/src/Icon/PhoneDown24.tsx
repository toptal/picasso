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
const SvgPhoneDown24 = forwardRef(function SvgPhoneDown24(
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
      <path d='M22.082 10.043c1.1.464 1.835 1.529 1.91 2.734l.006.202.002 2.526c0 .776-.574 1.413-1.31 1.485l-.14.006-4.122.003c-.754 0-1.373-.591-1.443-1.348l-.007-.143-.001-1.831-.95-.15a28.433 28.433 0 0 0-8.06 0l-.945.149.002 1.83c0 .776-.574 1.412-1.31 1.484l-.14.007L1.452 17C.698 17 .08 16.409.008 15.652l-.006-.144L0 12.983c0-1.288.752-2.447 1.913-2.935a25.878 25.878 0 0 1 20.17-.005Zm-19.335.743-.445.183c-.734.309-1.233 1.02-1.295 1.836L1 12.982l.002 2.525c0 .248.164.445.37.485l.08.008 4.123-.003c.215 0 .402-.168.441-.401l.008-.09-.002-2.683 1.166-.187a29.412 29.412 0 0 1 8.35-.18l.643.084 1.795.281.002 2.686c0 .248.164.444.37.485l.08.007 4.123-.003c.215 0 .403-.168.442-.4l.007-.09-.002-2.526c0-.89-.518-1.684-1.305-2.015a24.874 24.874 0 0 0-18.946-.179Z' />
    </svg>
  )
})

SvgPhoneDown24.displayName = 'SvgPhoneDown24'
export default SvgPhoneDown24
