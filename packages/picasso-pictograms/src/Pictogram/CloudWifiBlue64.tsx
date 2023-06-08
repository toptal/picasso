import type { Ref } from 'react'
import React, { forwardRef } from 'react'
import type { StandardProps } from '@toptal/picasso-shared'

const SIZE = 64

type ScaleType = 1 | 2
export interface Props extends StandardProps {
  scale?: ScaleType
  base?: number
}
const SvgCloudWifiBlue64 = forwardRef(function SvgCloudWifiBlue64(
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
          d='M16.102 34.142H2.46a10.618 10.618 0 0 0 8.678 4.5h2.807a24.732 24.732 0 0 1 2.156-4.5ZM47.868 34.142l2.187 4.5h2.808a10.618 10.618 0 0 0 8.678-4.5H47.868Z'
          opacity={0.15}
        />
        <path
          fill='#183A9E'
          d='M32 25.531v21.193a3.135 3.135 0 1 1 0 6.27V63.5a18.984 18.984 0 0 0 0-37.969Z'
          opacity={0.15}
        />
        <path
          fill='#204ECF'
          d='M52.861 39.143h-2.806v-1h2.806a10.136 10.136 0 0 0 .832-20.24l-.48-.038.021-.481a15.682 15.682 0 0 0-30.082-6.869l-.194.453-.455-.187a7.96 7.96 0 0 0-10.947 6.63l-.042.45-.453.004a10.14 10.14 0 0 0 .078 20.277h2.807v1H11.14a11.139 11.139 0 0 1-.528-22.265 8.958 8.958 0 0 1 11.817-7.193 16.681 16.681 0 0 1 31.821 7.272 11.137 11.137 0 0 1-1.388 22.187Z'
        />
        <path
          fill='#204ECF'
          d='M32 64a19.485 19.485 0 1 1 19.481-19.484A19.505 19.505 0 0 1 32.001 64Zm0-37.969a18.484 18.484 0 1 0 18.481 18.485 18.504 18.504 0 0 0-18.48-18.485Z'
        />
        <path
          fill='#204ECF'
          d='M32 53.492a3.633 3.633 0 0 1-2.57-6.203 3.722 3.722 0 0 1 5.14 0A3.633 3.633 0 0 1 32 53.492Zm0-6.268a2.637 2.637 0 1 0 1.864.772A2.617 2.617 0 0 0 32 47.224ZM42.865 43.942l-.257-.428A12.27 12.27 0 0 0 32.001 37.5a12.433 12.433 0 0 0-10.608 6.014l-.257.428-.858-.514.257-.429a13.363 13.363 0 0 1 22.93 0l.258.43-.858.513Z'
        />
        <path
          fill='#204ECF'
          d='m39.51 46.902-.257-.428a8.453 8.453 0 0 0-14.505 0l-.257.428-.858-.514.258-.428a9.452 9.452 0 0 1 16.22-.001l.257.43-.858.513Z'
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

SvgCloudWifiBlue64.displayName = 'SvgCloudWifiBlue64'
export default SvgCloudWifiBlue64
