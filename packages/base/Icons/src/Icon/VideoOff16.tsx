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
const SvgVideoOff16 = forwardRef(function SvgVideoOff16(
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
      <path d='M12.869 5.252 16 4v8l-4-1.6V13H5.121l1-1H11V7.121l1.869-1.869ZM.879 13H0V3h10.879l-1 1H1v8h.879l-1 1ZM12 6.677v2.646l3 1.2V5.477l-3 1.2Zm-10.5 8.53L.793 14.5 14.5.793l.707.707L1.5 15.207Z' />
    </svg>
  )
})

SvgVideoOff16.displayName = 'SvgVideoOff16'
export default SvgVideoOff16
