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
const SvgSticker16 = forwardRef(function SvgSticker16(
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
        d='M7.467.017a8.032 8.032 0 0 0-5.859 3.176C.799 4.26.296 5.477.073 6.906c-.082.523-.082 1.665 0 2.188.342 2.194 1.403 3.995 3.122 5.299 1.062.806 2.286 1.312 3.711 1.534.523.082 1.665.082 2.188 0 1.944-.303 3.596-1.179 4.836-2.565 1.13-1.262 1.784-2.696 2.02-4.429.047-.344.047-1.476 0-1.856l-.036-.297-3.35-3.347L9.213.086l-.28-.031A14.074 14.074 0 0 0 7.467.017m.654 1.356c.57 3.308 3.199 5.94 6.5 6.506l.352.06-.002.384c-.013 1.726-.887 3.604-2.257 4.848A6.92 6.92 0 0 1 8 14.992a6.803 6.803 0 0 1-2.56-.478 7.015 7.015 0 0 1-4.213-4.767c-.168-.664-.2-.94-.2-1.747 0-.807.032-1.083.2-1.747a7.012 7.012 0 0 1 3.666-4.52c.807-.397 1.436-.575 2.48-.703.044-.005.217-.008.384-.006l.305.003.059.346m6.43 5.471a1.53 1.53 0 0 1-.218-.046 7 7 0 0 1-3.88-2.532 7.138 7.138 0 0 1-1.291-2.759c-.014-.062.618.555 2.689 2.625a392.243 392.243 0 0 1 2.7 2.712'
      />
    </svg>
  )
})

SvgSticker16.displayName = 'SvgSticker16'
export default SvgSticker16
