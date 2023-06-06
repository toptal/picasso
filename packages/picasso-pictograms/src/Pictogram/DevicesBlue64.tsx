import type { Ref } from 'react'
import React, { forwardRef } from 'react'
import type { StandardProps } from '@toptal/picasso-shared'

const SIZE = 64

type ScaleType = 1 | 2
export interface Props extends StandardProps {
  scale?: ScaleType
  base?: number
}
const SvgDevicesBlue64 = forwardRef(function SvgDevicesBlue64(
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
          d='M60.328 26.565H39.531a3.172 3.172 0 0 0-3.172 3.171v30.592a3.172 3.172 0 0 0 3.172 3.172h20.797a3.172 3.172 0 0 0 3.172-3.172V29.736a3.172 3.172 0 0 0-3.172-3.171ZM29.986 51.318h-9.543v5.543h9.543v-5.543ZM23.137.5H10.463A2.625 2.625 0 0 0 7.84 3.125v26.25A2.625 2.625 0 0 0 10.463 32h12.674a2.625 2.625 0 0 0 2.625-2.625V3.125A2.625 2.625 0 0 0 23.137.5Z'
          opacity={0.15}
        />
        <path
          fill='#204ECF'
          d='M50.43 26.564h-1V15.718a1.149 1.149 0 0 0-1.148-1.148h-22.52v-1h22.52a2.15 2.15 0 0 1 2.148 2.148v10.846ZM1 44.898H0v-29.18a2.15 2.15 0 0 1 2.147-2.148h5.691v1h-5.69A1.149 1.149 0 0 0 1 15.718v29.18ZM30.486 51.318h-1v8.889h1v-8.889ZM20.943 51.318h-1v8.889h1v-8.889ZM39.531 63H11.874v1h27.657v-1Z'
        />
        <path
          fill='#204ECF'
          d='M36.36 51.818H2.146A2.15 2.15 0 0 1 0 49.671v-5.273h36.36v1H1v4.273a1.149 1.149 0 0 0 1.147 1.147H36.36v1Z'
        />
        <path
          fill='#204ECF'
          d='M60.328 64H39.531a3.675 3.675 0 0 1-3.672-3.672V29.736a3.675 3.675 0 0 1 3.672-3.672h20.797A3.676 3.676 0 0 1 64 29.736v30.592A3.676 3.676 0 0 1 60.328 64ZM39.531 27.064a2.675 2.675 0 0 0-2.672 2.672v30.592A2.675 2.675 0 0 0 39.531 63h20.797A2.675 2.675 0 0 0 63 60.328V29.736a2.675 2.675 0 0 0-2.672-2.672H39.531ZM23.137 32.5H10.463a3.129 3.129 0 0 1-3.125-3.125V3.125A3.129 3.129 0 0 1 10.463 0h12.674a3.129 3.129 0 0 1 3.125 3.125v26.25a3.129 3.129 0 0 1-3.125 3.125ZM10.463 1a2.127 2.127 0 0 0-2.125 2.125v26.25a2.127 2.127 0 0 0 2.125 2.125h12.674a2.128 2.128 0 0 0 2.125-2.125V3.125A2.128 2.128 0 0 0 23.137 1H10.463Z'
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

SvgDevicesBlue64.displayName = 'SvgDevicesBlue64'
export default SvgDevicesBlue64
