import type { Ref } from 'react'
import React, { forwardRef } from 'react'
import type { StandardProps } from '@toptal/picasso-shared'

const SIZE = 64

type ScaleType = 1 | 2
export interface Props extends StandardProps {
  scale?: ScaleType
  base?: number
}
const SvgStackBlue64 = forwardRef(function SvgStackBlue64(
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
          d='M13.263.5H.5v63h12.763V.5ZM63.5 58.069H13.263v5.43H63.5v-5.43ZM51.964.5v11.536H63.5'
          opacity={0.15}
        />
        <path
          fill='#204ECF'
          d='M36.294 11.537H22.24v1h14.053v-1ZM51.964 23.252H22.24v1h29.723v-1ZM51.964 29.82H22.24v1h29.723v-1ZM51.964 36.389H22.24v1h29.723v-1ZM51.964 42.957H22.24v1h29.723v-1ZM27.283 49.525h-5.042v1h5.042v-1ZM63.5 12.537H51.464V.5h1v11.037H63.5v1Z'
        />
        <path
          fill='#204ECF'
          d='M64 64H12.763V0H52.17L64 11.83V64Zm-50.237-1H63V12.244L51.757 1H13.763v62Z'
        />
        <path
          fill='#204ECF'
          d='M13.763 64H6.382V0h7.38v64Zm-6.381-1h5.38V1h-5.38v62Z'
        />
        <path fill='#204ECF' d='M7.382 64H0V0h7.382v64ZM1 63h5.382V1H1v62Z' />
      </g>
      <defs>
        <clipPath id='a'>
          <path fill='#fff' d='M0 0h64v64H0z' />
        </clipPath>
      </defs>
    </svg>
  )
})

SvgStackBlue64.displayName = 'SvgStackBlue64'
export default SvgStackBlue64
