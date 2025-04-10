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
const SvgQuote24 = forwardRef(function SvgQuote24(
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
      <path d='M7 4a4 4 0 0 1 4 4l-.001.052-.002.32c-.08 3.624-1.683 7.313-4.79 11.065l-.326.388-.76-.65c2.384-2.79 3.89-5.516 4.528-8.179A4 4 0 1 1 7 4Zm0 1a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm10-1a4 4 0 0 1 4 4l-.001.052-.002.32c-.08 3.624-1.683 7.313-4.79 11.065l-.326.388-.76-.65c2.385-2.79 3.89-5.516 4.528-8.179A4 4 0 1 1 17 4Zm0 1a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z' />
    </svg>
  )
})

SvgQuote24.displayName = 'SvgQuote24'
export default SvgQuote24
