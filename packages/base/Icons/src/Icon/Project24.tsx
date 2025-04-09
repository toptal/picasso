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
const SvgProject24 = forwardRef(function SvgProject24(
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
      <path d='M23 1v22H1V1h22Zm-1 1H2v20h20V2Zm-2 9v9H4v-9h16Zm-1 5h-4v3h4v-3Zm-5 0h-4v3h4v-3Zm-5 0H5v3h4v-3Zm10-4h-4v3h4v-3Zm-5 0h-4v3h4v-3Zm-5 0H5v3h4v-3Zm1-5v1H4V7h6ZM8 4v1H4V4h4Z' />
    </svg>
  )
})

SvgProject24.displayName = 'SvgProject24'
export default SvgProject24
