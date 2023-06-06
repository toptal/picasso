import type { Ref } from 'react'
import React, { forwardRef } from 'react'
import type { StandardProps } from '@toptal/picasso-shared'

const SIZE = 64

type ScaleType = 1 | 2
export interface Props extends StandardProps {
  scale?: ScaleType
  base?: number
}
const SvgMicrophoneWhite64 = forwardRef(function SvgMicrophoneWhite64(
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
          d='M32 48.354a15.472 15.472 0 0 1-15.47-15.47v-8.386h30.94v8.385A15.472 15.472 0 0 1 32 48.353Z'
          opacity={0.3}
        />
        <path
          fill='#fff'
          d='M32 55.37A22.513 22.513 0 0 1 9.512 32.884v-8.385h1v8.385a21.488 21.488 0 0 0 42.976 0v-8.385h1v8.385A22.513 22.513 0 0 1 32 55.371Z'
        />
        <path
          fill='#fff'
          d='M32 48.854a15.988 15.988 0 0 1-15.97-15.97V16.111a15.97 15.97 0 1 1 31.94 0v16.771A15.988 15.988 0 0 1 32 48.854Zm0-47.712a14.987 14.987 0 0 0-14.97 14.97v16.771a14.971 14.971 0 0 0 29.94 0v-16.77A14.988 14.988 0 0 0 32 1.141ZM32.5 54.87h-1v8.772h1V54.87Z'
        />
        <path
          fill='#fff'
          d='M47.47 23.998H16.53v1h30.94v-1ZM49.643 63.142H14.357v1h35.286v-1Z'
        />
      </g>
      <defs>
        <clipPath id='a'>
          <path fill='#fff' d='M0 .142h64v64H0z' />
        </clipPath>
      </defs>
    </svg>
  )
})

SvgMicrophoneWhite64.displayName = 'SvgMicrophoneWhite64'
export default SvgMicrophoneWhite64
