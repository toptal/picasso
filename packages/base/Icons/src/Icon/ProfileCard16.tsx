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
const SvgProfileCard16 = forwardRef(function SvgProfileCard16(
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
        d='M16 0H3v16h13V0ZM4 15V1h11v14H4ZM0 2h2v1H1v10h1v1H0V2Zm6 8.5a3.5 3.5 0 0 1 1.875-3.1 2.5 2.5 0 1 1 3.25 0A3.5 3.5 0 0 1 13 10.5h-1a2.5 2.5 0 0 0-5 0H6Zm2-5a1.5 1.5 0 1 0 3 0 1.5 1.5 0 0 0-3 0Zm5 7.5v-1H6v1h7Z'
        clipRule='evenodd'
      />
    </svg>
  )
})

SvgProfileCard16.displayName = 'SvgProfileCard16'
export default SvgProfileCard16
