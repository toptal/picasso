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
const SvgUser24 = forwardRef(function SvgUser24(
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
        d='M11.26 1.044a7.08 7.08 0 0 0-4.426 2.237A6.986 6.986 0 0 0 5.012 8.26a6.524 6.524 0 0 0 .728 2.84c.384.77.722 1.242 1.32 1.84a6.438 6.438 0 0 0 1.688 1.248c.369.194.453.253.391.275a9.075 9.075 0 0 0-5.223 4.592C3.367 20.177 3 21.662 3 22.764V23h.985l.047-.59c.163-2.027 1.003-3.804 2.457-5.193a7.976 7.976 0 0 1 11.022 0c1.455 1.39 2.288 3.153 2.456 5.193l.049.59H21v-.236c0-1.102-.367-2.587-.916-3.709-1.061-2.167-2.858-3.747-5.224-4.591-.063-.023.01-.075.36-.258a6.24 6.24 0 0 0 1.291-.862 6.988 6.988 0 0 0 2.429-6.238 7.005 7.005 0 0 0-7.68-6.062m1.781 1.053c1.33.236 2.597.949 3.465 1.948a6.137 6.137 0 0 1 1.403 2.935c.09.488.09 1.552 0 2.04a5.867 5.867 0 0 1-.486 1.525c-.839 1.751-2.321 2.917-4.249 3.342-.571.126-1.777.126-2.348 0-2.485-.548-4.278-2.391-4.736-4.867-.09-.489-.09-1.551 0-2.04.304-1.645 1.219-3.052 2.57-3.955a5.778 5.778 0 0 1 3.48-1.006c.308.01.713.044.901.078'
      />
    </svg>
  )
})

SvgUser24.displayName = 'SvgUser24'
export default SvgUser24
