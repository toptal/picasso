import type { Ref } from 'react'
import React, { forwardRef } from 'react'
import type { StandardProps } from '@toptal/picasso-shared'

const SIZE = 64

type ScaleType = 1 | 2
export interface Props extends StandardProps {
  scale?: ScaleType
  base?: number
}
const SvgWinnerBlue64 = forwardRef(function SvgWinnerBlue64(
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
          d='M54.745 60.046H9.255V63.5h45.49v-3.454ZM48.125 53.137h-32.25v3.454h32.25v-3.454ZM32 42.775V.5h16.125v26.15A16.125 16.125 0 0 1 32 42.775Z'
          fill='#183A9E'
        />
        <path
          d='M32 43.274A16.643 16.643 0 0 1 15.375 26.65V0h33.25v26.65A16.643 16.643 0 0 1 32 43.274ZM16.375 1v25.65a15.625 15.625 0 1 0 31.25 0V1h-31.25ZM55.245 64H8.755v-7.909h46.49V64Zm-45.49-1h44.49v-5.909H9.755V63Z'
          fill='#204ECF'
        />
        <path
          d='M48.625 57.091h-33.25v-7.908h33.25v7.908Zm-32.25-1h31.25v-5.908h-31.25v5.908Z'
          fill='#204ECF'
        />
        <path
          d='M32.5 42.774h-1v6.91h1v-6.91ZM15.875 27.15A15.893 15.893 0 0 1 0 11.275v-5.65h15.875v1H1v4.65A14.892 14.892 0 0 0 15.875 26.15v1ZM48.125 27.15v-1A14.892 14.892 0 0 0 63 11.275v-4.65H48.125v-1H64v5.65A15.893 15.893 0 0 1 48.125 27.15Z'
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

SvgWinnerBlue64.displayName = 'SvgWinnerBlue64'
export default SvgWinnerBlue64
