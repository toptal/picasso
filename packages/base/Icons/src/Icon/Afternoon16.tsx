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
const SvgAfternoon16 = forwardRef(function SvgAfternoon16(
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
      <path d='M7.5 11a3.5 3.5 0 1 1 0-7 3.5 3.5 0 0 1 0 7Zm0-1a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5ZM7 0h1v3H7V0Zm5.45 1.843.707.707-2.121 2.122-.708-.708 2.122-2.12ZM15 7v1h-3V7h3Zm-1.843 5.45-.707.707-2.122-2.121.708-.708 2.12 2.122ZM8 15H7v-3h1v3Zm-5.45-1.843-.707-.707 2.121-2.122.708.708-2.122 2.12ZM0 8V7h3v1H0Zm1.843-5.45.707-.707 2.122 2.121-.708.708-2.12-2.122Z' />
    </svg>
  )
})

SvgAfternoon16.displayName = 'SvgAfternoon16'
export default SvgAfternoon16
