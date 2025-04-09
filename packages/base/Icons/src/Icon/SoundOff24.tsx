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
const SvgSoundOff24 = forwardRef(function SvgSoundOff24(
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
        d='M11 3v18l-5-5H0V8h6l5-5Zm-1 2.414L6.414 9H1v6h5.414L10 18.585V5.414Zm10.5 3.379.707.707-2.5 2.5 2.5 2.5-.707.707-2.5-2.5-2.5 2.5-.707-.707 2.5-2.5-2.5-2.5.707-.707 2.5 2.5 2.5-2.5Z'
        clipRule='evenodd'
      />
    </svg>
  )
})

SvgSoundOff24.displayName = 'SvgSoundOff24'
export default SvgSoundOff24
