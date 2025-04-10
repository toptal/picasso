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
const SvgProfileCard24 = forwardRef(function SvgProfileCard24(
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
        d='M23 1H5v22h18V1ZM6 22V2h16v20H6ZM1 3h3v1H2v16h2v1H1V3Zm16 5c0 .991-.48 1.87-1.221 2.416A4 4 0 0 1 18 14h-1a3 3 0 1 0-6 0h-1a4 4 0 0 1 2.221-3.584A3 3 0 1 1 17 8Zm-5 0a2 2 0 1 0 4 0 2 2 0 0 0-4 0Zm-2 9v-1h8v1h-8Zm4 1v1h-4v-1h4Z'
        clipRule='evenodd'
      />
    </svg>
  )
})

SvgProfileCard24.displayName = 'SvgProfileCard24'
export default SvgProfileCard24
