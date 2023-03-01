import React, { forwardRef, Ref } from 'react'
import { StandardProps } from '@toptal/picasso-shared'

const SIZE = 64

type ScaleType = 1 | 2
export interface Props extends StandardProps {
  scale?: ScaleType
  base?: number
}
const SvgLineWhite64 = forwardRef(function SvgLineWhite64(
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
      viewBox='0 0 64 65'
      fill='none'
      className={className}
      style={svgStyle}
      ref={ref}
      data-testid={testId}
    >
      <g clipPath='url(#a)'>
        <path
          opacity={0.3}
          d='M40.158.642H23.842v4.5h16.316v-4.5ZM63.5 46.298H.5v7.219h63v-7.22Z'
          fill='#231F20'
        />
        <path
          d='M64 54.017H0V4.642h64v49.375Zm-63-1h62V5.642H1v47.375Z'
          fill='#fff'
        />
        <path
          d='M32.5 53.517h-1v10.125h1V53.517ZM19.88 53.237l-6.857 10.1.827.562 6.857-10.1-.827-.562ZM44.121 53.236l-.827.561L50.149 63.9l.827-.561-6.855-10.103ZM40.658 5.142h-1v-4H24.342v4h-1v-5h17.316v5ZM13.125 42.569l-.546-.838 9.348-6.087 2.704 2.843 9.163-7.765 5.212 4.135 11.719-18.614.847.533-12.314 19.558-5.443-4.32-9.258 7.846-2.781-2.924-8.651 5.633Z'
          fill='#fff'
        />
      </g>
      <defs>
        <clipPath id='a'>
          <path fill='#fff' transform='translate(0 .142)' d='M0 0h64v64H0z' />
        </clipPath>
      </defs>
    </svg>
  )
})

SvgLineWhite64.displayName = 'SvgLineWhite64'
export default SvgLineWhite64
