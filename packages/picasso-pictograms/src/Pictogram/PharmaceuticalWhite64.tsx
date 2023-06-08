import type { Ref } from 'react'
import React, { forwardRef } from 'react'
import type { StandardProps } from '@toptal/picasso-shared'

const SIZE = 64

type ScaleType = 1 | 2
export interface Props extends StandardProps {
  scale?: ScaleType
  base?: number
}
const SvgPharmaceuticalWhite64 = forwardRef(function SvgPharmaceuticalWhite64(
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
          d='M33.779 9.604H8.789v6.588h24.99V9.604ZM34.883 56.775v-20.9h27.232v-5.7H34.883V29.09h-1.26v-6.576a3.31 3.31 0 0 1 3.31-3.309h-5.029a3.875 3.875 0 0 0-3.875 3.875v7.096h1.231v10.41h-5.086v-5.78h-5.78v5.78h-5.781v5.78h5.78v5.78h5.78v-5.78h5.087v10.41H.5v3.838a3.03 3.03 0 0 0 3.029 3.029h55.703a3.03 3.03 0 0 0 3.029-3.03v-3.837H34.883Z'
          opacity={0.3}
        />
        <path
          fill='#fff'
          d='M36.546 10.104H6.021a2.06 2.06 0 0 1-2.06-2.058V2.2A2.06 2.06 0 0 1 6.022.142h30.525A2.06 2.06 0 0 1 38.605 2.2v5.846a2.06 2.06 0 0 1-2.059 2.059ZM6.021 1.143A1.06 1.06 0 0 0 4.96 2.2v5.846a1.06 1.06 0 0 0 1.06 1.058h30.525a1.06 1.06 0 0 0 1.059-1.058V2.2a1.06 1.06 0 0 0-1.059-1.058H6.021Z'
        />
        <path
          fill='#fff'
          d='m39.537 19.631-6.258-3.793V9.604h1v5.671l5.776 3.501-.518.855ZM38.246 64.142H3.618A3.622 3.622 0 0 1 0 60.524V23.507a5.728 5.728 0 0 1 2.743-4.87l5.545-3.362v-5.67h1v6.234l-6.026 3.653A4.721 4.721 0 0 0 1 23.507v37.017a2.62 2.62 0 0 0 2.618 2.618h34.628v1Z'
        />
        <path
          fill='#fff'
          d='M58.988 64.142H38.205a3.765 3.765 0 0 1-3.759-3.751l-.063-30.23 1-.003.063 30.23a2.763 2.763 0 0 0 2.76 2.754h20.782a2.757 2.757 0 0 0 2.759-2.77l-.132-30.21 1-.005.132 30.21a3.76 3.76 0 0 1-3.759 3.775Z'
        />
        <path
          fill='#fff'
          d='M64 30.675H33.289v-8.212a3.763 3.763 0 0 1 3.758-3.759h23.194A3.763 3.763 0 0 1 64 22.463v8.212Zm-29.711-1H63v-7.212a2.762 2.762 0 0 0-2.759-2.759H37.047a2.762 2.762 0 0 0-2.758 2.759v7.212ZM62.142 57.275H44.613v-21.9h17.529v1H45.613v19.9h16.529v1Z'
        />
        <path
          fill='#fff'
          d='M34.996 57.275H5.431v-27.6h29.597v1H6.431v25.6h28.565v1Z'
        />
      </g>
      <defs>
        <clipPath id='a'>
          <path fill='#fff' d='M0 .142h64v64H0z' />
        </clipPath>
      </defs>
    </svg>
  )
})

SvgPharmaceuticalWhite64.displayName = 'SvgPharmaceuticalWhite64'
export default SvgPharmaceuticalWhite64
