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
const SvgWorking16 = forwardRef(function SvgWorking16(
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
        d='M2 .507v.506h.987v4.173l1.406 1.407L5.8 8 4.393 9.407l-1.406 1.407v4.199H2V16h12v-.987h-.987v-4.199l-1.406-1.407L10.2 8l1.407-1.407 1.406-1.407V1.013H14V0H2v.507M12 2.9v1.887l-1.607 1.606L8.787 8l1.606 1.607L12 11.213v3.8H4v-3.8l1.607-1.606L7.213 8 5.607 6.393 4 4.787V1.013h8V2.9'
      />
    </svg>
  )
})

SvgWorking16.displayName = 'SvgWorking16'
export default SvgWorking16
