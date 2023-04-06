import type { Ref } from 'react'
import React, { forwardRef } from 'react'
import type { StandardProps } from '@toptal/picasso-shared'

const SIZE = 64

type ScaleType = 1 | 2
export interface Props extends StandardProps {
  scale?: ScaleType
  base?: number
}
const SvgMicrophoneBlue64 = forwardRef(function SvgMicrophoneBlue64(
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
          d='M32 48.212a15.472 15.472 0 0 1-15.47-15.47v-8.386h30.94v8.386A15.472 15.472 0 0 1 32 48.212Z'
          fill='#183A9E'
        />
        <path
          d='M32 55.229A22.513 22.513 0 0 1 9.512 32.742v-8.386h1v8.386a21.488 21.488 0 0 0 42.976 0v-8.386h1v8.386A22.513 22.513 0 0 1 32 55.229Z'
          fill='#204ECF'
        />
        <path
          d='M32 48.712a15.988 15.988 0 0 1-15.97-15.97V15.97a15.97 15.97 0 1 1 31.94 0v16.77A15.988 15.988 0 0 1 32 48.713ZM32 1a14.987 14.987 0 0 0-14.97 14.97v16.772a14.971 14.971 0 0 0 29.94 0V15.97A14.988 14.988 0 0 0 32 1ZM32.5 54.729h-1V63.5h1v-8.771Z'
          fill='#204ECF'
        />
        <path
          d='M47.47 23.856H16.53v1h30.94v-1ZM49.643 63H14.357v1h35.286v-1Z'
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

SvgMicrophoneBlue64.displayName = 'SvgMicrophoneBlue64'
export default SvgMicrophoneBlue64
