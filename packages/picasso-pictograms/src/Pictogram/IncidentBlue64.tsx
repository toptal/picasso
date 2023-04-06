import type { Ref } from 'react'
import React, { forwardRef } from 'react'
import type { StandardProps } from '@toptal/picasso-shared'

const SIZE = 64

type ScaleType = 1 | 2
export interface Props extends StandardProps {
  scale?: ScaleType
  base?: number
}
const SvgIncidentBlue64 = forwardRef(function SvgIncidentBlue64(
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
          d='M48.828 25.702A12.563 12.563 0 0 1 38.723 5.677L29.89.577 2.61 16.327v31.5l27.28 15.75 27.28-15.75V22.53a12.513 12.513 0 0 1-8.342 3.173Zm-15.251-5.238L32.04 33.769H27.74l-1.536-13.305h7.373ZM29.89 45.863a4.096 4.096 0 1 1 0-8.192 4.096 4.096 0 0 1 0 8.192Z'
          fill='#183A9E'
        />
        <path
          d='M29.89 64.154 2.11 48.116V16.039L29.89 0l9.039 5.218-.5.866-8.539-4.93L3.11 16.616v30.923L29.89 63l26.78-15.461V22.56h1v25.556L29.89 64.154Z'
          fill='#204ECF'
        />
        <path
          d='M32.486 34.269h-5.192l-1.651-14.305h8.495l-1.652 14.305Zm-4.3-1h3.409l1.42-12.305h-6.25l1.42 12.305ZM29.89 46.363a4.597 4.597 0 1 1 4.596-4.596 4.601 4.601 0 0 1-4.596 4.596Zm0-8.192a3.596 3.596 0 1 0 0 7.192 3.596 3.596 0 0 0 0-7.192ZM48.819 26.194A13.054 13.054 0 1 1 61.873 13.14 13.068 13.068 0 0 1 48.82 26.193Zm0-25.108A12.054 12.054 0 1 0 60.873 13.14 12.068 12.068 0 0 0 48.82 1.086Z'
          fill='#204ECF'
        />
        <path
          d='m48.159 16.463-3.638-3.638.707-.707 2.931 2.931 4.408-4.408.707.707-5.115 5.115Z'
          fill='#204ECF'
        />
      </g>
      <defs>
        <clipPath id='a'>
          <path fill='#fff' d='M0 0h64v64.154H0z' />
        </clipPath>
      </defs>
    </svg>
  )
})

SvgIncidentBlue64.displayName = 'SvgIncidentBlue64'
export default SvgIncidentBlue64
