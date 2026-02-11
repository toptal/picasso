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
const SvgAvgWeeklySpend16 = forwardRef(function SvgAvgWeeklySpend16(
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
        d='M6.987 1v1l-2.38.001h-2.38L1.113 3.674 0 5.347v.2c.001.393.144.876.378 1.275.114.195.605.686.8.8 1.116.654 2.448.433 3.251-.54.313-.379.507-.859.562-1.388l.032-.306-.792-1.187-.791-1.188H6.987v4.122l-.176.033c-.503.095-.963.352-1.252.699-.221.264-.386.746-.386 1.128 0 .362.16.777.401 1.04.256.28.622.493 1.139.661l.274.089v1.034c0 .569-.005 1.034-.011 1.034a3.271 3.271 0 0 1-1.243-.626l-.175-.14-.357.339-.358.338.116.105c.474.43 1.127.778 1.731.924l.263.064c.026.006.034.145.034.582v.574h-4.48V16h10v-.987H8v-1.146h.077c.142 0 .602-.133.816-.237.415-.199.695-.468.881-.843.344-.693.234-1.467-.281-1.99-.294-.298-.77-.552-1.326-.706L8 10.045V8.138l.1.026c.195.051.635.287.815.436.158.131.187.146.227.115l.375-.313.33-.279-.186-.178a2.724 2.724 0 0 0-.724-.503 3.422 3.422 0 0 0-.812-.283L8 7.141V3.013h3.553l-.048.074-.776 1.166L10 5.347v.2c.001.393.144.875.378 1.275.114.195.605.686.8.8 1.116.654 2.448.433 3.251-.54.313-.379.507-.859.562-1.388l.032-.306-1.129-1.694L12.765 2H8V0H6.987v1M3.015 4.175c.279.42.515.78.523.8.012.033-.14.038-1.042.038-.581 0-1.056-.006-1.056-.013 0-.017 1.046-1.587 1.057-1.587.005 0 .238.343.518.762m10 0c.279.42.515.78.523.8.012.033-.14.038-1.042.038-.581 0-1.056-.006-1.056-.013 0-.017 1.046-1.587 1.057-1.587.005 0 .238.343.518.762M3.822 6.193a1.498 1.498 0 0 1-1.343.802 1.461 1.461 0 0 1-1.052-.465c-.14-.148-.334-.448-.334-.516 0-.008.637-.014 1.415-.014h1.415l-.101.193m10 0a1.498 1.498 0 0 1-1.343.802 1.461 1.461 0 0 1-1.052-.465c-.14-.148-.334-.448-.334-.516 0-.008.637-.014 1.415-.014h1.415l-.101.193m-6.835 2.74c0 .531-.01.8-.028.8-.057 0-.365-.143-.5-.232a.755.755 0 0 1-.213-.217c-.062-.106-.072-.153-.071-.324.003-.382.198-.618.637-.775.074-.026.144-.049.155-.05.011-.001.02.358.02.798m1.53 2.355c.23.122.38.284.433.465.112.386-.077.781-.469.98-.114.058-.393.147-.46.147-.012 0-.021-.407-.021-.905v-.906l.18.068c.099.037.251.105.337.151'
      />
    </svg>
  )
})

SvgAvgWeeklySpend16.displayName = 'SvgAvgWeeklySpend16'
export default SvgAvgWeeklySpend16
