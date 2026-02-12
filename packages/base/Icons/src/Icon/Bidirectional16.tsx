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
const SvgBidirectional16 = forwardRef(function SvgBidirectional16(
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
        d='M7.52.015a32.85 32.85 0 0 1-.387.04 8.45 8.45 0 0 0-1.96.469c-.352.129-1.105.503-1.439.716A8.218 8.218 0 0 0 1.24 3.734a10.362 10.362 0 0 0-.716 1.439 8.86 8.86 0 0 0-.474 1.96C.03 7.295.015 7.685.015 8c0 .629.031.962.146 1.547.138.705.344 1.306.678 1.986.418.851.819 1.406 1.52 2.108.702.701 1.257 1.102 2.108 1.52.68.334 1.281.54 1.986.678A6.84 6.84 0 0 0 8 15.985a6.84 6.84 0 0 0 1.547-.146 7.619 7.619 0 0 0 1.986-.678c.851-.418 1.406-.819 2.108-1.52.701-.702 1.102-1.257 1.52-2.108a8.029 8.029 0 0 0 .789-2.666c.045-.378.045-1.356 0-1.734a8.029 8.029 0 0 0-.789-2.666c-.418-.851-.819-1.406-1.52-2.108-.702-.701-1.257-1.102-2.108-1.52a7.929 7.929 0 0 0-2.56-.775C8.687.027 7.705-.006 7.52.015m1.36 1.041c1.229.143 2.509.687 3.52 1.494.291.232.818.759 1.05 1.05.608.761 1.109 1.761 1.336 2.666.149.598.207 1.079.207 1.734 0 1.139-.216 2.074-.712 3.08a6.653 6.653 0 0 1-1.333 1.868 6.653 6.653 0 0 1-1.868 1.333c-1.011.498-1.945.713-3.093.711a6.654 6.654 0 0 1-3.067-.71 6.673 6.673 0 0 1-1.868-1.334 6.668 6.668 0 0 1-1.334-1.868c-.49-.994-.71-1.949-.71-3.08s.22-2.086.71-3.08a6.668 6.668 0 0 1 1.334-1.868A6.633 6.633 0 0 1 4.92 1.719c1.254-.616 2.529-.829 3.96-.663M5.647 4.633a197.933 197.933 0 0 0-2.34 2.36c0 .011.606.02 1.346.02H6v2H3.293l2.354 2.354L8 13.72l2.353-2.353 2.354-2.354H10v-2h1.347c.74 0 1.346-.009 1.346-.02 0-.022-4.671-4.7-4.693-4.7-.007 0-1.066 1.053-2.353 2.34m3.5.234L10.28 6H8.987v4H10.28l-1.14 1.14L8 12.28l-1.14-1.14L5.72 10H7.013V6H5.72l1.133-1.133A72.642 72.642 0 0 1 8 3.733c.007 0 .523.51 1.147 1.134'
      />
    </svg>
  )
})

SvgBidirectional16.displayName = 'SvgBidirectional16'
export default SvgBidirectional16
