import type { Ref } from 'react'
import React, { forwardRef } from 'react'
import type { StandardProps } from '@toptal/picasso-shared'

const SIZE = 64

type ScaleType = 1 | 2
export interface Props extends StandardProps {
  scale?: ScaleType
  base?: number
}
const SvgDevicesWhite64 = forwardRef(function SvgDevicesWhite64(
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
          d='M60.328 27.103H39.531a3.172 3.172 0 0 0-3.172 3.172v30.592a3.172 3.172 0 0 0 3.172 3.172h20.797a3.172 3.172 0 0 0 3.172-3.172V30.275a3.172 3.172 0 0 0-3.172-3.172ZM29.986 51.857h-9.543v5.542h9.543v-5.542ZM23.137 1.039H10.463A2.625 2.625 0 0 0 7.84 3.664v26.25a2.625 2.625 0 0 0 2.624 2.625h12.674a2.625 2.625 0 0 0 2.625-2.625V3.664a2.625 2.625 0 0 0-2.625-2.625Z'
          fill='#231F20'
        />
        <path
          d='M50.43 27.103h-1V16.256a1.148 1.148 0 0 0-1.148-1.147h-22.52v-1h22.52a2.15 2.15 0 0 1 2.148 2.147v10.847ZM1 45.436H0v-29.18a2.15 2.15 0 0 1 2.147-2.147h5.691v1h-5.69A1.149 1.149 0 0 0 1 16.256v29.18ZM30.486 51.857h-1v8.889h1v-8.89ZM20.943 51.857h-1v8.889h1v-8.89ZM39.531 63.539H11.874v1h27.657v-1Z'
          fill='#fff'
        />
        <path
          d='M36.36 52.357H2.146A2.15 2.15 0 0 1 0 50.209v-5.273h36.36v1H1v4.273a1.149 1.149 0 0 0 1.147 1.148H36.36v1Z'
          fill='#fff'
        />
        <path
          d='M60.328 64.539H39.531a3.675 3.675 0 0 1-3.672-3.672V30.275a3.676 3.676 0 0 1 3.672-3.672h20.797A3.676 3.676 0 0 1 64 30.275v30.592a3.676 3.676 0 0 1-3.672 3.672ZM39.531 27.603a2.675 2.675 0 0 0-2.672 2.672v30.592a2.675 2.675 0 0 0 2.672 2.672h20.797A2.675 2.675 0 0 0 63 60.867V30.275a2.675 2.675 0 0 0-2.672-2.672H39.531ZM23.137 33.039H10.463a3.129 3.129 0 0 1-3.125-3.125V3.664A3.129 3.129 0 0 1 10.463.539h12.674a3.129 3.129 0 0 1 3.125 3.125v26.25a3.129 3.129 0 0 1-3.125 3.125Zm-12.674-31.5a2.127 2.127 0 0 0-2.125 2.125v26.25a2.127 2.127 0 0 0 2.125 2.125h12.674a2.127 2.127 0 0 0 2.125-2.125V3.664a2.128 2.128 0 0 0-2.125-2.125H10.463Z'
          fill='#fff'
        />
      </g>
      <defs>
        <clipPath id='a'>
          <path fill='#fff' transform='translate(0 .539)' d='M0 0h64v64H0z' />
        </clipPath>
      </defs>
    </svg>
  )
})

SvgDevicesWhite64.displayName = 'SvgDevicesWhite64'
export default SvgDevicesWhite64
