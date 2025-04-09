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
const SvgGlobe16 = forwardRef(function SvgGlobe16(
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
      <path d='M1.019 8a6.505 6.505 0 0 0 4.508 5.695C4.665 12.432 4.08 10.366 4.007 8H1.02Zm0-1h2.989c.072-2.366.657-4.432 1.519-5.695A6.505 6.505 0 0 0 1.019 7ZM13.98 7a6.505 6.505 0 0 0-4.508-5.695c.862 1.263 1.447 3.329 1.52 5.695h2.988Zm0 1h-2.989c-.072 2.366-.657 4.432-1.519 5.695A6.505 6.505 0 0 0 13.981 8ZM5.008 8c.114 3.412 1.373 6 2.492 6s2.378-2.588 2.492-6H5.008Zm0-1h4.984C9.878 3.588 8.619 1 7.5 1S5.122 3.588 5.008 7ZM7.5 15a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15Z' />
    </svg>
  )
})

SvgGlobe16.displayName = 'SvgGlobe16'
export default SvgGlobe16
