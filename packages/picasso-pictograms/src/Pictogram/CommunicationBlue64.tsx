import type { Ref } from 'react'
import React, { forwardRef } from 'react'
import type { StandardProps } from '@toptal/picasso-shared'

const SIZE = 64

type ScaleType = 1 | 2
export interface Props extends StandardProps {
  scale?: ScaleType
  base?: number
}
const SvgCommunicationBlue64 = forwardRef(function SvgCommunicationBlue64(
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
          d='M50.939 50.939a6.221 6.221 0 1 0 0-12.443 6.221 6.221 0 0 0 0 12.443ZM11.393.5v23.533l7.599-7.599h7.179V8.467h11.658V.5H11.393ZM50.939 50.94A12.56 12.56 0 0 0 38.378 63.5H63.5a12.559 12.559 0 0 0-12.561-12.56Z'
          fill='#183A9E'
        />
        <path
          d='M13.06 51.439a6.72 6.72 0 1 1 6.722-6.721 6.729 6.729 0 0 1-6.721 6.721Zm0-12.442a5.72 5.72 0 1 0 0 11.442 5.72 5.72 0 0 0 0-11.443Z'
          fill='#204ECF'
        />
        <path
          d='M26.122 63.5h-1A12.061 12.061 0 1 0 1 63.5H0a13.06 13.06 0 1 1 26.122 0ZM50.939 51.439a6.72 6.72 0 1 1 6.721-6.721 6.729 6.729 0 0 1-6.721 6.721Zm0-12.442a5.72 5.72 0 1 0 0 11.441 5.72 5.72 0 0 0 0-11.442Z'
          fill='#204ECF'
        />
        <path
          d='M64 63.5h-1a12.06 12.06 0 1 0-24.122 0h-1A13.061 13.061 0 0 1 64 63.5ZM53.107 33.207 44.8 24.901H25.67V7.967h27.436v25.24ZM26.67 23.901h18.545l6.892 6.892V8.967H26.67V23.9Z'
          fill='#204ECF'
        />
        <path
          d='M10.893 25.24V0H38.33v8.467h-1V1H11.893v21.826l6.892-6.892h7.385v1h-6.971l-8.306 8.306Z'
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

SvgCommunicationBlue64.displayName = 'SvgCommunicationBlue64'
export default SvgCommunicationBlue64
