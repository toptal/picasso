import React, { forwardRef, Ref } from 'react'
import { StandardProps } from '@toptal/picasso-shared'

const SIZE = 64

type ScaleType = 1 | 2
export interface Props extends StandardProps {
  scale?: ScaleType
  base?: number
}
const SvgBankAccountBlue64 = forwardRef(function SvgBankAccountBlue64(
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
          d='M11.812 47.656H4.845v7.778h6.967v-7.778ZM11.812 30.974H4.845v5.607h6.967v-5.607ZM27.593 47.656h-6.967v7.778h6.967v-7.778ZM27.593 30.974h-6.967v5.607h6.967v-5.607ZM43.374 47.656h-6.967v7.778h6.967v-7.778ZM43.374 30.974h-6.967v5.607h6.967v-5.607ZM59.155 47.656h-6.967v7.778h6.967v-7.778ZM59.155 30.974h-6.967v5.607h6.967v-5.607Z'
          fill='#183A9E'
        />
        <path
          d='M5.345 30.975h-1v24.46h1v-24.46ZM12.312 30.975h-1v24.46h1v-24.46ZM21.126 30.975h-1v24.46h1v-24.46ZM28.093 30.975h-1v24.46h1v-24.46ZM36.907 30.975h-1v24.46h1v-24.46ZM43.874 30.975h-1v24.46h1v-24.46ZM52.688 30.975h-1v24.46h1v-24.46ZM59.655 30.975h-1v24.46h1v-24.46Z'
          fill='#204ECF'
        />
        <path
          d='M64 64H0v-9.066h64V64ZM1 63h62v-7.066H1V63ZM64 31.475H0V21.331l18.251-9.574.465.886L1 21.935v8.54h62v-8.54l-17.716-9.292.465-.886L64 21.331v10.144Z'
          fill='#204ECF'
        />
        <path
          d='M34.395 20.218h-4.79a3.285 3.285 0 0 1-3.281-3.281h1a2.283 2.283 0 0 0 2.28 2.28h4.791a2.28 2.28 0 1 0 0-4.56h-4.79a3.282 3.282 0 0 1-2.328-5.604 3.28 3.28 0 0 1 2.328-.957h4.79a3.284 3.284 0 0 1 3.281 3.28h-1a2.283 2.283 0 0 0-2.28-2.28h-4.791a2.28 2.28 0 1 0 0 4.56h4.79a3.28 3.28 0 1 1 0 6.562Z'
          fill='#204ECF'
        />
        <path
          d='M32.5 5.207h-1v17.9h1v-17.9ZM46.59 25.166H17.41v1h29.18v-1Z'
          fill='#204ECF'
        />
        <path
          d='m39.601 26.087-.538-.843a13.156 13.156 0 1 0-14.126 0l-.538.843a14.157 14.157 0 1 1 15.202 0Z'
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

SvgBankAccountBlue64.displayName = 'SvgBankAccountBlue64'
export default SvgBankAccountBlue64
