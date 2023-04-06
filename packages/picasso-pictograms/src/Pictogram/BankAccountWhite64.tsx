import type { Ref } from 'react'
import React, { forwardRef } from 'react'
import type { StandardProps } from '@toptal/picasso-shared'

const SIZE = 64

type ScaleType = 1 | 2
export interface Props extends StandardProps {
  scale?: ScaleType
  base?: number
}
const SvgBankAccountWhite64 = forwardRef(function SvgBankAccountWhite64(
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
          d='M11.812 48.13H4.845v7.777h6.967V48.13ZM11.812 31.448H4.845v5.606h6.967v-5.606ZM27.593 48.13h-6.967v7.777h6.967V48.13ZM27.593 31.448h-6.967v5.606h6.967v-5.606ZM43.374 48.13h-6.967v7.777h6.967V48.13ZM43.374 31.448h-6.967v5.606h6.967v-5.606ZM59.155 48.13h-6.967v7.777h6.967V48.13ZM59.155 31.448h-6.967v5.606h6.967v-5.606Z'
          fill='#231F20'
        />
        <path
          d='M5.345 31.448h-1v24.46h1v-24.46ZM12.312 31.448h-1v24.46h1v-24.46ZM21.126 31.448h-1v24.46h1v-24.46ZM28.093 31.448h-1v24.46h1v-24.46ZM36.907 31.448h-1v24.46h1v-24.46ZM43.874 31.448h-1v24.46h1v-24.46ZM52.688 31.448h-1v24.46h1v-24.46ZM59.655 31.448h-1v24.46h1v-24.46Z'
          fill='#fff'
        />
        <path
          d='M64 64.473H0v-9.066h64v9.066Zm-63-1h62v-7.066H1v7.066ZM64 31.948H0V21.804l18.251-9.574.465.886L1 22.408v8.54h62v-8.54l-17.716-9.292.465-.886L64 21.804v10.144Z'
          fill='#fff'
        />
        <path
          d='M34.395 20.691h-4.79a3.285 3.285 0 0 1-3.281-3.28h1a2.283 2.283 0 0 0 2.28 2.28h4.791a2.28 2.28 0 1 0 0-4.56h-4.79a3.28 3.28 0 1 1 0-6.562h4.79a3.284 3.284 0 0 1 3.281 3.28h-1a2.283 2.283 0 0 0-2.28-2.28h-4.791a2.28 2.28 0 1 0 0 4.561h4.79a3.28 3.28 0 1 1 0 6.561Z'
          fill='#fff'
        />
        <path
          d='M32.5 5.68h-1v17.9h1V5.68ZM46.59 25.639H17.41v1h29.18v-1Z'
          fill='#fff'
        />
        <path
          d='m39.601 26.56-.538-.842a13.157 13.157 0 1 0-14.126 0l-.538.842a14.157 14.157 0 1 1 15.202 0Z'
          fill='#fff'
        />
      </g>
      <defs>
        <clipPath id='a'>
          <path fill='#fff' transform='translate(0 .473)' d='M0 0h64v64H0z' />
        </clipPath>
      </defs>
    </svg>
  )
})

SvgBankAccountWhite64.displayName = 'SvgBankAccountWhite64'
export default SvgBankAccountWhite64
