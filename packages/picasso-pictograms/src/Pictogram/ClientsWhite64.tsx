import React, { forwardRef, Ref } from 'react'
import { StandardProps } from '@toptal/picasso-shared'

const SIZE = 64

type ScaleType = 1 | 2
export interface Props extends StandardProps {
  scale?: ScaleType
  base?: number
}
const SvgClientsWhite64 = forwardRef(function SvgClientsWhite64(
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
          d='M12.126 51.874a5.758 5.758 0 1 0 0-11.516 5.758 5.758 0 0 0 0 11.516Z'
          fill='#231F20'
        />
        <path
          opacity={0.3}
          d='M12.126 51.874A11.626 11.626 0 0 0 .5 63.5h23.252a11.625 11.625 0 0 0-11.626-11.626ZM51.874 12.016a5.758 5.758 0 1 0 0-11.516 5.758 5.758 0 0 0 0 11.516ZM51.874 12.016a11.626 11.626 0 0 0-11.626 11.626H63.5a11.627 11.627 0 0 0-11.626-11.626Z'
          fill='#231F20'
        />
        <path
          d='M12.126 52.374a6.259 6.259 0 1 1 6.258-6.258 6.265 6.265 0 0 1-6.258 6.258Zm0-11.516a5.257 5.257 0 1 0-.001 10.514 5.257 5.257 0 0 0 .001-10.514Z'
          fill='#fff'
        />
        <path
          d='M24.252 63.5h-1A11.126 11.126 0 0 0 1 63.5H0a12.126 12.126 0 0 1 24.252 0ZM51.874 12.516a6.258 6.258 0 1 1 6.258-6.258 6.265 6.265 0 0 1-6.258 6.258Zm0-11.516a5.258 5.258 0 1 0 0 10.516 5.258 5.258 0 0 0 0-10.516Z'
          fill='#fff'
        />
        <path
          d='M64 23.642h-1a11.126 11.126 0 0 0-22.252 0h-1a12.126 12.126 0 0 1 24.252 0ZM51.874 52.374a6.26 6.26 0 0 1-4.425-10.683 6.259 6.259 0 0 1 10.683 4.425 6.264 6.264 0 0 1-6.258 6.258Zm0-11.516a5.257 5.257 0 1 0 0 10.515 5.257 5.257 0 0 0 0-10.515Z'
          fill='#fff'
        />
        <path
          d='M64 63.5h-1a11.126 11.126 0 0 0-22.252 0h-1A12.126 12.126 0 0 1 64 63.5ZM12.126 12.516a6.258 6.258 0 1 1 6.258-6.258 6.266 6.266 0 0 1-6.258 6.258Zm0-11.516a5.258 5.258 0 1 0 5.258 5.258A5.264 5.264 0 0 0 12.126 1Z'
          fill='#fff'
        />
        <path
          d='M24.252 23.642h-1a11.126 11.126 0 0 0-22.252 0H0a12.126 12.126 0 1 1 24.252 0ZM34.919 43.597h-5.837a3.891 3.891 0 0 1-3.888-3.888h1a2.891 2.891 0 0 0 2.887 2.888h5.838a2.887 2.887 0 0 0 0-5.775h-5.837a3.887 3.887 0 0 1 0-7.774h5.837a3.892 3.892 0 0 1 3.887 3.887h-1a2.891 2.891 0 0 0-2.887-2.887h-5.837a2.887 2.887 0 1 0 0 5.774h5.837a3.887 3.887 0 0 1 0 7.775Z'
          fill='#fff'
        />
        <path d='M32.5 23.642h-1v25.36h1v-25.36Z' fill='#fff' />
      </g>
      <defs>
        <clipPath id='a'>
          <path fill='#fff' d='M0 0h64v64H0z' />
        </clipPath>
      </defs>
    </svg>
  )
})

SvgClientsWhite64.displayName = 'SvgClientsWhite64'
export default SvgClientsWhite64
