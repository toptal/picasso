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
const SvgKeyboard24 = forwardRef(function SvgKeyboard24(
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
      <path d='M0 5v14h24l-1-1H1V6L0 5Zm0 0h24v14l-1-1V6H1L0 5Zm5 3H3v2h2V8Zm3 0H6v2h2V8Zm3 0H9v2h2V8Zm3 0h-2v2h2V8Zm3 0h-2v2h2V8Zm4 0h-3v2h3V8ZM9 11H7v2h2v-2Zm-3 0H3v2h3v-2Zm6 0h-2v2h2v-2Zm3 0h-2v2h2v-2Zm3 0h-2v2h2v-2Zm3 0h-2v2h2v-2ZM5 14H3v2h2v-2Zm9 0H6v2h8v-2Zm3 0h-2v2h2v-2Zm4 0h-3v2h3v-2Z' />
    </svg>
  )
})

SvgKeyboard24.displayName = 'SvgKeyboard24'
export default SvgKeyboard24
