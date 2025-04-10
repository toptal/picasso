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
const SvgTable16 = forwardRef(function SvgTable16(
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
        d='M5 1.5H0v13h16v-13H5Zm10 1h-4v3h4v-3Zm0 4h-4v3h4v-3Zm0 4h-4v3h4v-3Zm-5 0v3H6v-3h4Zm0-4v3H6v-3h4Zm0-4v3H6v-3h4Zm-5 0H1v3h4v-3Zm0 4H1v3h4v-3Zm0 4H1v3h4v-3Z'
        clipRule='evenodd'
      />
    </svg>
  )
})

SvgTable16.displayName = 'SvgTable16'
export default SvgTable16
