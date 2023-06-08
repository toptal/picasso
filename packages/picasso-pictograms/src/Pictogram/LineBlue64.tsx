import type { Ref } from 'react'
import React, { forwardRef } from 'react'
import type { StandardProps } from '@toptal/picasso-shared'

const SIZE = 64

type ScaleType = 1 | 2
export interface Props extends StandardProps {
  scale?: ScaleType
  base?: number
}
const SvgLineBlue64 = forwardRef(function SvgLineBlue64(
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
          d='M40.158.5H23.842V5h16.316V.5ZM63.5 46.156H.5v7.219h63v-7.219Z'
          opacity={0.15}
        />
        <path
          fill='#204ECF'
          d='M64 53.875H0V4.5h64v49.375Zm-63-1h62V5.5H1v47.375Z'
        />
        <path
          fill='#204ECF'
          d='M32.5 53.375h-1V63.5h1V53.375ZM19.88 53.095l-6.857 10.101.827.562 6.857-10.101-.827-.562ZM44.121 53.094l-.827.562 6.855 10.102.827-.561-6.855-10.103ZM40.658 5h-1V1H24.342v4h-1V0h17.316v5ZM13.125 42.427l-.546-.838 9.348-6.087 2.704 2.843 9.163-7.765 5.212 4.135 11.719-18.614.847.533-12.314 19.558-5.443-4.319-9.258 7.845-2.781-2.924-8.651 5.633Z'
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

SvgLineBlue64.displayName = 'SvgLineBlue64'
export default SvgLineBlue64
