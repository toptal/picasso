import React, { forwardRef, Ref } from 'react'
import { StandardProps } from '@toptal/picasso-shared'

const SIZE = 64

type ScaleType = 1 | 2
export interface Props extends StandardProps {
  scale?: ScaleType
  base?: number
}
const SvgWifiInternetWirelessBlue64 = forwardRef(
  function SvgWifiInternetWirelessBlue64(
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
            d='M32 .5v34.746a5.893 5.893 0 0 1 0 11.785V63.5a31.5 31.5 0 1 0 0-63Z'
            fill='#183A9E'
          />
          <path
            d='M32 47.528a6.392 6.392 0 1 1 4.52-10.91A6.39 6.39 0 0 1 32 47.528Zm0-11.78a5.39 5.39 0 1 0 .009 10.781A5.39 5.39 0 0 0 32 35.75ZM52.572 29.414l-.257-.43a23.676 23.676 0 0 0-40.63 0l-.257.43-.858-.514.257-.429a24.675 24.675 0 0 1 42.346 0l.257.429-.858.514Z'
            fill='#204ECF'
          />
          <path
            d='m17.733 34.978-.857-.514.257-.429a17.327 17.327 0 0 1 29.734 0l.257.429-.857.514-.257-.429a16.328 16.328 0 0 0-28.02 0l-.257.43Z'
            fill='#204ECF'
          />
          <path
            d='M32 64a32 32 0 1 1 32-32 32.036 32.036 0 0 1-32 32Zm0-63a31 31 0 1 0 31 31A31.035 31.035 0 0 0 32 1Z'
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
  }
)

SvgWifiInternetWirelessBlue64.displayName = 'SvgWifiInternetWirelessBlue64'
export default SvgWifiInternetWirelessBlue64
