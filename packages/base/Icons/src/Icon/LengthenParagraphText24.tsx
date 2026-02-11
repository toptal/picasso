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
const SvgLengthenParagraphText24 = forwardRef(
  function SvgLengthenParagraphText24(props: Props, ref: Ref<SVGSVGElement>) {
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
          d='M9.56 2.74 7.14 5.16l.35.35.35.35 2.08-2.08L12 1.7l2.08 2.08 2.08 2.08.35-.35.35-.35-2.42-2.42A211.584 211.584 0 0 0 12 .32c-.011 0-1.109 1.089-2.44 2.42M3 9.5v.5h18V9H3v.5m0 5v.5h18v-1H3v.5m4.51 4.01-.349.351L9.58 21.28 12 23.7l2.42-2.42 2.419-2.419-.349-.351-.349-.351-2.071 2.071L12 22.3l-2.07-2.07-2.071-2.071-.349.351'
        />
      </svg>
    )
  }
)

SvgLengthenParagraphText24.displayName = 'SvgLengthenParagraphText24'
export default SvgLengthenParagraphText24
