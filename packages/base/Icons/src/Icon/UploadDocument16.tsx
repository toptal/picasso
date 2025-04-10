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
const SvgUploadDocument16 = forwardRef(function SvgUploadDocument16(
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
      <path d='M1 15h7v1H0V0h13v8h-1V1H1v14Zm12-3.293V16h-1v-4.293l-1.5 1.5-.707-.707L12.5 9.793l.707.707 2 2-.707.707-1.5-1.5ZM3 4h7v1H3V4Zm0 2h7v1H3V6Zm0 2h3v1H3V8Z' />
    </svg>
  )
})

SvgUploadDocument16.displayName = 'SvgUploadDocument16'
export default SvgUploadDocument16
