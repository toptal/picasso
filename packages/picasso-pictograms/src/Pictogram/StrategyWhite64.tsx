import React, { forwardRef, Ref } from 'react'
import { StandardProps } from '@toptal/picasso-shared'

const SIZE = 64

type ScaleType = 1 | 2
export interface Props extends StandardProps {
  scale?: ScaleType
  base?: number
}
const SvgStrategyWhite64 = forwardRef(function SvgStrategyWhite64(
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
          d='M40.158.5H23.842V5h16.316V.5ZM63.5 43.751H.5v9.624h63v-9.624Z'
          fill='#231F20'
        />
        <path
          d='M64 53.875H0V4.5h64v49.375Zm-63-1h62V5.5H1v47.375Z'
          fill='#fff'
        />
        <path
          d='M32.5 53.375h-1V63.5h1V53.375ZM19.88 53.095l-6.857 10.1.827.562 6.857-10.1-.827-.562ZM44.121 53.094l-.827.562 6.855 10.102.827-.561-6.855-10.103ZM40.658 5h-1V1H24.342v4h-1V0h17.316v5ZM47.155 13.326l-8.69 8.69.707.707 8.69-8.69-.707-.707Z'
          fill='#fff'
        />
        <path
          d='m39.172 13.326-.707.707 8.69 8.69.707-.707-8.69-8.69ZM24.828 35.652l-8.69 8.69.707.707 8.69-8.69-.707-.707Z'
          fill='#fff'
        />
        <path
          d='m16.845 35.652-.707.707 8.69 8.69.707-.707-8.69-8.69ZM20.836 22.87a4.845 4.845 0 1 1 0-9.69 4.845 4.845 0 0 1 0 9.69Zm0-8.69a3.845 3.845 0 1 0 0 7.69 3.845 3.845 0 0 0 0-7.69ZM43.164 45.195a4.844 4.844 0 1 1 0-9.688 4.844 4.844 0 0 1 0 9.688Zm0-8.69a3.845 3.845 0 1 0 0 7.69 3.845 3.845 0 0 0 0-7.69Z'
          fill='#fff'
        />
        <path
          d='M39.656 37.778H31.25v-1h8.405l-.065-8.34h1v8.405a.937.937 0 0 1-.935.935Z'
          fill='#fff'
        />
        <path
          d='m24.263 20.743-.707.707 16.182 16.182.707-.707-16.182-16.182Z'
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

SvgStrategyWhite64.displayName = 'SvgStrategyWhite64'
export default SvgStrategyWhite64
