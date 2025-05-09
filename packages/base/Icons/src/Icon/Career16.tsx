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
const SvgCareer16 = forwardRef(function SvgCareer16(
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
      <path d='M4 14v2H3v-2h1zm3-1v3H6v-3h1zm3-2v5H9v-5h1zm3-3v8h-1V8h1zm3-7.309V16h-1V5.809L10.382 3.5 16 .691zM4 0a3 3 0 0 1 1.777 5.418A3.994 3.994 0 0 1 7.995 8.8L8 9H7a3 3 0 0 0-5.995-.176L1 9H0a4 4 0 0 1 2.223-3.585A3 3 0 0 1 4 0zm0 1a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm11 1.309L12.618 3.5 15 4.691V2.309z' />
    </svg>
  )
})

SvgCareer16.displayName = 'SvgCareer16'
export default SvgCareer16
