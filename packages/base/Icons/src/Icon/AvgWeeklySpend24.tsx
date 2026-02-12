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
const SvgAvgWeeklySpend24 = forwardRef(function SvgAvgWeeklySpend24(
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
        d='M11 1.5V3H3.212L1.606 5.677C.025 8.311 0 8.357 0 8.567c.001.467.141 1.033.371 1.493.438.877 1.198 1.508 2.177 1.807.315.095.415.107.952.107.537 0 .637-.012.952-.107 1.451-.443 2.439-1.662 2.535-3.131l.024-.364L5.72 6.216A1097.17 1097.17 0 0 1 4.412 4.03C4.403 4.014 5.881 4 7.698 4H11v6.906l-.431.085c-1.47.29-2.308 1.186-2.308 2.469 0 1.177.663 1.888 2.223 2.384l.516.164v3.582l-.19-.035c-.717-.131-1.467-.494-2.161-1.044l-.25-.199-.36.328a8.518 8.518 0 0 0-.359.339c0 .035.638.527.93.718.632.412 1.42.728 2.068.83l.322.051V23H4v1h15v-1h-7v-2.395l.19-.024c.68-.084 1.373-.344 1.806-.678.656-.505 1.034-1.42.922-2.234-.156-1.142-.966-1.867-2.588-2.316l-.33-.091v-3.346l.15.026c.535.092 1.26.45 1.664.822l.244.224.373-.32.374-.32-.172-.177c-.58-.594-1.533-1.066-2.483-1.229l-.15-.026V4h3.302c1.817 0 3.295.013 3.286.03l-1.302 2.176C16.026 8.31 16 8.357 16 8.566c.001.468.141 1.033.371 1.494.438.877 1.198 1.508 2.177 1.807.315.095.415.107.952.107.537 0 .637-.012.952-.107 1.451-.443 2.439-1.662 2.535-3.131l.024-.364L21.4 5.686 19.788 3H12V0h-1v1.5M4.556 6.24 5.6 7.98l-1.037.011a122.5 122.5 0 0 1-2.1 0L1.4 7.98l1.049-1.748a98.087 98.087 0 0 1 1.056-1.74c.004.004.477.791 1.051 1.748m16 0L21.6 7.98l-1.037.011a122.5 122.5 0 0 1-2.1 0L17.4 7.98l1.049-1.748a98.087 98.087 0 0 1 1.056-1.74c.004.004.477.791 1.051 1.748M5.894 9.21c-.244.83-.939 1.491-1.798 1.711-1.27.325-2.619-.448-2.99-1.711L1.044 9h4.912l-.062.21m16 0c-.244.83-.939 1.491-1.798 1.711-1.27.325-2.619-.448-2.99-1.711L17.044 9h4.912l-.062.21M11 13.443v1.523l-.13-.028c-.248-.053-.84-.311-1.075-.468-.433-.289-.58-.59-.544-1.112.046-.68.489-1.151 1.277-1.357.16-.042.333-.078.382-.079l.09-.002v1.523m1.378 2.956c1.034.35 1.499.772 1.566 1.422.048.461-.179 1.01-.535 1.292-.228.181-.62.354-.962.426-.503.105-.447.307-.447-1.599 0-.913.006-1.66.012-1.66.007 0 .172.054.366.119'
      />
    </svg>
  )
})

SvgAvgWeeklySpend24.displayName = 'SvgAvgWeeklySpend24'
export default SvgAvgWeeklySpend24
