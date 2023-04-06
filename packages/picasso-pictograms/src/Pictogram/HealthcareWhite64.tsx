import type { Ref } from 'react'
import React, { forwardRef } from 'react'
import type { StandardProps } from '@toptal/picasso-shared'

const SIZE = 64

type ScaleType = 1 | 2
export interface Props extends StandardProps {
  scale?: ScaleType
  base?: number
}
const SvgHealthcareWhite64 = forwardRef(function SvgHealthcareWhite64(
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
          d='M47.221 5.514a16.282 16.282 0 0 0-15.22 10.504A16.28 16.28 0 0 0 .521 22.647c.01.178.026.356.041.534.008.095.013.19.022.284C2.365 41.503 32 60.29 32 60.29s29.635-18.787 31.415-36.825c.01-.094.014-.19.022-.284.015-.178.032-.356.04-.534A16.279 16.279 0 0 0 47.22 5.514Zm-4.674 31.784h-7.031v7.031h-7.032V37.3h-7.03v-7.032h7.03v-7.031h7.032v7.031h7.031v7.031Z'
          fill='#231F20'
        />
        <path
          d='m32 60.882-.268-.17a124.306 124.306 0 0 1-15.108-11.7C6.402 39.7.838 31.121.087 23.514l-.032-.404c-.012-.146-.024-.293-.032-.439A16.779 16.779 0 0 1 32 14.732a16.779 16.779 0 0 1 31.977 7.94c-.007.143-.02.287-.032.43l-.032.412c-.751 7.608-6.315 16.186-16.537 25.497a124.298 124.298 0 0 1-15.108 11.701l-.268.17ZM16.779 6.014A15.796 15.796 0 0 0 1.022 22.62c.007.135.019.27.03.405l.03.39C2.73 40.103 29.043 57.76 32 59.696c2.958-1.935 29.271-19.597 30.917-36.279l.032-.399c.011-.132.023-.264.029-.395a15.78 15.78 0 0 0-30.51-6.427L32 17.426l-.467-1.231A15.867 15.867 0 0 0 16.779 6.014Z'
          fill='#fff'
        />
        <path
          d='M36.016 44.83h-8.032v-7.032h-7.03v-8.031h7.03v-7.032h8.032v7.032h7.03v8.03h-7.03v7.032Zm-7.032-1h6.032v-7.032h7.03v-6.031h-7.03v-7.032h-6.032v7.032h-7.03v6.03h7.03v7.032Z'
          fill='#fff'
        />
      </g>
      <defs>
        <clipPath id='a'>
          <path fill='#fff' transform='translate(0 .902)' d='M0 0h64v64H0z' />
        </clipPath>
      </defs>
    </svg>
  )
})

SvgHealthcareWhite64.displayName = 'SvgHealthcareWhite64'
export default SvgHealthcareWhite64
