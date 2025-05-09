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
const SvgGuests24 = forwardRef(function SvgGuests24(
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
      <path
        fillRule='nonzero'
        d='M7 1v1H5v21h14V2h-2V1h3v23H4V1h3Zm8 17v1H9v-1h6ZM12 6a3 3 0 0 1 1.777 5.418 3.995 3.995 0 0 1 2.217 3.37L16 15h-1a3 3 0 0 0-5.995-.176L9 15H8a4 4 0 0 1 2.223-3.585A3 3 0 0 1 12 6Zm0 1a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm4-7v3H8V0h8Zm-1 1H9v1h6V1Z'
      />
    </svg>
  )
})

SvgGuests24.displayName = 'SvgGuests24'
export default SvgGuests24
