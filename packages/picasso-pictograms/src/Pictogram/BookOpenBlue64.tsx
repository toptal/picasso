import type { Ref } from 'react'
import React, { forwardRef } from 'react'
import type { StandardProps } from '@toptal/picasso-shared'

const SIZE = 64

type ScaleType = 1 | 2
export interface Props extends StandardProps {
  scale?: ScaleType
  base?: number
}
const SvgBookOpenBlue64 = forwardRef(function SvgBookOpenBlue64(
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
          d='M57.227 12.837v34.008H38.133A6.134 6.134 0 0 0 32 52.98a6.133 6.133 0 0 0-6.133-6.134H6.773V12.837H.5v41.228h25.912a6.761 6.761 0 0 0 11.177 0H63.5V12.837h-6.273Z'
          opacity={0.15}
        />
        <path
          fill='#204ECF'
          d='M32.014 12.837h-.028c.004.092.014.183.014.276 0-.093.01-.184.014-.276Z'
          opacity={0.15}
        />
        <path
          fill='#204ECF'
          d='M32.5 52.979h-1a5.64 5.64 0 0 0-5.633-5.634H6.273V6.48h19.594A6.644 6.644 0 0 1 32 10.586a6.644 6.644 0 0 1 6.133-4.107h19.594v40.866H38.133A5.64 5.64 0 0 0 32.5 52.98ZM7.273 46.345h18.594A6.644 6.644 0 0 1 32 50.452a6.645 6.645 0 0 1 6.133-4.107h18.594V7.479H38.133a5.64 5.64 0 0 0-5.633 5.634h-1a5.64 5.64 0 0 0-5.633-5.634H7.273v38.866Z'
        />
        <path fill='#204ECF' d='M32.5 13.113h-1v39.866h1V13.113Z' />
        <path
          fill='#204ECF'
          d='M32 57.52a7.263 7.263 0 0 1-5.847-2.955H0V12.337h6.773v1H1v40.228h25.676l.149.218a6.262 6.262 0 0 0 10.35 0l.15-.218H63V13.337h-5.773v-1H64v42.228H37.847A7.264 7.264 0 0 1 32 57.52Z'
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

SvgBookOpenBlue64.displayName = 'SvgBookOpenBlue64'
export default SvgBookOpenBlue64
