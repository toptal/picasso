import React, { forwardRef, Ref } from 'react'
import { StandardProps } from '@toptal/picasso-shared'

const SIZE = 64

type ScaleType = 1 | 2
export interface Props extends StandardProps {
  scale?: ScaleType
  base?: number
}
const SvgBiometricWhite64 = forwardRef(function SvgBiometricWhite64(
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
          d='M32 30.271c5.916 0 10.712-4.795 10.712-10.711S37.916 8.848 32 8.848c-5.916 0-10.712 4.796-10.712 10.712 0 5.916 4.796 10.712 10.712 10.712ZM32 34.471A21.627 21.627 0 0 0 10.373 56.1h43.254A21.625 21.625 0 0 0 32 34.47Z'
          fill='#231F20'
        />
        <path
          d='M1 8.848H0V.473h8.375v1H1v7.375ZM64 8.848h-1V1.473h-7.375v-1H64v8.375ZM64 64.473h-8.375v-1H63v-7.375h1v8.375ZM8.375 64.473H0v-8.375h1v7.375h7.375v1ZM32 30.771A11.212 11.212 0 1 1 43.211 19.56 11.224 11.224 0 0 1 32 30.77Zm0-21.423A10.212 10.212 0 1 0 42.211 19.56 10.223 10.223 0 0 0 32 9.348ZM54.127 56.098h-1a21.127 21.127 0 0 0-42.254 0h-1a22.127 22.127 0 0 1 44.254 0Z'
          fill='#fff'
        />
        <path d='M63.5 20.809H.5v1h63v-1Z' fill='#fff' />
      </g>
      <defs>
        <clipPath id='a'>
          <path fill='#fff' transform='translate(0 .473)' d='M0 0h64v64H0z' />
        </clipPath>
      </defs>
    </svg>
  )
})

SvgBiometricWhite64.displayName = 'SvgBiometricWhite64'
export default SvgBiometricWhite64
