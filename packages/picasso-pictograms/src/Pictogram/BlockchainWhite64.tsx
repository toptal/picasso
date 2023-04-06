import type { Ref } from 'react'
import React, { forwardRef } from 'react'
import type { StandardProps } from '@toptal/picasso-shared'

const SIZE = 64

type ScaleType = 1 | 2
export interface Props extends StandardProps {
  scale?: ScaleType
  base?: number
}
const SvgBlockchainWhite64 = forwardRef(function SvgBlockchainWhite64(
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
          d='M63.5 11.59H42.266v10.618H63.5V11.59ZM21.734 11.59H.5v10.618h21.234V11.59ZM63.5 53.356H42.266v10.617H63.5V53.356ZM21.734 53.356H.5v10.617h21.234V53.356Z'
          fill='#231F20'
        />
        <path
          d='M22.234 22.708H0V.473h22.234v22.235ZM1 21.708h20.234V1.473H1v20.235ZM64 22.708H41.766V.473H64v22.235Zm-21.234-1H63V1.473H42.766v20.235Z'
          fill='#fff'
        />
        <path
          d='M11.617 22.208h-1v20.531h1V22.208ZM42.266 52.856H21.734v1h20.532v-1ZM53.383 22.208h-1v20.531h1V22.208ZM42.266 11.09H21.734v1h20.532v-1Z'
          fill='#fff'
        />
        <path
          d='M22.234 64.473H0V42.24h22.234v22.234ZM1 63.473h20.234V43.24H1v20.234ZM64 64.473H41.766V42.24H64v22.234Zm-21.234-1H63V43.24H42.766v20.234Z'
          fill='#fff'
        />
      </g>
      <defs>
        <clipPath id='a'>
          <path fill='#fff' transform='translate(0 .473)' d='M0 0h64v64H0z' />
        </clipPath>
      </defs>
    </svg>
  )
})

SvgBlockchainWhite64.displayName = 'SvgBlockchainWhite64'
export default SvgBlockchainWhite64
