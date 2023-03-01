import React, { forwardRef, Ref } from 'react'
import { StandardProps } from '@toptal/picasso-shared'

const SIZE = 64

type ScaleType = 1 | 2
export interface Props extends StandardProps {
  scale?: ScaleType
  base?: number
}
const SvgBiometricBlue64 = forwardRef(function SvgBiometricBlue64(
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
          d='M32 29.798c5.916 0 10.712-4.796 10.712-10.711 0-5.916-4.796-10.712-10.712-10.712-5.916 0-10.712 4.796-10.712 10.712 0 5.915 4.796 10.711 10.712 10.711ZM32 33.998a21.627 21.627 0 0 0-21.627 21.627h43.254A21.625 21.625 0 0 0 32 33.998Z'
          fill='#183A9E'
        />
        <path
          d='M1 8.375H0V0h8.375v1H1v7.375ZM64 8.375h-1V1h-7.375V0H64v8.375ZM64 64h-8.375v-1H63v-7.375h1V64ZM8.375 64H0v-8.375h1V63h7.375v1ZM32 30.298a11.212 11.212 0 1 1 11.211-11.212A11.224 11.224 0 0 1 32 30.298Zm0-21.423a10.211 10.211 0 1 0 10.211 10.211A10.223 10.223 0 0 0 32 8.875ZM54.127 55.625h-1a21.127 21.127 0 0 0-42.254 0h-1a22.127 22.127 0 0 1 44.254 0Z'
          fill='#204ECF'
        />
        <path d='M63.5 20.335H.5v1h63v-1Z' fill='#204ECF' />
      </g>
      <defs>
        <clipPath id='a'>
          <path fill='#fff' d='M0 0h64v64H0z' />
        </clipPath>
      </defs>
    </svg>
  )
})

SvgBiometricBlue64.displayName = 'SvgBiometricBlue64'
export default SvgBiometricBlue64
