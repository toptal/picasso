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
const SvgShortenParagraphText16 = forwardRef(function SvgShortenParagraphText16(
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
        d='m5.5 1.5-.353.354L6.573 3.28 8 4.706 9.427 3.28l1.426-1.426L10.5 1.5l-.353-.354L9.074 2.22 8 3.293 6.926 2.22 5.853 1.146 5.5 1.5M2 6.493v.494h12V6H2v.493m0 3.014V10h12v-.987H2v.494m4.567 3.22-1.42 1.42.353.353.353.353 1.074-1.073L8 12.707l1.074 1.073 1.073 1.074.353-.354.353-.354-1.42-1.42c-.781-.78-1.426-1.419-1.433-1.419-.008 0-.652.639-1.433 1.42'
      />
    </svg>
  )
})

SvgShortenParagraphText16.displayName = 'SvgShortenParagraphText16'
export default SvgShortenParagraphText16
