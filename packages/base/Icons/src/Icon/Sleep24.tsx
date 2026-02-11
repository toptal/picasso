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
const SvgSleep24 = forwardRef(function SvgSleep24(
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
      <path
        fillRule='evenodd'
        d='M16.04 1.5v.499l2.78.011 2.78.01-2.8 4.667-2.8 4.666V12h7v-1h-2.803c-1.542 0-2.798-.014-2.79-.032.007-.017 1.268-2.122 2.803-4.676L23 1.649V1h-6.96v.5m-8 8v.5h4.555l-2.297 3.676L8 17.352V18h6v-1H9.405l2.297-3.676L14 9.648V9H8.04v.5m-7 7v.5h3.52l-1.78 2.67L1 22.34V23h5v-1H2.44l1.78-2.67L6 16.66V16H1.04v.5'
      />
    </svg>
  )
})

SvgSleep24.displayName = 'SvgSleep24'
export default SvgSleep24
