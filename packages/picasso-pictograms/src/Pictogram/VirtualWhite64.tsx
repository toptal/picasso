import type { Ref } from 'react'
import React, { forwardRef } from 'react'
import type { StandardProps } from '@toptal/picasso-shared'

const SIZE = 64

type ScaleType = 1 | 2
export interface Props extends StandardProps {
  scale?: ScaleType
  base?: number
}
const SvgVirtualWhite64 = forwardRef(function SvgVirtualWhite64(
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
          d='M10.22 53.78A9.72 9.72 0 0 0 .5 63.5h19.438a9.718 9.718 0 0 0-9.719-9.72Z'
          opacity={0.3}
        />
        <path
          fill='#231F20'
          d='M10.22 53.78a4.814 4.814 0 1 0 0-9.627 4.814 4.814 0 0 0 0 9.628ZM53.78 10.128a4.814 4.814 0 1 0 0-9.628 4.814 4.814 0 0 0 0 9.628Z'
          opacity={0.3}
        />
        <path
          fill='#231F20'
          d='M53.78 10.127a9.72 9.72 0 0 0-9.719 9.72H63.5a9.72 9.72 0 0 0-9.72-9.72Z'
          opacity={0.3}
        />
        <path
          fill='#fff'
          d='M20.439 63.5h-1A9.22 9.22 0 0 0 1 63.5H0a10.22 10.22 0 0 1 20.439 0Z'
        />
        <path
          fill='#fff'
          d='M10.22 54.28a5.314 5.314 0 1 1-.001-10.627 5.314 5.314 0 0 1 0 10.628Zm0-9.627a4.314 4.314 0 1 0 0 8.628 4.314 4.314 0 0 0 0-8.628ZM53.78 54.28a5.314 5.314 0 1 1 0-10.627 5.314 5.314 0 0 1 0 10.628Zm0-9.627a4.314 4.314 0 1 0 0 8.627 4.314 4.314 0 0 0 0-8.627Z'
        />
        <path
          fill='#fff'
          d='M64 63.5h-1a9.22 9.22 0 0 0-18.438 0h-1A10.22 10.22 0 0 1 64 63.5ZM10.22 10.627a5.313 5.313 0 1 1 0-10.626 5.313 5.313 0 0 1 0 10.626Zm0-9.627a4.314 4.314 0 1 0 0 8.627 4.314 4.314 0 0 0 0-8.627Z'
        />
        <path
          fill='#fff'
          d='M20.439 19.847h-1a9.22 9.22 0 0 0-18.439 0H0a10.22 10.22 0 0 1 20.439 0ZM53.78 10.627a5.313 5.313 0 1 1 0-10.626 5.313 5.313 0 0 1 0 10.626Zm0-9.627a4.314 4.314 0 1 0 0 8.628 4.314 4.314 0 0 0 0-8.628Z'
        />
        <path
          fill='#fff'
          d='M64 19.847h-1a9.22 9.22 0 1 0-18.438 0h-1a10.22 10.22 0 0 1 20.438 0ZM25.813 52.383h-4.125v1h4.125v-1ZM34.063 52.383h-4.126v1h4.125v-1ZM42.313 52.383h-4.126v1h4.126v-1ZM25.813 10.617h-4.125v1h4.125v-1ZM34.063 10.617h-4.126v1h4.125v-1ZM42.313 10.617h-4.126v1h4.126v-1ZM10.72 24.726h-1v4.125h1v-4.125ZM10.72 32.976h-1v4.125h1v-4.125ZM54.28 24.726h-1v4.125h1v-4.125ZM54.28 32.976h-1v4.125h1v-4.125Z'
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

SvgVirtualWhite64.displayName = 'SvgVirtualWhite64'
export default SvgVirtualWhite64
