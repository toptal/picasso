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
const SvgVideo16 = forwardRef(function SvgVideo16(
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
        d='M0 8v6h16V2H0v6m14.987.013v5H1.013v-10h13.974v5M6 8c0 1.692.01 2.987.023 2.982.055-.021 4.962-2.97 4.962-2.982 0-.012-4.907-2.961-4.962-2.982C6.01 5.013 6 6.308 6 8m3.039 0c.001.008-.409.26-.91.56l-1.013.608-.103.062V6.776l1.013.605c.557.333 1.013.612 1.013.619'
      />
    </svg>
  )
})

SvgVideo16.displayName = 'SvgVideo16'
export default SvgVideo16
