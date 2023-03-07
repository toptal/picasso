import React, { forwardRef, Ref } from 'react'
import { StandardProps } from '@toptal/picasso-shared'

const SIZE = 64

type ScaleType = 1 | 2
export interface Props extends StandardProps {
  scale?: ScaleType
  base?: number
}
const SvgApplyTalentBlue64 = forwardRef(function SvgApplyTalentBlue64(
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
          d='M19.86 18.71a5.07 5.07 0 1 0 0-10.14 5.07 5.07 0 0 0 0 10.14ZM19.86 20.698A10.236 10.236 0 0 0 9.621 30.936h20.474A10.236 10.236 0 0 0 19.86 20.698ZM57.107 40.546H32.205v-5.247l1.515-1.397h23.387v6.644ZM57.108 45.664H32.205v6.643h24.903v-6.643Z'
          fill='#183A9E'
        />
        <path
          d='M19.86 19.21a5.57 5.57 0 1 1-.001-11.14 5.57 5.57 0 0 1 0 11.14Zm0-10.14a4.57 4.57 0 1 0 0 9.141 4.57 4.57 0 0 0 0-9.141ZM30.597 30.936h-1a9.738 9.738 0 0 0-19.474 0h-1a10.737 10.737 0 0 1 21.474 0Z'
          fill='#204ECF'
        />
        <path
          d='M19.86 40.246a19.86 19.86 0 1 1 19.859-19.86 19.882 19.882 0 0 1-19.86 19.86Zm0-38.72a18.86 18.86 0 1 0 18.859 18.86 18.882 18.882 0 0 0-18.86-18.86v.001Z'
          fill='#204ECF'
        />
        <path
          d='M64 64.527H25.313V38.812h1v24.715H63V26.84H38.285v-1H64v38.687Z'
          fill='#204ECF'
        />
        <path
          d='M57.607 41.046H31.705V35.3h1v4.746h23.902v-5.643H33.72v-1h23.887v7.643ZM57.607 52.807H31.705v-7.643h25.902v7.643Zm-24.902-1h23.902v-5.643H32.705v5.643ZM57.985 57.76H47.79v1h10.195v-1ZM25.813 55.3H9.227V36.886h1V54.3h15.586v1ZM54.774 26.34h-1V10.753H36.356v-1h18.418V26.34Z'
          fill='#204ECF'
        />
      </g>
      <defs>
        <clipPath id='a'>
          <path fill='#fff' transform='translate(0 .527)' d='M0 0h64v64H0z' />
        </clipPath>
      </defs>
    </svg>
  )
})

SvgApplyTalentBlue64.displayName = 'SvgApplyTalentBlue64'
export default SvgApplyTalentBlue64
