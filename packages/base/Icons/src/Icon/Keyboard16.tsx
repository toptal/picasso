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
const SvgKeyboard16 = forwardRef(function SvgKeyboard16(
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
      <path d='M0 3v10h16l-1-1H1V4L0 3Zm0 0h16v10l-1-1V4H1L0 3Zm3.333 2.333H2v1.334h1.333V5.333Zm2 0H4v1.334h1.333V5.333Zm2 0H6v1.334h1.333V5.333Zm2 0H8v1.334h1.333V5.333Zm2 0H10v1.334h1.334V5.333Zm2.667 0h-2v1.334h2V5.333Zm-8 2H4.667v1.334H6V7.333Zm-2 0H2v1.334h2V7.333Zm4 0H6.667v1.334H8V7.333Zm2 0H8.667v1.334H10V7.333Zm2 0h-1.333v1.334H12V7.333Zm2 0h-1.333v1.334H14V7.333Zm-10.667 2H2v1.334h1.333V9.333Zm6 0H4v1.334h5.333V9.333Zm2 0H10v1.334h1.334V9.333Zm2.667 0h-2v1.334h2V9.333Z' />
    </svg>
  )
})

SvgKeyboard16.displayName = 'SvgKeyboard16'
export default SvgKeyboard16
