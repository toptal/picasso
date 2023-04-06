import type { Ref } from 'react'
import React, { forwardRef } from 'react'
import type { StandardProps } from '@toptal/picasso-shared'

const SIZE = 64

type ScaleType = 1 | 2
export interface Props extends StandardProps {
  scale?: ScaleType
  base?: number
}
const SvgMouseBlue64 = forwardRef(function SvgMouseBlue64(
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
          d='M51.285 50.441H43.19a12.214 12.214 0 0 1-12.215-12.214v13.058A12.214 12.214 0 0 0 43.19 63.5h8.095A12.214 12.214 0 0 0 63.5 51.285V38.227A12.215 12.215 0 0 1 51.285 50.44Z'
          fill='#183A9E'
        />
        <path
          d='M51.285 64H43.19a12.73 12.73 0 0 1-12.714-12.715V24.06A12.729 12.729 0 0 1 43.19 11.344h8.095A12.73 12.73 0 0 1 64 24.059v27.226A12.73 12.73 0 0 1 51.285 64ZM43.19 12.344a11.728 11.728 0 0 0-11.714 11.715v27.226A11.728 11.728 0 0 0 43.19 63h8.095A11.728 11.728 0 0 0 63 51.285V24.06a11.728 11.728 0 0 0-11.715-11.715H43.19Z'
          fill='#204ECF'
        />
        <path
          d='M8.118 64A8.127 8.127 0 0 1 0 55.881V11.844h1V55.88a7.119 7.119 0 0 0 14.237 0V8.12A8.128 8.128 0 0 1 23.355 0H39.62a8.128 8.128 0 0 1 8.118 8.119v3.725h-1V8.119A7.127 7.127 0 0 0 39.62 1H23.355a7.127 7.127 0 0 0-7.118 7.119V55.88A8.128 8.128 0 0 1 8.118 64ZM47.737 19.735h-1v8.89h1v-8.89Z'
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

SvgMouseBlue64.displayName = 'SvgMouseBlue64'
export default SvgMouseBlue64
