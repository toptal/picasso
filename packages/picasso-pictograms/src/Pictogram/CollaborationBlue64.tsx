import type { Ref } from 'react'
import React, { forwardRef } from 'react'
import type { StandardProps } from '@toptal/picasso-shared'

const SIZE = 64

type ScaleType = 1 | 2
export interface Props extends StandardProps {
  scale?: ScaleType
  base?: number
}
const SvgCollaborationBlue64 = forwardRef(function SvgCollaborationBlue64(
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
          d='M47.75 30.397a7.8 7.8 0 1 0 0-15.602 7.8 7.8 0 0 0 0 15.602ZM47.75 33.456A15.75 15.75 0 0 0 32 49.206h31.5a15.75 15.75 0 0 0-15.75-15.75Z'
          opacity={0.15}
        />
        <path
          fill='#204ECF'
          d='M16.25 30.897a8.3 8.3 0 1 1 8.3-8.3 8.31 8.31 0 0 1-8.3 8.3Zm0-15.602a7.301 7.301 0 1 0 7.3 7.301 7.309 7.309 0 0 0-7.3-7.3ZM32.5 49.206h-1a15.25 15.25 0 1 0-30.5 0H0a16.25 16.25 0 1 1 32.5 0ZM47.75 30.897a8.3 8.3 0 1 1 8.3-8.3 8.31 8.31 0 0 1-8.3 8.3Zm0-15.602a7.301 7.301 0 1 0 7.3 7.301 7.309 7.309 0 0 0-7.3-7.3Z'
        />
        <path
          fill='#204ECF'
          d='M64 49.206h-1a15.25 15.25 0 1 0-30.5 0h-1a16.25 16.25 0 0 1 32.5 0ZM48.25 14.795h-1V1h-30.5v13.795h-1V0h32.5v14.795ZM48.25 64h-32.5V49.206h1V63h30.5V49.206h1V64Z'
        />
        <path
          fill='#204ECF'
          d='M47.75 15.207a.67.67 0 0 1-.476-.197l-5.72-5.719.708-.707 5.488 5.489 5.488-5.489.707.707-5.718 5.72a.668.668 0 0 1-.477.197ZM21.616 55.278 16.1 49.762l-5.516 5.516-.707-.707 6.223-6.223 6.223 6.223-.707.707Z'
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

SvgCollaborationBlue64.displayName = 'SvgCollaborationBlue64'
export default SvgCollaborationBlue64
