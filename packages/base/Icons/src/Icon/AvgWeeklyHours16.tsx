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
const SvgAvgWeeklyHours16 = forwardRef(function SvgAvgWeeklyHours16(
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
        d='M6.987 1v1l-2.38.001h-2.38L1.113 3.674 0 5.347v.2c.001.393.144.876.378 1.275.114.195.605.686.8.8 1.116.654 2.448.433 3.251-.54.313-.379.507-.859.562-1.388l.032-.306-.792-1.187-.791-1.188H6.987V7.04h-.056a4.563 4.563 0 0 0-2.803 1.483 4.514 4.514 0 0 0-.901 4.388c.109.339.388.889.606 1.196.099.139.321.396.494.57.172.175.313.322.313.327 0 .005-.48.009-1.067.009H2.507V16h10v-.987H10.336l.285-.28c.946-.935 1.423-2.122 1.371-3.413a4.474 4.474 0 0 0-1.808-3.427c-.578-.428-1.305-.737-1.961-.831L8 7.029V3.013h3.553l-.048.074-.776 1.166L10 5.347v.2c.001.393.144.875.378 1.275.114.195.605.686.8.8 1.116.654 2.448.433 3.251-.54.313-.379.507-.859.562-1.388l.032-.306-1.129-1.694L12.765 2H8V0H6.987v1M3.015 4.175c.279.42.515.78.523.8.012.033-.14.038-1.042.038-.581 0-1.056-.006-1.056-.013 0-.017 1.046-1.587 1.057-1.587.005 0 .238.343.518.762m10 0c.279.42.515.78.523.8.012.033-.14.038-1.042.038-.581 0-1.056-.006-1.056-.013 0-.017 1.046-1.587 1.057-1.587.005 0 .238.343.518.762M3.822 6.193a1.498 1.498 0 0 1-1.343.802 1.461 1.461 0 0 1-1.052-.465c-.14-.148-.334-.448-.334-.516 0-.008.637-.014 1.415-.014h1.415l-.101.193m10 0a1.498 1.498 0 0 1-1.343.802 1.461 1.461 0 0 1-1.052-.465c-.14-.148-.334-.448-.334-.516 0-.008.637-.014 1.415-.014h1.415l-.101.193M8.267 8.09c.673.155 1.207.45 1.695.936.532.53.866 1.175.986 1.903.066.4.043 1.036-.051 1.408-.25.993-.93 1.84-1.844 2.296a3.492 3.492 0 0 1-4.119-.759 3.47 3.47 0 0 1-.857-1.663 4.13 4.13 0 0 1-.015-1.363 3.523 3.523 0 0 1 2.991-2.82 4.378 4.378 0 0 1 1.214.062m-1.28 1.923v1H6V12h2V9.013H6.987v1'
      />
    </svg>
  )
})

SvgAvgWeeklyHours16.displayName = 'SvgAvgWeeklyHours16'
export default SvgAvgWeeklyHours16
