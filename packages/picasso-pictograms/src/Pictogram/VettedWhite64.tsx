import type { Ref } from 'react'
import React, { forwardRef } from 'react'
import type { StandardProps } from '@toptal/picasso-shared'

const SIZE = 64

type ScaleType = 1 | 2
export interface Props extends StandardProps {
  scale?: ScaleType
  base?: number
}
const SvgVettedWhite64 = forwardRef(function SvgVettedWhite64(
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
          d='M31.6 1.2c-6.627 0-12 5.373-12 12 0 6.628 5.373 12 12 12s12-5.372 12-12c0-6.627-5.373-12-12-12ZM26 18.8a5.6 5.6 0 0 1 5.6-5.6 3.2 3.2 0 1 1 0-6.4 3.2 3.2 0 0 1 0 6.4 5.6 5.6 0 0 1 5.6 5.6l-.4.4H26.4l-.4-.4Z'
          opacity={0.3}
        />
        <path
          fill='#fff'
          d='M31.6 25.6c-6.848 0-12.4-5.552-12.4-12.4C19.2 6.35 24.752.8 31.6.8 38.448.8 44 6.35 44 13.2c-.008 6.845-5.555 12.392-12.4 12.4Zm0-24C25.193 1.6 20 6.793 20 13.2c0 6.406 5.194 11.6 11.6 11.6 6.407 0 11.6-5.194 11.6-11.6-.007-6.404-5.197-11.593-11.6-11.6Z'
        />
        <path
          fill='#fff'
          d='M31.6 13.6a3.6 3.6 0 1 1 0-7.2 3.6 3.6 0 0 1 0 7.2Zm0-6.4a2.8 2.8 0 1 0 0 5.6 2.8 2.8 0 0 0 0-5.6Z'
        />
        <path
          fill='#fff'
          d='M37.6 19.2h-.8v-.4a5.2 5.2 0 1 0-10.4 0v.4h-.8v-.4a6 6 0 0 1 12 0v.4ZM50.8 20a3.6 3.6 0 1 1 0-7.2 3.6 3.6 0 0 1 0 7.2Zm0-6.4a2.8 2.8 0 1 0 0 5.6 2.8 2.8 0 0 0 0-5.6Z'
        />
        <path
          fill='#fff'
          d='M56.8 25.6H56v-.4a5.2 5.2 0 1 0-10.4 0v.4h-.8v-.4a6 6 0 0 1 12 0v.4ZM12.4 32C5.552 32 0 26.45 0 19.6 0 12.752 5.552 7.2 12.4 7.2c1.86-.005 3.698.413 5.373 1.222l-.346.72A11.494 11.494 0 0 0 12.4 8a11.6 11.6 0 1 0 8.977 18.947 10.1 10.1 0 0 0 1.046-1.538l.704.383c-.326.59-.706 1.149-1.136 1.668A12.357 12.357 0 0 1 12.4 32Z'
        />
        <path
          fill='#fff'
          d='M12.4 20a3.6 3.6 0 1 1 0-7.2 3.6 3.6 0 0 1 0 7.2Zm0-6.4a2.8 2.8 0 1 0 0 5.6 2.8 2.8 0 0 0 0-5.6Z'
        />
        <path
          fill='#fff'
          d='M18.4 25.6h-.8v-.4a5.2 5.2 0 1 0-10.4 0v.4h-.8v-.4a6 6 0 0 1 12 0v.4ZM30.4 58.165l-2.683-2.682.566-.566 2.117 2.117 4.517-4.517.566.566-5.083 5.082Z'
        />
        <path
          fill='#fff'
          d='M31.6 64a9.2 9.2 0 1 1 9.2-9.2 9.21 9.21 0 0 1-9.2 9.2Zm0-17.6a8.4 8.4 0 1 0 8.4 8.4 8.41 8.41 0 0 0-8.4-8.4ZM32 25.6h-.8v17.6h.8V25.6ZM26.4 44h-.8v-6.4H12V32h.8v4.8h13.6V44ZM37.6 44h-.8v-7.2h13.6V32h.8v5.6H37.6V44Z'
        />
        <path
          fill='#fff'
          d='M50.8 32a12.369 12.369 0 0 1-9.569-4.512 10.708 10.708 0 0 1-1.13-1.664l.703-.382c.299.542.647 1.054 1.04 1.53a11.596 11.596 0 1 0 3.93-17.83l-.348-.72A12.279 12.279 0 0 1 50.8 7.2c6.848 0 12.4 5.552 12.4 12.4 0 6.849-5.552 12.4-12.4 12.4Z'
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

SvgVettedWhite64.displayName = 'SvgVettedWhite64'
export default SvgVettedWhite64
