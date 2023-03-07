import React, { forwardRef, Ref } from 'react'
import { StandardProps } from '@toptal/picasso-shared'

const SIZE = 64

type ScaleType = 1 | 2
export interface Props extends StandardProps {
  scale?: ScaleType
  base?: number
}
const SvgBookOpenWhite64 = forwardRef(function SvgBookOpenWhite64(
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
          d='M57.227 13.375v34.008H38.133A6.134 6.134 0 0 0 32 53.517a6.133 6.133 0 0 0-6.133-6.134H6.773V13.375H.5v41.228h25.912a6.761 6.761 0 0 0 11.177 0H63.5V13.375h-6.273Z'
          fill='#231F20'
        />
        <path
          opacity={0.15}
          d='M32.014 13.375h-.028c.004.092.014.183.014.276 0-.093.01-.184.014-.276Z'
          fill='#fff'
        />
        <path
          d='M32.5 53.517h-1a5.64 5.64 0 0 0-5.633-5.634H6.273V7.017h19.594A6.644 6.644 0 0 1 32 11.124a6.644 6.644 0 0 1 6.133-4.107h19.594v40.866H38.133a5.64 5.64 0 0 0-5.633 5.634ZM7.273 46.883h18.594A6.643 6.643 0 0 1 32 50.99a6.644 6.644 0 0 1 6.133-4.107h18.594V8.017H38.133a5.64 5.64 0 0 0-5.633 5.634h-1a5.64 5.64 0 0 0-5.633-5.634H7.273v38.866Z'
          fill='#fff'
        />
        <path d='M32.5 13.65h-1v39.867h1V13.65Z' fill='#fff' />
        <path
          d='M32 58.058a7.264 7.264 0 0 1-5.847-2.955H0V12.875h6.773v1H1v40.228h25.676l.149.218a6.26 6.26 0 0 0 10.35 0l.15-.218H63V13.875h-5.773v-1H64v42.228H37.847A7.264 7.264 0 0 1 32 58.058Z'
          fill='#fff'
        />
      </g>
      <defs>
        <clipPath id='a'>
          <path fill='#fff' transform='translate(0 .538)' d='M0 0h64v64H0z' />
        </clipPath>
      </defs>
    </svg>
  )
})

SvgBookOpenWhite64.displayName = 'SvgBookOpenWhite64'
export default SvgBookOpenWhite64
