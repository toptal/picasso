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
const SvgTwitter16 = forwardRef(function SvgTwitter16(
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
      <path d='M9.313 6.771 15.138 0h-1.38l-5.06 5.88L4.66 0H0l6.11 8.89L0 15.993h1.38l5.342-6.21 4.266 6.21h4.66l-6.336-9.22ZM7.422 8.97l-.62-.885L1.878 1.04h2.12l3.975 5.686.619.885L13.758 15h-2.12L7.422 8.97Z' />
    </svg>
  )
})

SvgTwitter16.displayName = 'SvgTwitter16'
export default SvgTwitter16
