import type { Ref } from 'react'
import React, { forwardRef } from 'react'
import type { StandardProps } from '@toptal/picasso-shared'

const SIZE = 64

type ScaleType = 1 | 2
export interface Props extends StandardProps {
  scale?: ScaleType
  base?: number
}
const SvgHourglassBlue64 = forwardRef(function SvgHourglassBlue64(
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
          d='M33.203 42.958V32a5.732 5.732 0 0 1 3.872-5.427 15.654 15.654 0 0 0 8.702-7.373H18.223a15.654 15.654 0 0 0 8.702 7.373A5.733 5.733 0 0 1 30.797 32v10.958l-15.89 15.889H49.09L33.203 42.958Z'
          opacity={0.15}
        />
        <path
          fill='#204ECF'
          d='M55.132 64H8.868v-2.547a4.19 4.19 0 0 1 3.685-4.155v-5.063a19.436 19.436 0 0 1 13.15-18.382 1.961 1.961 0 0 0 0-3.706 19.435 19.435 0 0 1-13.15-18.382V6.702a4.19 4.19 0 0 1-3.685-4.155V0h46.264v2.547a4.19 4.19 0 0 1-3.685 4.155v5.063a19.436 19.436 0 0 1-13.15 18.382 1.96 1.96 0 0 0 0 3.706 19.435 19.435 0 0 1 13.15 18.382v5.063a4.19 4.19 0 0 1 3.685 4.155V64ZM9.868 63h44.264v-1.547a3.188 3.188 0 0 0-3.185-3.185h-.5v-6.033a18.436 18.436 0 0 0-12.473-17.436 2.962 2.962 0 0 1 0-5.598 18.435 18.435 0 0 0 12.473-17.436V5.732h.5a3.188 3.188 0 0 0 3.185-3.185V1H9.868v1.547a3.189 3.189 0 0 0 3.185 3.185h.5v6.033a18.436 18.436 0 0 0 12.473 17.436 2.962 2.962 0 0 1 0 5.598 18.435 18.435 0 0 0-12.473 17.436v6.033h-.5a3.188 3.188 0 0 0-3.185 3.185V63Z'
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

SvgHourglassBlue64.displayName = 'SvgHourglassBlue64'
export default SvgHourglassBlue64
