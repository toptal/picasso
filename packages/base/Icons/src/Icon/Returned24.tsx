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
const SvgReturned24 = forwardRef(function SvgReturned24(
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
        d='M8.046 2.329 4.08 4.615l.01 4.562.01 4.563 3.92 2.269c2.48 1.436 3.951 2.265 4.003 2.257.046-.007 1.842-1.028 3.991-2.269l3.906-2.256-.01-4.575-.01-4.574-3.78-2.178A8524.57 8524.57 0 0 1 12.176.14l-.164-.096-3.966 2.285m7.161.711c1.723.993 3.146 1.819 3.163 1.835.033.032-2.647 1.592-2.704 1.573-.021-.007-1.457-.842-3.192-1.855L9.319 2.749l.871-.501a202.19 202.19 0 0 0 1.33-.771c.253-.149.481-.264.507-.257.025.008 1.456.827 3.18 1.82m-3.739 2.122a361.417 361.417 0 0 1 3.179 1.87c.014.016-.489.325-1.119.688l-1.331.768-.186.107-3.174-1.833C7.091 5.753 5.658 4.913 5.653 4.894c-.006-.023 2.474-1.49 2.655-1.57.004-.002 1.426.825 3.16 1.838m7.419 8.007c-.037.037-6.323 3.671-6.35 3.671-.009 0-.017-1.662-.017-3.693V9.454l3.19-1.842 3.19-1.843.01 3.684c.006 2.025-.005 3.698-.023 3.716M8.345 7.63l3.173 1.83.001 3.69c.001 2.03-.011 3.69-.026 3.69s-1.455-.823-3.199-1.83l-3.172-1.83-.001-3.69c-.001-2.03.011-3.69.025-3.69.014 0 1.454.823 3.199 1.83M5.417 19.335 3.86 20.874l1.55 1.553 1.549 1.552.361-.359.361-.359-.93-.93-.93-.931h4.083c2.245 0 5.301-.012 6.789-.027l2.707-.026v-.981l-6.81.021-6.81.022.95-.955.951-.955-.354-.352-.354-.352-1.556 1.54'
      />
    </svg>
  )
})

SvgReturned24.displayName = 'SvgReturned24'
export default SvgReturned24
