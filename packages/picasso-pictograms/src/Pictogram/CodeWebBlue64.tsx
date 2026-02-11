import type { Ref } from 'react'
import React, { forwardRef } from 'react'
import type { StandardProps } from '@toptal/picasso-shared'

const SIZE = 64

type ScaleType = 1 | 2
export interface Props extends StandardProps {
  scale?: ScaleType
  base?: number
}
const SvgCodeWebBlue64 = forwardRef(function SvgCodeWebBlue64(
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
          fill='#183A9C'
          d='M37 50H27v5h10v-5ZM16 49h47V6H50L16 49Z'
          opacity={0.15}
        />
        <path
          stroke='#204ECD'
          strokeMiterlimit={10}
          d='M63.5 5.5H.5v44h63v-44ZM20 63.5h24M26.5 61V49.5h11V61M13 12.5h6M29 12.5h10M22 12.5h4M42 12.5h4M13 17.5h3M30 17.5h5M19 17.5h8M13 22.5h9M32 22.5h7M25 22.5h4M13 27.5h4M31 27.5h4M20 27.5h8M38 27.5h8M13 32.5h11M34 32.5h7M27 32.5h4M13 37.5h2M30 37.5h7M18 37.5h9M40 37.5h2M13 42.5h5M8 12.5h2M8 17.5h2M8 22.5h2M8 27.5h2M8 32.5h2M8 37.5h2M8 42.5h2'
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

SvgCodeWebBlue64.displayName = 'SvgCodeWebBlue64'
export default SvgCodeWebBlue64
