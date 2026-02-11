import type { Ref } from 'react'
import React, { forwardRef } from 'react'
import type { StandardProps } from '@toptal/picasso-shared'

const SIZE = 64

type ScaleType = 1 | 2
export interface Props extends StandardProps {
  scale?: ScaleType
  base?: number
}
const SvgStopwatchSpeedBlue64 = forwardRef(function SvgStopwatchSpeedBlue64(
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
      viewBox='0 0 64 65'
      className={className}
      style={svgStyle}
      ref={ref}
      data-testid={testId}
    >
      <g clipPath='url(#a)'>
        <path
          fill='#183A9E'
          d='m32.629 32.37 3.623-18.425A22.126 22.126 0 0 0 32 13.531v18.777c.211 0 .422.021.629.062ZM34.304 33.263c.245.251.448.54.6.857l16.819-8.38a22.095 22.095 0 0 0-4.141-5.755L34.304 33.263ZM29.691 33.269 16.383 20.02a22.026 22.026 0 0 0-.465 30.602l13.71-12.835a3.252 3.252 0 0 1 .063-4.52ZM29.91 38.046 17.798 52.41A21.943 21.943 0 0 0 32 57.603V38.825a3.242 3.242 0 0 1-2.09-.78ZM35.259 35.567a3.251 3.251 0 0 1-.367 1.47l16.749 8.517a21.934 21.934 0 0 0 2.395-9.987H35.259ZM32.74 38.731l4.275 18.291a22 22 0 0 0 10.567-5.873L34.304 37.87c-.43.428-.973.726-1.564.86Z'
          opacity={0.15}
        />
        <path
          fill='#204ECF'
          d='M32 64.002a28.435 28.435 0 1 1 28.435-28.435A28.467 28.467 0 0 1 32 64.002Zm0-55.87a27.435 27.435 0 1 0 27.435 27.435A27.466 27.466 0 0 0 32 8.132ZM38.053.002H25.947v1h12.106v-1ZM52.791 7.217l-.706.707 7.558 7.558.707-.707-7.559-7.558ZM11.209 7.217 3.65 14.775l.707.707 7.558-7.558-.706-.707Z'
        />
        <path
          fill='#204ECF'
          d='M32.5.502h-1v7.13h1V.502ZM8.137 10.996l-.707.707 4.463 4.465.708-.707-4.464-4.465ZM55.863 10.996 51.4 15.46l.707.707 4.464-4.464-.707-.707ZM32 39.324a3.756 3.756 0 1 1 .004-7.513A3.756 3.756 0 0 1 32 39.324Zm0-6.514a2.757 2.757 0 1 0 .003 5.513A2.757 2.757 0 0 0 32 32.81Z'
        />
        <path
          fill='#204ECF'
          d='m16.772 19.632-.707.707 13.277 13.277.707-.707-13.277-13.277Z'
        />
      </g>
      <defs>
        <clipPath id='a'>
          <path fill='#fff' d='M0 0h64v64.002H0z' />
        </clipPath>
      </defs>
    </svg>
  )
})

SvgStopwatchSpeedBlue64.displayName = 'SvgStopwatchSpeedBlue64'
export default SvgStopwatchSpeedBlue64
