import type { Ref } from 'react'
import React, { forwardRef } from 'react'
import type { StandardProps } from '@toptal/picasso-shared'

const SIZE = 64

type ScaleType = 1 | 2
export interface Props extends StandardProps {
  scale?: ScaleType
  base?: number
}
const SvgApplyTalentWhite64 = forwardRef(function SvgApplyTalentWhite64(
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
          d='M19.86 18.184a5.07 5.07 0 1 0 0-10.141 5.07 5.07 0 0 0 0 10.14ZM19.86 20.172A10.238 10.238 0 0 0 9.621 30.409h20.474A10.236 10.236 0 0 0 19.86 20.172ZM57.107 40.019H32.205v-5.247l1.515-1.397h23.387v6.644ZM57.108 45.137H32.205v6.643h24.903v-6.643Z'
          opacity={0.3}
        />
        <path
          fill='#fff'
          d='M19.86 18.684a5.57 5.57 0 1 1 5.57-5.57 5.577 5.577 0 0 1-5.57 5.57Zm0-10.14a4.57 4.57 0 1 0 0 9.14 4.57 4.57 0 0 0 0-9.14ZM30.597 30.409h-1a9.737 9.737 0 0 0-19.474 0h-1a10.737 10.737 0 1 1 21.474 0Z'
        />
        <path
          fill='#fff'
          d='M19.86 39.72a19.859 19.859 0 1 1 19.859-19.86 19.882 19.882 0 0 1-19.86 19.86Zm0-38.72a18.86 18.86 0 1 0 18.859 18.86A18.882 18.882 0 0 0 19.859 1Z'
        />
        <path
          fill='#fff'
          d='M64 64H25.313V38.285h1V63H63V26.313H38.285v-1H64V64Z'
        />
        <path
          fill='#fff'
          d='M57.607 40.519H31.705v-5.746h1v4.746h23.902v-5.643H33.72v-1h23.887v7.643ZM57.607 52.28H31.705v-7.643h25.902v7.643Zm-24.902-1h23.902v-5.643H32.705v5.643ZM57.985 57.234H47.79v1h10.195v-1ZM25.813 54.774H9.227V36.358h1v17.416h15.586v1ZM54.774 25.813h-1V10.226H36.356v-1h18.418v16.587Z'
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

SvgApplyTalentWhite64.displayName = 'SvgApplyTalentWhite64'
export default SvgApplyTalentWhite64
