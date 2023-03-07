import React, { forwardRef, Ref } from 'react'
import { StandardProps } from '@toptal/picasso-shared'

const SIZE = 64

type ScaleType = 1 | 2
export interface Props extends StandardProps {
  scale?: ScaleType
  base?: number
}
const SvgCloudWifiWhite64 = forwardRef(function SvgCloudWifiWhite64(
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
          d='M16.102 34.142H2.461a10.618 10.618 0 0 0 8.678 4.5h2.808a24.739 24.739 0 0 1 2.155-4.5ZM47.868 34.142l2.187 4.5h2.808a10.618 10.618 0 0 0 8.678-4.5H47.868Z'
          fill='#231F20'
        />
        <path
          opacity={0.3}
          d='M32 25.531v21.193a3.135 3.135 0 0 1 0 6.27V63.5a18.985 18.985 0 0 0 0-37.969Z'
          fill='#231F20'
        />
        <path
          d='M52.861 39.143h-2.806v-1h2.806a10.136 10.136 0 0 0 .832-20.24l-.48-.038.021-.481a15.682 15.682 0 0 0-30.082-6.869l-.194.453-.455-.187a7.96 7.96 0 0 0-10.947 6.63l-.042.45-.452.004a10.14 10.14 0 0 0 .077 20.277h2.807v1H11.14a11.139 11.139 0 0 1-.528-22.265 8.96 8.96 0 0 1 11.817-7.193 16.681 16.681 0 0 1 31.821 7.272 11.136 11.136 0 0 1-1.388 22.187Z'
          fill='#fff'
        />
        <path
          d='M32 64a19.485 19.485 0 1 1 19.482-19.484A19.505 19.505 0 0 1 32 64Zm0-37.969a18.484 18.484 0 1 0 18.482 18.485A18.504 18.504 0 0 0 32 26.03Z'
          fill='#fff'
        />
        <path
          d='M32 53.492a3.633 3.633 0 0 1-2.57-6.203 3.722 3.722 0 0 1 5.14 0A3.633 3.633 0 0 1 32 53.492Zm0-6.268a2.636 2.636 0 1 0 1.864.772A2.617 2.617 0 0 0 32 47.224ZM42.865 43.942l-.257-.428A12.27 12.27 0 0 0 32.002 37.5a12.433 12.433 0 0 0-10.608 6.014l-.257.428-.858-.514.257-.429a13.363 13.363 0 0 1 22.93 0l.258.43-.858.513Z'
          fill='#fff'
        />
        <path
          d='m39.51 46.902-.256-.428a8.452 8.452 0 0 0-14.506 0l-.257.428-.858-.514.258-.428a9.452 9.452 0 0 1 16.22-.001l.257.43-.858.513Z'
          fill='#fff'
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

SvgCloudWifiWhite64.displayName = 'SvgCloudWifiWhite64'
export default SvgCloudWifiWhite64