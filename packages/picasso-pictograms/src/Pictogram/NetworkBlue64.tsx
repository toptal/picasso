import React, { forwardRef, Ref } from 'react'
import { StandardProps } from '@toptal/picasso-shared'

const SIZE = 64

type ScaleType = 1 | 2
export interface Props extends StandardProps {
  scale?: ScaleType
  base?: number
}
const SvgNetworkBlue64 = forwardRef(function SvgNetworkBlue64(
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
          d='M8.023 15.547A7.524 7.524 0 1 0 8.023.5a7.524 7.524 0 0 0 0 15.047ZM55.977 15.547a7.523 7.523 0 1 0 0-15.047 7.523 7.523 0 0 0 0 15.047ZM8.023 63.486a7.524 7.524 0 1 0 0-15.047 7.524 7.524 0 0 0 0 15.047ZM55.977 63.486a7.523 7.523 0 1 0 0-15.047 7.523 7.523 0 0 0 0 15.047ZM32 39.523a7.523 7.523 0 1 0 0-15.046 7.523 7.523 0 0 0 0 15.046Z'
          fill='#183A9E'
        />
        <path
          d='M8.023 16.047a8.024 8.024 0 1 1 8.024-8.024 8.032 8.032 0 0 1-8.024 8.024ZM8.023 1a7.023 7.023 0 1 0 7.024 7.023A7.032 7.032 0 0 0 8.023 1ZM55.977 16.047A8.024 8.024 0 1 1 64 8.023a8.032 8.032 0 0 1-8.023 8.024Zm0-15.047A7.023 7.023 0 1 0 63 8.023 7.032 7.032 0 0 0 55.977 1ZM8.023 63.986a8.024 8.024 0 1 1 8.024-8.024 8.032 8.032 0 0 1-8.024 8.024Zm0-15.047a7.024 7.024 0 1 0 7.024 7.023 7.032 7.032 0 0 0-7.024-7.023ZM55.977 63.986A8.023 8.023 0 1 1 64 55.962a8.032 8.032 0 0 1-8.023 8.024Zm0-15.047A7.024 7.024 0 1 0 63 55.962a7.032 7.032 0 0 0-7.023-7.023ZM8.023 40.023A8.024 8.024 0 1 1 16.047 32a8.032 8.032 0 0 1-8.024 8.023Zm0-15.046A7.024 7.024 0 1 0 15.047 32a7.032 7.032 0 0 0-7.024-7.023ZM32 40.023A8.024 8.024 0 1 1 40.023 32 8.032 8.032 0 0 1 32 40.023Zm0-15.046A7.024 7.024 0 1 0 39.023 32 7.031 7.031 0 0 0 32 24.977ZM55.977 40.023A8.023 8.023 0 1 1 64 32a8.032 8.032 0 0 1-8.023 8.023Zm0-15.046A7.024 7.024 0 1 0 63 32a7.032 7.032 0 0 0-7.023-7.023ZM32 64a8.024 8.024 0 1 1 8.023-8.023A8.032 8.032 0 0 1 32 64Zm0-15.047a7.023 7.023 0 1 0 7.023 7.024A7.031 7.031 0 0 0 32 48.953ZM32 16.047a8.024 8.024 0 1 1 8.023-8.024A8.032 8.032 0 0 1 32 16.047ZM32 1a7.023 7.023 0 1 0 7.023 7.023A7.031 7.031 0 0 0 32 1Z'
          fill='#204ECF'
        />
        <path
          d='M8.523 15.547h-1v8.93h1v-8.93ZM32.5 15.547h-1v8.93h1v-8.93ZM56.477 15.547h-1v8.93h1v-8.93ZM8.523 39.523h-1v8.93h1v-8.93ZM32.5 39.523h-1v8.93h1v-8.93ZM56.477 39.523h-1v8.93h1v-8.93ZM48.453 7.523h-8.93v1h8.93v-1ZM48.453 31.5h-8.93v1h8.93v-1ZM48.453 55.477h-8.93v1h8.93v-1ZM24.477 7.523h-8.93v1h8.93v-1ZM24.477 31.5h-8.93v1h8.93v-1ZM24.477 55.477h-8.93v1h8.93v-1Z'
          fill='#204ECF'
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

SvgNetworkBlue64.displayName = 'SvgNetworkBlue64'
export default SvgNetworkBlue64
