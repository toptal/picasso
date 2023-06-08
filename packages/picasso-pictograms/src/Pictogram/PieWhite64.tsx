import type { Ref } from 'react'
import React, { forwardRef } from 'react'
import type { StandardProps } from '@toptal/picasso-shared'

const SIZE = 64

type ScaleType = 1 | 2
export interface Props extends StandardProps {
  scale?: ScaleType
  base?: number
}
const SvgPieWhite64 = forwardRef(function SvgPieWhite64(
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
          fill='#231F20'
          d='M40.158.5H23.842V5h16.316V.5ZM63.5 46.156H.5v7.219h63v-7.219ZM32 29.187V12.894a16.265 16.265 0 0 1 16.293 16.293H32Z'
          opacity={0.3}
        />
        <path
          fill='#fff'
          d='M32 45.98a16.793 16.793 0 1 1 16.793-16.792A16.812 16.812 0 0 1 32 45.98Zm0-32.585a15.792 15.792 0 1 0 15.793 15.793A15.81 15.81 0 0 0 32 13.395Z'
        />
        <path
          fill='#fff'
          d='M43.167 41.062 31.5 29.395v-16.5h1V28.98l11.374 11.374-.707.708Z'
        />
        <path fill='#fff' d='M48.293 28.688H32v1h16.293v-1Z' />
        <path
          fill='#fff'
          d='M64 53.875H0V4.5h64v49.375Zm-63-1h62V5.5H1v47.375Z'
        />
        <path
          fill='#fff'
          d='M32.5 53.375h-1V63.5h1V53.375ZM19.877 53.093l-6.852 10.105.828.562 6.852-10.105-.828-.562ZM44.121 53.094l-.828.562 6.855 10.102.828-.561-6.855-10.103ZM40.658 5h-1V1H24.342v4h-1V0h17.316v5Z'
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

SvgPieWhite64.displayName = 'SvgPieWhite64'
export default SvgPieWhite64
