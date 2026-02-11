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
const SvgShortenParagraphText24 = forwardRef(function SvgShortenParagraphText24(
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
        d='m7.51 1.51-.349.351L9.58 4.28 12 6.7l2.42-2.42 2.419-2.419-.349-.351-.349-.351L14.07 3.23 12 5.3 9.93 3.23 7.859 1.159l-.349.351M3 9.5v.5h18V9H3v.5m0 5v.5h18v-1H3v.5m6.57 5.23-2.41 2.41.35.35.35.35 2.07-2.07L12 18.7l2.07 2.07 2.071 2.071.349-.351.349-.351-2.409-2.409A209.782 209.782 0 0 0 12 17.32c-.011 0-1.105 1.085-2.43 2.41'
      />
    </svg>
  )
})

SvgShortenParagraphText24.displayName = 'SvgShortenParagraphText24'
export default SvgShortenParagraphText24
