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
const SvgPresenterMode24 = forwardRef(function SvgPresenterMode24(
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
        d='M0 12v9h24V3H0v9m23 0v8h-9.988l-.025-.353a4.959 4.959 0 0 0-.253-1.25l-.107-.324 2.867-2.867 2.867-2.867-.351-.349-.351-.349-2.759 2.761-2.76 2.761-.14-.171c-.485-.597-1.076-1.099-1.622-1.379-.164-.084-.298-.163-.298-.176 0-.013.094-.084.21-.159.469-.301 1.034-.966 1.308-1.538.853-1.778.283-3.933-1.329-5.028a4.86 4.86 0 0 0-1.331-.599c-.509-.126-1.367-.126-1.876 0a4.86 4.86 0 0 0-1.331.599c-1.614 1.096-2.183 3.249-1.329 5.028.274.572.839 1.237 1.308 1.538.115.075.21.147.21.16 0 .014-.103.076-.23.138-.961.471-1.854 1.432-2.297 2.474a5.949 5.949 0 0 0-.378 1.571L2.988 20H1V4h22v8M8.756 9.097c.337.092.839.35 1.117.574C10.554 10.219 11 11.14 11 12c0 .781-.359 1.603-.948 2.173-1.083 1.047-2.829 1.102-3.972.124-.456-.39-.866-1.05-1.005-1.617-.07-.283-.07-1.077 0-1.36.082-.335.369-.912.589-1.185A3.113 3.113 0 0 1 7.503 9.04c.267-.049.988-.016 1.253.057m.193 7.021c1.679.41 2.878 1.822 3.034 3.572l.028.31H3.99l.028-.329a3.947 3.947 0 0 1 1.161-2.492 3.963 3.963 0 0 1 2.244-1.138c.356-.056 1.145-.016 1.526.077'
      />
    </svg>
  )
})

SvgPresenterMode24.displayName = 'SvgPresenterMode24'
export default SvgPresenterMode24
