import type { Ref } from 'react'
import React, { forwardRef } from 'react'
import type { StandardProps } from '@toptal/picasso-shared'

const SIZE = 64

type ScaleType = 1 | 2
export interface Props extends StandardProps {
  scale?: ScaleType
  base?: number
}
const SvgGraduateBlue64 = forwardRef(function SvgGraduateBlue64(
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
          fill='#183A9E'
          d='M23.454 23.288a10.38 10.38 0 1 0 17.092 0H23.454Z'
          opacity={0.15}
        />
        <path
          fill='#183A9E'
          d='M32 39.555a20.924 20.924 0 0 0-17.814 9.955 24.969 24.969 0 0 0 35.628 0A20.923 20.923 0 0 0 32 39.555Z'
          opacity={0.15}
        />
        <path
          fill='#204ECF'
          d='M32 64a32 32 0 1 1 32-32 32.036 32.036 0 0 1-32 32Zm0-63a31 31 0 1 0 31 31A31.035 31.035 0 0 0 32 1Z'
        />
        <path
          fill='#204ECF'
          d='M32 40.054a10.882 10.882 0 0 1-9.021-16.964l.828.56a9.88 9.88 0 1 0 16.332-.08l.823-.567A10.881 10.881 0 0 1 32 40.054Z'
        />
        <path
          fill='#204ECF'
          d='M49.407 49.76a20.465 20.465 0 0 0-34.815 0l-.85-.527a21.466 21.466 0 0 1 36.516 0l-.85.526ZM41.05 23.788h-18.1V14.28h1v8.508h16.1V14.28h1v9.508Z'
        />
        <path
          fill='#204ECF'
          d='M32 17.61 16.543 12.54 32 7.474l15.458 5.067L32 17.61ZM19.752 12.54 32 16.557l12.248-4.015L32 8.525l-12.248 4.015Z'
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

SvgGraduateBlue64.displayName = 'SvgGraduateBlue64'
export default SvgGraduateBlue64
