import React, { forwardRef, Ref } from 'react'
import { StandardProps } from '@toptal/picasso-shared'

const SIZE = 64

type ScaleType = 1 | 2
export interface Props extends StandardProps {
  scale?: ScaleType
  base?: number
}
const SvgMouseWhite64 = forwardRef(function SvgMouseWhite64(
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
          opacity={0.3}
          d='M51.285 50.583H43.19a12.214 12.214 0 0 1-12.215-12.215v13.059A12.214 12.214 0 0 0 43.19 63.642h8.095A12.214 12.214 0 0 0 63.5 51.427V38.368a12.215 12.215 0 0 1-12.215 12.215Z'
          fill='#231F20'
        />
        <path
          d='M51.285 64.142H43.19a12.73 12.73 0 0 1-12.714-12.715V24.2A12.729 12.729 0 0 1 43.19 11.485h8.095A12.73 12.73 0 0 1 64 24.2v27.227a12.73 12.73 0 0 1-12.715 12.715ZM43.19 12.485A11.728 11.728 0 0 0 31.476 24.2v27.227A11.728 11.728 0 0 0 43.19 63.142h8.095A11.728 11.728 0 0 0 63 51.427V24.2a11.728 11.728 0 0 0-11.715-11.715H43.19Z'
          fill='#fff'
        />
        <path
          d='M8.118 64.142A8.127 8.127 0 0 1 0 56.023V11.985h1v44.038a7.119 7.119 0 0 0 14.237 0V8.26A8.128 8.128 0 0 1 23.355.142H39.62a8.128 8.128 0 0 1 8.118 8.118v3.725h-1V8.26a7.127 7.127 0 0 0-7.118-7.118H23.355a7.127 7.127 0 0 0-7.118 7.118v47.763a8.128 8.128 0 0 1-8.119 8.119ZM47.737 19.877h-1v8.89h1v-8.89Z'
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

SvgMouseWhite64.displayName = 'SvgMouseWhite64'
export default SvgMouseWhite64
