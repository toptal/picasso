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
const SvgAfternoon24 = forwardRef(function SvgAfternoon24(
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
      <path d='M11.5 17a5.5 5.5 0 1 1 0-11 5.5 5.5 0 0 1 0 11Zm0-1a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM11 0h1v4h-1V0Zm8.278 3.015.707.707-2.828 2.828-.707-.707 2.828-2.828ZM23 11v1h-4v-1h4Zm-3.015 8.278-.707.707-2.828-2.828.707-.707 2.828 2.828ZM12 23h-1v-4h1v4Zm-8.278-3.015-.707-.707 2.828-2.828.707.707-2.828 2.828ZM0 12v-1h4v1H0Zm3.015-8.278.707-.707L6.55 5.843l-.707.707-2.828-2.828Z' />
    </svg>
  )
})

SvgAfternoon24.displayName = 'SvgAfternoon24'
export default SvgAfternoon24
