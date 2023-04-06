import type { Ref } from 'react'
import React, { forwardRef } from 'react'
import type { StandardProps } from '@toptal/picasso-shared'

const SIZE = 64

type ScaleType = 1 | 2
export interface Props extends StandardProps {
  scale?: ScaleType
  base?: number
}
const SvgNetworkWhite64 = forwardRef(function SvgNetworkWhite64(
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
          d='M8.023 15.688a7.524 7.524 0 1 0 0-15.047 7.524 7.524 0 0 0 0 15.047ZM55.977 15.688a7.523 7.523 0 1 0 0-15.046 7.523 7.523 0 0 0 0 15.046ZM8.023 63.628a7.524 7.524 0 1 0 0-15.047 7.524 7.524 0 0 0 0 15.047ZM55.977 63.628a7.523 7.523 0 1 0 0-15.047 7.523 7.523 0 0 0 0 15.047ZM32 39.665a7.523 7.523 0 1 0 0-15.047 7.523 7.523 0 0 0 0 15.047Z'
          fill='#231F20'
        />
        <path
          d='M8.023 16.189a8.024 8.024 0 1 1 8.024-8.024 8.032 8.032 0 0 1-8.024 8.024Zm0-15.047a7.023 7.023 0 1 0 7.024 7.023 7.032 7.032 0 0 0-7.024-7.023ZM55.977 16.189A8.024 8.024 0 1 1 64 8.165a8.032 8.032 0 0 1-8.023 8.024Zm0-15.047A7.023 7.023 0 1 0 63 8.165a7.032 7.032 0 0 0-7.023-7.023ZM8.023 64.127a8.024 8.024 0 1 1 8.024-8.023 8.032 8.032 0 0 1-8.024 8.023Zm0-15.046a7.024 7.024 0 1 0 7.024 7.023 7.032 7.032 0 0 0-7.024-7.023ZM55.977 64.127A8.023 8.023 0 1 1 64 56.104a8.032 8.032 0 0 1-8.023 8.023Zm0-15.046A7.024 7.024 0 1 0 63 56.104a7.032 7.032 0 0 0-7.023-7.023ZM8.023 40.165a8.024 8.024 0 1 1 8.024-8.023 8.032 8.032 0 0 1-8.024 8.023Zm0-15.047a7.024 7.024 0 1 0 7.024 7.024 7.032 7.032 0 0 0-7.024-7.024ZM32 40.165a8.024 8.024 0 1 1 8.023-8.023A8.032 8.032 0 0 1 32 40.165Zm0-15.047a7.024 7.024 0 1 0 7.023 7.024A7.031 7.031 0 0 0 32 25.118ZM55.977 40.165A8.023 8.023 0 1 1 64 32.142a8.032 8.032 0 0 1-8.023 8.023Zm0-15.047A7.024 7.024 0 1 0 63 32.142a7.032 7.032 0 0 0-7.023-7.024ZM32 64.142a8.024 8.024 0 1 1 8.023-8.024A8.032 8.032 0 0 1 32 64.142Zm0-15.047a7.023 7.023 0 1 0 7.023 7.023A7.031 7.031 0 0 0 32 49.095ZM32 16.189a8.024 8.024 0 1 1 8.023-8.024A8.032 8.032 0 0 1 32 16.19Zm0-15.047a7.023 7.023 0 1 0 7.023 7.023A7.031 7.031 0 0 0 32 1.142Z'
          fill='#fff'
        />
        <path
          d='M8.523 15.688h-1v8.93h1v-8.93ZM32.5 15.688h-1v8.93h1v-8.93ZM56.477 15.688h-1v8.93h1v-8.93ZM8.523 39.665h-1v8.93h1v-8.93ZM32.5 39.665h-1v8.93h1v-8.93ZM56.477 39.665h-1v8.93h1v-8.93ZM48.453 7.665h-8.93v1h8.93v-1ZM48.453 31.642h-8.93v1h8.93v-1ZM48.453 55.618h-8.93v1h8.93v-1ZM24.477 7.665h-8.93v1h8.93v-1ZM24.477 31.642h-8.93v1h8.93v-1ZM24.477 55.618h-8.93v1h8.93v-1Z'
          fill='#fff'
        />
      </g>
      <defs>
        <clipPath id='a'>
          <path fill='#fff' transform='translate(0 .142)' d='M0 0h64v64H0z' />
        </clipPath>
      </defs>
    </svg>
  )
})

SvgNetworkWhite64.displayName = 'SvgNetworkWhite64'
export default SvgNetworkWhite64
