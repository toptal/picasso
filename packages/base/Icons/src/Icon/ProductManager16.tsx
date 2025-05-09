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
const SvgProductManager16 = forwardRef(function SvgProductManager16(
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
        d='M4.487 2.328 1.013 4.2v7.6l3.479 1.873A292.033 292.033 0 0 0 8 15.547c.029 0 6.661-3.563 6.702-3.6.013-.012-.081-.214-.209-.45-.219-.408-.234-.428-.289-.399l-3.122 1.681c-1.686.907-3.079 1.646-3.097 1.642-.018-.004-1.371-.728-3.008-1.608l-2.975-1.6-.001-2.942L2 5.329l.167.092c.091.051 1.441.779 3 1.617L8 8.563l3.3-1.779 3.3-1.78.193-.011.194-.012V4.2l-3.479-1.873C9.594 1.296 8.013.454 7.994.455c-.019 0-1.597.843-3.507 1.873m6.257.711c1.482.799 2.687 1.461 2.676 1.471-.011.011-1.235.674-2.72 1.473L8 7.437 5.3 5.983A296.148 296.148 0 0 1 2.58 4.51c-.025-.024 5.365-2.935 5.424-2.928.024.002 1.257.658 2.74 1.457m2.569 4.941L11.494 9.8l-.574-.573-.573-.573L10 9l-.347.347.927.926.927.927 2.173-2.173 2.173-2.173-.346-.347a6.68 6.68 0 0 0-.36-.347c-.008 0-.833.819-1.834 1.82'
      />
    </svg>
  )
})

SvgProductManager16.displayName = 'SvgProductManager16'
export default SvgProductManager16
