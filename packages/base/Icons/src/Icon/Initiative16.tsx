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
const SvgInitiative16 = forwardRef(function SvgInitiative16(
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
      <path
        d='M4.5 7.49982L7.9 3.53982L7.89 3.52982C9.34 1.84982 11.36 0.789822 13.54 0.549822C13.6616 0.535744 13.7848 0.549339 13.9004 0.58959C14.016 0.629842 14.121 0.695708 14.2076 0.782263C14.2941 0.868818 14.36 0.973822 14.4002 1.08942C14.4405 1.20502 14.4541 1.32823 14.44 1.44982C14.1985 3.64273 13.1334 5.66215 11.46 7.09982L7.5 10.4998M4.5 7.49982L7.5 10.4998M4.5 7.49982L1.5 4.49982C1.5 4.49982 4.5 2.49982 7.56 3.56982M7.5 10.4998L10.5 13.4998C10.5 13.4998 12.5 10.4998 11.5 7.49982M5.5 11.4998C5.5 11.4998 4.5 12.4998 2.5 12.4998C2.5 10.4998 3.5 9.49982 3.5 9.49982'
        stroke='currentColor'
        strokeWidth='1'
        fill='none'
      />
    </svg>
  )
})

SvgInitiative16.displayName = 'SvgInitiative16'
export default SvgInitiative16
