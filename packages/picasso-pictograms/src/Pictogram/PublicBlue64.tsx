import type { Ref } from 'react'
import React, { forwardRef } from 'react'
import type { StandardProps } from '@toptal/picasso-shared'

const SIZE = 64

type ScaleType = 1 | 2
export interface Props extends StandardProps {
  scale?: ScaleType
  base?: number
}
const SvgPublicBlue64 = forwardRef(function SvgPublicBlue64(
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
          d='M32 16.872a7.92 7.92 0 1 0 0-15.838 7.92 7.92 0 0 0 0 15.838ZM32 19.978A15.989 15.989 0 0 0 16.01 35.967H47.99a15.99 15.99 0 0 0-15.99-15.989Z'
          opacity={0.15}
        />
        <path
          fill='#204ECF'
          d='M59.768 48.676h-5.536v-1h4.787l3.28-11.209H1.701l3.28 11.209h4.787v1H4.232L.366 35.467h63.268l-3.866 13.209ZM32 17.372a8.42 8.42 0 1 1 8.419-8.42A8.429 8.429 0 0 1 32 17.373Zm0-15.839a7.419 7.419 0 1 0 7.419 7.42A7.427 7.427 0 0 0 32 1.533Z'
        />
        <path
          fill='#204ECF'
          d='M48.488 35.967h-1a15.488 15.488 0 1 0-30.976 0h-1a16.489 16.489 0 0 1 32.976 0ZM54.732 64.033h-1V44.408H10.268v19.625h-1V43.408h45.464v20.625Z'
        />
      </g>
      <defs>
        <clipPath id='a'>
          <path fill='#fff' d='M0 0h64v64.033H0z' />
        </clipPath>
      </defs>
    </svg>
  )
})

SvgPublicBlue64.displayName = 'SvgPublicBlue64'
export default SvgPublicBlue64
