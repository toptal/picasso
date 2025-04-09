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
const SvgTable24 = forwardRef(function SvgTable24(
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
        d='M2 3H1v19h22V3H2Zm6 1H2v5h6V4Zm1 0v5h6V4H9Zm7 0v5h6V4h-6ZM2 15v-5h6v5H2Zm7 0v-5h6v5H9Zm7 0v-5h6v5h-6ZM2 16v5h6v-5H2Zm7 0v5h6v-5H9Zm7 0v5h6v-5h-6Z'
        clipRule='evenodd'
      />
    </svg>
  )
})

SvgTable24.displayName = 'SvgTable24'
export default SvgTable24
