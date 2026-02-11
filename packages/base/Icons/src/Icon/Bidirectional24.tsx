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
const SvgBidirectional24 = forwardRef(function SvgBidirectional24(
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
        d='M11.28.023a52.57 52.57 0 0 1-.58.06c-.889.089-1.965.346-2.94.702-.529.194-1.658.756-2.159 1.075A12.338 12.338 0 0 0 1.86 5.601C1.541 6.102.979 7.231.785 7.76a13.357 13.357 0 0 0-.71 2.94A14.45 14.45 0 0 0 .022 12c0 .944.047 1.442.219 2.32.208 1.058.516 1.96 1.018 2.98.627 1.277 1.227 2.109 2.28 3.161 1.052 1.053 1.884 1.653 3.161 2.28 1.02.502 1.922.81 2.98 1.018.873.171 1.374.218 2.32.218.946 0 1.447-.047 2.32-.218a11.431 11.431 0 0 0 2.98-1.018c1.277-.627 2.109-1.227 3.161-2.28 1.053-1.052 1.653-1.884 2.28-3.161a12.066 12.066 0 0 0 1.184-4c.067-.566.067-2.034 0-2.6a12.066 12.066 0 0 0-1.184-4c-.627-1.277-1.227-2.109-2.28-3.161-1.052-1.053-1.884-1.653-3.161-2.28A11.873 11.873 0 0 0 13.46.096c-.43-.055-1.902-.105-2.18-.073m2.222 1.073c1.342.2 2.376.531 3.558 1.137 2.926 1.502 5.072 4.339 5.719 7.562.168.834.2 1.186.2 2.205 0 1.532-.213 2.707-.725 4-1.382 3.487-4.426 6.052-8.049 6.779-.834.168-1.186.2-2.205.2-1.028 0-1.366-.031-2.24-.206-3.183-.638-6.032-2.8-7.527-5.713-.62-1.208-.965-2.309-1.159-3.7-.07-.505-.07-2.215 0-2.72.194-1.391.539-2.492 1.159-3.7 1.639-3.193 4.883-5.453 8.407-5.857l.52-.06c.309-.035 1.96.016 2.342.073m-4.95 6.076L5.124 9.98l1.938.01L9 10.001v3.998l-1.938.011-1.938.01 3.438 2.813L12 19.645l3.438-2.812 3.438-2.813-1.938-.01L15 13.999v-3.998l1.938-.011 1.938-.01-3.422-2.8a455.97 455.97 0 0 0-3.448-2.808c-.014-.004-1.569 1.256-3.454 2.8m5.52.168 2.004 1.64-1.038.011-1.038.01v5.998l1.038.01 1.038.011-2.005 1.64c-1.102.902-2.034 1.64-2.071 1.64-.037 0-.969-.738-2.071-1.64l-2.005-1.64 1.038-.011 1.038-.01V9.001l-1.038-.01-1.038-.011 2.008-1.648c1.104-.907 2.037-1.645 2.072-1.64.036.004.966.746 2.068 1.648'
      />
    </svg>
  )
})

SvgBidirectional24.displayName = 'SvgBidirectional24'
export default SvgBidirectional24
