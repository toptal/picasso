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
const SvgCurrencyNote16 = forwardRef(function SvgCurrencyNote16(
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
        d='M0 8.013v5h16v-10H0v5m2.933-3.964c0 .087-.13.434-.239.637A2.51 2.51 0 0 1 1.613 5.74a4.193 4.193 0 0 1-.588.207c-.006 0-.012-.438-.012-.974V4h.96c.912 0 .96.002.96.049m9.148.191c.207 1.003.928 1.932 1.861 2.399.204.102.65.252.878.296l.167.032V9.038l-.1.016c-.181.03-.568.145-.762.228-1.026.434-1.821 1.399-2.044 2.478l-.047.227H3.966l-.047-.227c-.223-1.079-1.018-2.044-2.044-2.478a4.488 4.488 0 0 0-.762-.228l-.1-.016V6.967l.167-.032c.228-.044.674-.194.878-.296.457-.229.923-.62 1.237-1.037.29-.385.55-.952.625-1.365.017-.094.036-.185.042-.204.008-.026.829-.032 4.041-.026l4.031.006.047.227m2.906.733c0 .536-.006.974-.012.974-.047 0-.48-.153-.588-.207a2.53 2.53 0 0 1-1.257-1.458c-.107-.313-.205-.282.897-.282h.96v.973m-7.538.08a3.106 3.106 0 0 0-1.572.832 3.002 3.002 0 0 0 .004 4.234c1.04 1.04 2.712 1.171 3.882.304a2.997 2.997 0 0 0 .911-3.78c-.398-.806-1.242-1.434-2.137-1.591a4.17 4.17 0 0 0-1.088.001m1.055 1.012c.224.061.559.233.745.382.454.365.751.98.751 1.553 0 .78-.516 1.553-1.233 1.844A1.976 1.976 0 0 1 6.199 8.84c-.151-.321-.185-.476-.185-.84s.034-.519.185-.84a2.023 2.023 0 0 1 1.47-1.134c.178-.032.658-.01.835.039m-7.128 4.1c.683.244 1.248.829 1.491 1.543.11.325.21.292-.894.292h-.96v-1.948l.074.018c.04.01.17.052.289.095m13.611.862V12h-.96c-1.102 0-1.004.031-.897-.282a2.505 2.505 0 0 1 1.657-1.613c.088-.026.169-.049.18-.05.011-.001.02.436.02.972'
      />
    </svg>
  )
})

SvgCurrencyNote16.displayName = 'SvgCurrencyNote16'
export default SvgCurrencyNote16
