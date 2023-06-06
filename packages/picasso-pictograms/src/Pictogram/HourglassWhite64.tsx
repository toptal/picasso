import type { Ref } from 'react'
import React, { forwardRef } from 'react'
import type { StandardProps } from '@toptal/picasso-shared'

const SIZE = 64

type ScaleType = 1 | 2
export interface Props extends StandardProps {
  scale?: ScaleType
  base?: number
}
const SvgHourglassWhite64 = forwardRef(function SvgHourglassWhite64(
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
          d='M33.203 43.86V32.902a5.732 5.732 0 0 1 3.872-5.427 15.653 15.653 0 0 0 8.702-7.374H18.223a15.653 15.653 0 0 0 8.702 7.374 5.732 5.732 0 0 1 3.872 5.427V43.86l-15.89 15.889H49.09l-15.888-15.89Z'
          opacity={0.3}
        />
        <path
          fill='#fff'
          d='M55.132 64.902H8.868v-2.547a4.19 4.19 0 0 1 3.685-4.155v-5.063a19.436 19.436 0 0 1 13.15-18.382 1.962 1.962 0 0 0 0-3.706 19.435 19.435 0 0 1-13.15-18.382V7.604a4.19 4.19 0 0 1-3.685-4.155V.902h46.264v2.547a4.19 4.19 0 0 1-3.685 4.155v5.063a19.437 19.437 0 0 1-13.15 18.382 1.96 1.96 0 0 0 0 3.706 19.435 19.435 0 0 1 13.15 18.382V58.2a4.191 4.191 0 0 1 3.685 4.155v2.547Zm-45.264-1h44.264v-1.547a3.188 3.188 0 0 0-3.185-3.185h-.5v-6.033A18.436 18.436 0 0 0 37.974 35.7a2.962 2.962 0 0 1 0-5.599 18.434 18.434 0 0 0 12.473-17.435V6.634h.5a3.189 3.189 0 0 0 3.185-3.185V1.902H9.868v1.547a3.189 3.189 0 0 0 3.185 3.185h.5v6.033a18.436 18.436 0 0 0 12.473 17.435 2.962 2.962 0 0 1 0 5.6 18.435 18.435 0 0 0-12.473 17.435v6.033h-.5a3.188 3.188 0 0 0-3.185 3.185v1.547Z'
        />
      </g>
      <defs>
        <clipPath id='a'>
          <path fill='#fff' d='M0 .902h64v64H0z' />
        </clipPath>
      </defs>
    </svg>
  )
})

SvgHourglassWhite64.displayName = 'SvgHourglassWhite64'
export default SvgHourglassWhite64
