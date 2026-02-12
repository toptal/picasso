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
const SvgSleep16 = forwardRef(function SvgSleep16(
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
        d='M10.993.5 11 1l1.767.007c.971.004 1.766.013 1.766.02 0 .007-.798 1.211-1.774 2.674l-1.774 2.662.007.318L11 7l2.5.007 2.5.007V6h-1.773c-.976 0-1.774-.006-1.774-.013 0-.008.798-1.211 1.774-2.674L16 .653V0H10.985l.008.5m-6 6L5 7l1.3.013 1.3.014-1.307 2.177-1.306 2.178V12h4.026v-.987H7.704c-1.188 0-1.308-.004-1.293-.042.009-.024.598-1.013 1.309-2.198l1.293-2.155V6H4.985l.008.5M0 11.507V12h.84c.462 0 .84.006.84.013 0 .008-.378.77-.84 1.694L0 15.387V16h3.013v-.987h-.84c-.544 0-.84-.009-.84-.026 0-.015.378-.783.84-1.707l.84-1.68v-.587H0v.494'
      />
    </svg>
  )
})

SvgSleep16.displayName = 'SvgSleep16'
export default SvgSleep16
