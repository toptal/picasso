import type { Ref } from 'react'
import React, { forwardRef } from 'react'
import type { StandardProps } from '@toptal/picasso-shared'

const SIZE = 64

type ScaleType = 1 | 2
export interface Props extends StandardProps {
  scale?: ScaleType
  base?: number
}
const SvgCloudUploadBlue64 = forwardRef(function SvgCloudUploadBlue64(
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
          d='M16.102 34.142H2.461a10.618 10.618 0 0 0 8.678 4.5h2.808a24.732 24.732 0 0 1 2.155-4.5ZM47.868 34.142l2.187 4.5h2.808a10.616 10.616 0 0 0 8.678-4.5H47.868Z'
          fill='#183A9E'
        />
        <path
          opacity={0.15}
          d='M32 25.531V63.5a18.984 18.984 0 1 0 0-37.969Z'
          fill='#183A9E'
        />
        <path
          d='M52.861 39.142h-2.806v-1h2.806a10.136 10.136 0 0 0 .832-20.238l-.48-.04.021-.48a15.68 15.68 0 0 0-30.083-6.869l-.193.453-.455-.187a7.96 7.96 0 0 0-10.947 6.63l-.041.45-.453.004a10.138 10.138 0 0 0 .077 20.277h2.807v1H11.14a11.138 11.138 0 0 1-.527-22.265 8.96 8.96 0 0 1 11.816-7.193 16.682 16.682 0 0 1 31.821 7.272 11.136 11.136 0 0 1-1.388 22.186Z'
          fill='#204ECF'
        />
        <path
          d='M32 64a19.485 19.485 0 1 1 19.482-19.484A19.505 19.505 0 0 1 32 64Zm0-37.969a18.484 18.484 0 1 0 18.482 18.485A18.504 18.504 0 0 0 32 26.03Z'
          fill='#204ECF'
        />
        <path d='M40.724 35.892H23.277v1h17.447v-1Z' fill='#204ECF' />
        <path
          d='m40.371 45.472-8.37-8.373-8.371 8.373-.707-.707 8.652-8.654a.605.605 0 0 1 .85-.002l8.653 8.656-.707.707Z'
          fill='#204ECF'
        />
        <path d='M32.5 36.392h-1v17.452h1V36.392Z' fill='#204ECF' />
      </g>
      <defs>
        <clipPath id='a'>
          <path fill='#fff' d='M0 0h64v64H0z' />
        </clipPath>
      </defs>
    </svg>
  )
})

SvgCloudUploadBlue64.displayName = 'SvgCloudUploadBlue64'
export default SvgCloudUploadBlue64
