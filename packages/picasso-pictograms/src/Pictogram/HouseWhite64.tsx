import React, { forwardRef, Ref } from 'react'
import { StandardProps } from '@toptal/picasso-shared'

const SIZE = 64

type ScaleType = 1 | 2
export interface Props extends StandardProps {
  scale?: ScaleType
  base?: number
}
const SvgHouseWhite64 = forwardRef(function SvgHouseWhite64(
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
          d='M41.563 39.132H22.436v25.313h19.125V39.132ZM9.5 1.445V10.9l6.75-2.8V1.446H9.5ZM5.881 29.128 29.368 19.2a6.761 6.761 0 0 1 5.264 0l23.487 9.927v-8.996L32 9.094 5.881 20.132v8.995Z'
          fill='#231F20'
        />
        <path
          d='M64 23.16 32 9.637 0 23.16v-8.734L32 .902l.194.082L64 14.426v8.734ZM32 8.55l.194.083L63 21.653v-6.564L32 1.988l-31 13.1v6.564L32 8.551Z'
          fill='#fff'
        />
        <path
          d='M10 10.9H9V.945h7.75V8.1h-1V1.945H10V10.9ZM58.619 64.945H5.381V20.132h1v43.813h51.238V20.132h1v44.813Z'
          fill='#fff'
        />
        <path
          d='M32 32.294a7.062 7.062 0 1 1 7.063-7.063A7.07 7.07 0 0 1 32 32.294Zm0-13.125a6.062 6.062 0 1 0 6.063 6.062A6.07 6.07 0 0 0 32 19.168ZM42.062 64.445h-1V39.632H22.937v24.813h-1V38.632h20.125v25.813Z'
          fill='#fff'
        />
      </g>
      <defs>
        <clipPath id='a'>
          <path
            fill='#fff'
            transform='translate(0 .902)'
            d='M0 0h64v64.043H0z'
          />
        </clipPath>
      </defs>
    </svg>
  )
})

SvgHouseWhite64.displayName = 'SvgHouseWhite64'
export default SvgHouseWhite64
