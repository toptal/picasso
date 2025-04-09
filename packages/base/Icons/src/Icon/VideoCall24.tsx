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
const SvgVideoCall24 = forwardRef(function SvgVideoCall24(
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
      data-name='Layer 2'
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
      <path d='M12 16c2.08 0 3.9 1.25 4.66 3.18l.93-.36a5.96 5.96 0 0 0-3.49-3.43A3.99 3.99 0 0 0 16 12c0-2.21-1.79-4-4-4s-4 1.79-4 4c0 1.43.76 2.68 1.9 3.39a5.932 5.932 0 0 0-3.49 3.43l.93.36A4.966 4.966 0 0 1 12 16Zm-3-4c0-1.65 1.35-3 3-3s3 1.35 3 3-1.35 3-3 3-3-1.35-3-3ZM22.5 2h-21C.67 2 0 2.67 0 3.5v17c0 .83.67 1.5 1.5 1.5h21c.83 0 1.5-.67 1.5-1.5v-17c0-.83-.67-1.5-1.5-1.5Zm.5 18.5c0 .28-.22.5-.5.5h-21c-.28 0-.5-.22-.5-.5V6h22v14.5ZM23 5H1V3.5c0-.28.22-.5.5-.5h21c.28 0 .5.22.5.5V5Z' />
    </svg>
  )
})

SvgVideoCall24.displayName = 'SvgVideoCall24'
export default SvgVideoCall24
