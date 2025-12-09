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
const SvgShield16 = forwardRef(function SvgShield16(
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
        'stroke-current inline-block text-inherit h-[1em] align-[-.125em]',
        classes?.root,
        className,
        getColorClass(color)
      )}
      style={svgStyle}
      ref={ref}
      data-testid={testId}
    >
      <path d="M19 21H0V2H19V21ZM7.61914 17.1182L3.53613 15.0771L1 16.7666V20H18V10.1396L15.5586 8.18652L7.61914 17.1182ZM24 3V20H21V19H23V4H21V3H24ZM1 15.5654L3.46387 13.9229L7.38086 15.8818L15.4414 6.81348L18 8.85938V3H1V15.5654ZM6 6C7.65685 6 9 7.34315 9 9C9 10.6569 7.65685 12 6 12C4.34315 12 3 10.6569 3 9C3 7.34315 4.34315 6 6 6ZM6 7C4.89543 7 4 7.89543 4 9C4 10.1046 4.89543 11 6 11C7.10457 11 8 10.1046 8 9C8 7.89543 7.10457 7 6 7Z" />
    </svg>
  )
})

SvgShield16.displayName = 'SvgShield16'
export default SvgShield16
