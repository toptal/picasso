import type { Ref } from 'react'
import React, { forwardRef } from 'react'
import type { StandardProps } from '@toptal/picasso-shared'

const SIZE = 64

type ScaleType = 1 | 2
export interface Props extends StandardProps {
  scale?: ScaleType
  base?: number
}
const SvgCitySkylineBlue64 = forwardRef(function SvgCitySkylineBlue64(
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
          d='M51.552 63.5H12.448L.5 45.031h63L51.552 63.5ZM12.448 18.965a5.058 5.058 0 1 1 0-6.9v6.9Z'
          opacity={0.15}
        />
        <path
          fill='#204ECF'
          d='M63.5 44.531H.5v1h63v-1ZM60.16 49.694H3.691v1H60.16v-1ZM56.23 55.668H7.767v1H56.23v-1ZM51.552 63H12.448v1h39.104v-1ZM36.251 37.688V18.999l-6.688-2.732v6.419h-8.141V6.016h-8.408v21.703H2.086v7.539h-1v-8.539h10.928V5.016h10.408v16.67h6.141v-6.908l8.688 3.549v17.641l4.514-2.571V7.781h2.774V0h8.773v7.781h2.774v14.953H63.5v1h-8.414V8.781h-2.774V1h-6.773v7.781h-2.774v25.197l-6.514 3.71Z'
        />
        <path fill='#204ECF' d='M19.89.5h-1v5.016h1V.5Z' />
      </g>
      <defs>
        <clipPath id='a'>
          <path fill='#fff' d='M0 0h64v64H0z' />
        </clipPath>
      </defs>
    </svg>
  )
})

SvgCitySkylineBlue64.displayName = 'SvgCitySkylineBlue64'
export default SvgCitySkylineBlue64
