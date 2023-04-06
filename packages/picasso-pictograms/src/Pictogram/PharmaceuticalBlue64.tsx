import type { Ref } from 'react'
import React, { forwardRef } from 'react'
import type { StandardProps } from '@toptal/picasso-shared'

const SIZE = 64

type ScaleType = 1 | 2
export interface Props extends StandardProps {
  scale?: ScaleType
  base?: number
}
const SvgPharmaceuticalBlue64 = forwardRef(function SvgPharmaceuticalBlue64(
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
          d='M33.779 9.463H8.789v6.587h24.99V9.463ZM34.883 56.633v-20.9h27.232v-5.7H34.883v-1.085h-1.26V22.37a3.31 3.31 0 0 1 3.31-3.308h-5.029a3.875 3.875 0 0 0-3.875 3.875v7.096h1.231v10.41h-5.086v-5.781h-5.78v5.78h-5.781v5.78h5.78v5.781h5.78v-5.78h5.087v10.41H.5v3.837A3.03 3.03 0 0 0 3.53 63.5h55.703a3.03 3.03 0 0 0 3.029-3.029v-3.838H34.883Z'
          fill='#183A9E'
        />
        <path
          d='M36.546 9.963H6.021a2.06 2.06 0 0 1-2.06-2.059V2.06A2.06 2.06 0 0 1 6.022 0h30.525a2.06 2.06 0 0 1 2.059 2.059v5.845a2.06 2.06 0 0 1-2.059 2.059ZM6.021 1a1.06 1.06 0 0 0-1.06 1.059v5.845a1.06 1.06 0 0 0 1.06 1.059h30.525a1.06 1.06 0 0 0 1.059-1.059V2.06A1.06 1.06 0 0 0 36.546 1H6.021Z'
          fill='#204ECF'
        />
        <path
          d='m39.537 19.49-6.258-3.793V9.463h1v5.67l5.776 3.502-.518.855ZM38.246 64H3.618A3.622 3.622 0 0 1 0 60.382V23.366a5.728 5.728 0 0 1 2.743-4.871l5.545-3.361V9.463h1v6.234L3.262 19.35A4.721 4.721 0 0 0 1 23.366v37.016A2.62 2.62 0 0 0 3.618 63h34.628v1Z'
          fill='#204ECF'
        />
        <path
          d='M58.988 64H38.205a3.765 3.765 0 0 1-3.759-3.75l-.063-30.231 1-.002.063 30.23A2.763 2.763 0 0 0 38.206 63h20.782a2.758 2.758 0 0 0 2.759-2.77l-.132-30.21 1-.004.132 30.21A3.76 3.76 0 0 1 58.988 64Z'
          fill='#204ECF'
        />
        <path
          d='M64 30.534H33.289V22.32a3.763 3.763 0 0 1 3.758-3.759h23.194A3.763 3.763 0 0 1 64 22.322v8.212Zm-29.711-1H63V22.32a2.762 2.762 0 0 0-2.759-2.759H37.047a2.762 2.762 0 0 0-2.758 2.76v7.212ZM62.142 57.133H44.613v-21.9h17.529v1H45.613v19.9h16.529v1Z'
          fill='#204ECF'
        />
        <path
          d='M34.996 57.133H5.431v-27.6h29.597v1H6.431v25.6h28.565v1Z'
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

SvgPharmaceuticalBlue64.displayName = 'SvgPharmaceuticalBlue64'
export default SvgPharmaceuticalBlue64
