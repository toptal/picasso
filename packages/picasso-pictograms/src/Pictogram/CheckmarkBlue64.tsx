import type { Ref } from 'react'
import React, { forwardRef } from 'react'
import type { StandardProps } from '@toptal/picasso-shared'

const SIZE = 64

type ScaleType = 1 | 2
export interface Props extends StandardProps {
  scale?: ScaleType
  base?: number
}
const SvgCheckmarkBlue64 = forwardRef(function SvgCheckmarkBlue64(
  props: Props,
  ref: Ref<SVGSVGElement>
) {
  const { className, style = {}, scale, base, 'data-testid': testId } = props
  const scaledSize = base || SIZE * Math.ceil(scale || 1)

  const svgStyle = {
    minWidth: `${scaledSize}px`,
    minHeight: `${scaledSize}px`,
    ...style,
  }

  return (
    <svg
      fill='none'
      viewBox='0 0 64 64'
      className={className}
      style={svgStyle}
      ref={ref}
      data-testid={testId}
    >
      <g clipPath='url(#a)'>
        <path
          fill='#183A9E'
          d='M29.961 44.571 17.632 32.242l4.773-4.773 7.556 7.556 12.028-12.028 4.773 4.773-16.801 16.801Z'
          opacity={0.15}
        />
        <path
          fill='#204ECF'
          d='M32 64a32 32 0 1 1 32-32 32.036 32.036 0 0 1-32 32Zm0-63a31 31 0 1 0 31 31A31.035 31.035 0 0 0 32 1Z'
        />
        <path
          fill='#204ECF'
          d='M29.96 45.278 16.926 32.242l5.48-5.48 7.556 7.556L41.989 22.29l5.48 5.48L29.96 45.278ZM18.34 32.242 29.96 43.864l16.094-16.093-4.066-4.067-12.028 12.028-7.556-7.556-4.066 4.066Z'
        />
      </g>
      <defs>
        <clipPath id='a'>
          <path fill='#fff' d='M0 0h64v64H0z' />
        </clipPath>
      </defs>
    </svg>
  )
})

SvgCheckmarkBlue64.displayName = 'SvgCheckmarkBlue64'
export default SvgCheckmarkBlue64
