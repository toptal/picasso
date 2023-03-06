import React, { forwardRef, Ref } from 'react'
import { StandardProps } from '@toptal/picasso-shared'

const SIZE = 64

type ScaleType = 1 | 2
export interface Props extends StandardProps {
  scale?: ScaleType
  base?: number
}
const SvgBarGraphBlue64 = forwardRef(function SvgBarGraphBlue64(
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
          d='M63.5 43.75H.5v9.625h63v-9.624ZM40.158.5H23.842V5h16.316V.5Z'
          fill='#183A9E'
        />
        <path
          opacity={0.15}
          d='m22.498 37.758-8.633.018.012 6.02 8.633-.017-.012-6.02ZM36.295 30.023l-8.633.017.028 13.728 8.632-.017-.027-13.728ZM50.076 14.579l-8.633.017.06 29.144 8.632-.017-.059-29.144Z'
          fill='#183A9E'
        />
        <path
          d='m13.378 44.297-.014-7.02 9.633-.02.014 7.02-9.633.02Zm.988-6.022.01 5.02 7.633-.015-.01-5.02-7.633.015ZM27.19 44.269l-.029-14.728 9.633-.02.03 14.729-9.634.019Zm.973-13.73.026 12.728 7.632-.015-.025-12.729-7.633.016ZM41.003 44.241l-.06-30.144 9.632-.02.06 30.145-9.632.02Zm.941-29.146.057 28.144 7.633-.015-.057-28.144-7.633.015Z'
          fill='#204ECF'
        />
        <path
          d='M64 53.875H0V4.5h64v49.375Zm-63-1h62V5.5H1v47.375Z'
          fill='#204ECF'
        />
        <path
          d='M32.5 53.375h-1V63.5h1V53.375ZM19.877 53.093l-6.852 10.105.828.562 6.852-10.105-.828-.562ZM44.121 53.094l-.828.562 6.855 10.102.828-.561-6.855-10.103ZM40.658 5h-1V1H24.342v4h-1V0h17.316v5Z'
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

SvgBarGraphBlue64.displayName = 'SvgBarGraphBlue64'
export default SvgBarGraphBlue64
