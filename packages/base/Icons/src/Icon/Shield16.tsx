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
const SvgShield16 = forwardRef(function SvgShield16(
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
        d='M13.605 1.311 7.758.052a1.356 1.356 0 0 0-.606 0L1.396 1.27 1 1.355V7.86c0 3.234 1.953 6.161 4.96 7.469h.001l1.34.58.199.086.199-.086 1.34-.58C12.047 14.02 14 11.094 14 7.86V1.396l-.395-.085Zm-6.233-.284a.357.357 0 0 1 .166 0l.007.002L13 2.204V7.86c0 2.826-1.707 5.399-4.359 6.551l-1.141.494-1.14-.493h-.001C3.707 13.258 2 10.685 2 7.86V2.165L7.364 1.03l.008-.002Zm-.518 8.827 4-4-.708-.708L6.5 8.793 4.854 7.146l-.708.708 2 2 .354.353.354-.353Z'
        clipRule='evenodd'
      />
    </svg>
  )
})

SvgShield16.displayName = 'SvgShield16'
export default SvgShield16
