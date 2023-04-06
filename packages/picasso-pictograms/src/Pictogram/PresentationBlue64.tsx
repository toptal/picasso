import type { Ref } from 'react'
import React, { forwardRef } from 'react'
import type { StandardProps } from '@toptal/picasso-shared'

const SIZE = 64

type ScaleType = 1 | 2
export interface Props extends StandardProps {
  scale?: ScaleType
  base?: number
}
const SvgPresentationBlue64 = forwardRef(function SvgPresentationBlue64(
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
      viewBox='0 0 64 64'
      fill='none'
      className={className}
      style={svgStyle}
      ref={ref}
      data-testid={testId}
    >
      <g clipPath='url(#a)'>
        <path
          opacity={0.15}
          d='M40.159.5H23.842V5h16.317V.5ZM63.5 46.156H.5v7.219h63v-7.219Z'
          fill='#183A9E'
        />
        <path
          d='M64 53.875H0V4.5h64v49.375Zm-63-1h62V5.5H1v47.375Z'
          fill='#204ECF'
        />
        <path
          d='M32.5 53.375h-1V63.5h1V53.375ZM19.88 53.095l-6.857 10.101.827.562 6.857-10.101-.827-.562ZM44.121 53.094l-.827.562 6.855 10.102.827-.561-6.855-10.103ZM40.658 5h-1V1H24.342v4h-1V0h17.316v5ZM21.113 31.704a9.594 9.594 0 1 1 9.594-9.595 9.606 9.606 0 0 1-9.594 9.595Zm0-18.189a8.594 8.594 0 1 0 8.594 8.594 8.605 8.605 0 0 0-8.594-8.594ZM30.262 45.86H24.06v-6.644h6.203v6.644Zm-5.203-1h4.203v-4.644H25.06v4.644ZM41.372 45.86h-6.203V33.572h6.203V45.86Zm-5.203-1h4.203V34.572h-4.203V44.86ZM52.481 45.86h-6.203V22.285h6.203V45.86Zm-5.203-1h4.203V23.285h-4.203V44.86Z'
          fill='#204ECF'
        />
        <path
          d='m27.19 28.893-6.577-6.577v-9.301h1v8.887l6.284 6.284-.707.707Z'
          fill='#204ECF'
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

SvgPresentationBlue64.displayName = 'SvgPresentationBlue64'
export default SvgPresentationBlue64
