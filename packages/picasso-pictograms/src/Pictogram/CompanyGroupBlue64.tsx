import React, { forwardRef, Ref } from 'react'
import { StandardProps } from '@toptal/picasso-shared'

const SIZE = 64

type ScaleType = 1 | 2
export interface Props extends StandardProps {
  scale?: ScaleType
  base?: number
}
const SvgCompanyGroupBlue64 = forwardRef(function SvgCompanyGroupBlue64(
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
          d='M61.867 2.133a5.574 5.574 0 1 0-7.883 7.883 5.574 5.574 0 0 0 7.883-7.883Z'
          fill='#183A9E'
        />
        <path
          opacity={0.15}
          d='M36.862 10.02 53.98 27.137a12.103 12.103 0 0 0 .006-17.124 12.104 12.104 0 0 0-17.124.005ZM2.133 53.983a5.575 5.575 0 1 0 7.883 7.884 5.575 5.575 0 0 0-7.883-7.884Z'
          fill='#183A9E'
        />
        <path
          opacity={0.15}
          d='M10.02 53.98a12.104 12.104 0 0 0 17.119 0l-17.12-17.118a12.103 12.103 0 0 0 0 17.118Z'
          fill='#183A9E'
        />
        <path
          d='M6.075 12.146A6.074 6.074 0 1 1 10.37 1.779a6.072 6.072 0 0 1-4.295 10.367Zm0-11.144a5.072 5.072 0 1 0 .007 10.145 5.072 5.072 0 0 0-.007-10.145Z'
          fill='#204ECF'
        />
        <path
          d='M9.666 27.492A12.605 12.605 0 1 1 27.492 9.666l-.707.707a11.607 11.607 0 0 0-19.81 8.206c0 3.078 1.222 6.03 3.398 8.206l-.707.707ZM57.925 12.146A6.072 6.072 0 0 1 53.63 1.779a6.075 6.075 0 1 1 4.295 10.367Zm-3.588-9.66a5.075 5.075 0 1 0 7.177 0 5.082 5.082 0 0 0-7.177 0Z'
          fill='#204ECF'
        />
        <path
          d='m54.334 27.492-.707-.707a11.605 11.605 0 0 0-16.412-16.412l-.707-.707a12.605 12.605 0 0 1 17.826 17.826ZM6.075 63.997a6.072 6.072 0 1 1 4.295-1.776 6.055 6.055 0 0 1-4.295 1.776Zm0-11.144a5.072 5.072 0 1 0 .008 10.144 5.072 5.072 0 0 0-.008-10.144Z'
          fill='#204ECF'
        />
        <path
          d='M18.58 58.02a12.598 12.598 0 0 1-8.914-21.512l.707.707a11.605 11.605 0 0 0 16.412 16.412l.707.707a12.568 12.568 0 0 1-8.913 3.685ZM57.925 63.997a6.055 6.055 0 0 1-4.295-1.776 6.081 6.081 0 1 1 4.295 1.776Zm-3.588-2.483a5.075 5.075 0 1 0 0-7.177 5.081 5.081 0 0 0 0 7.177Z'
          fill='#204ECF'
        />
        <path
          d='M45.421 58.02a12.569 12.569 0 0 1-8.913-3.686l.707-.707a11.605 11.605 0 0 0 16.412-16.412l.707-.707a12.599 12.599 0 0 1-8.913 21.511ZM32 47.223A15.223 15.223 0 1 1 47.223 32 15.24 15.24 0 0 1 32 47.223Zm0-29.446A14.223 14.223 0 1 0 46.223 32 14.24 14.24 0 0 0 32 17.777Z'
          fill='#204ECF'
        />
        <path
          d='m31.226 35.775-4.205-4.205.707-.707 3.498 3.498 5.231-5.231.707.707-5.938 5.938Z'
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

SvgCompanyGroupBlue64.displayName = 'SvgCompanyGroupBlue64'
export default SvgCompanyGroupBlue64
