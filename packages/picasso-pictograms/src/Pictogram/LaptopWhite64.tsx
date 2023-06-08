import type { Ref } from 'react'
import React, { forwardRef } from 'react'
import type { StandardProps } from '@toptal/picasso-shared'

const SIZE = 64

type ScaleType = 1 | 2
export interface Props extends StandardProps {
  scale?: ScaleType
  base?: number
}
const SvgLaptopWhite64 = forwardRef(function SvgLaptopWhite64(
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
          fill='#231F20'
          d='M53.838 39.55H10.955V11.941h42.883v27.607Z'
          opacity={0.3}
        />
        <path
          fill='#fff'
          d='M.5 53.625h63v2.173a3.259 3.259 0 0 1-3.259 3.258H3.76A3.26 3.26 0 0 1 .5 55.798v-2.173Z'
          opacity={0.15}
        />
        <path fill='#fff' d='M58.069 43.51H5.93v1H58.07v-1Z' />
        <path
          fill='#fff'
          d='M60.241 59.556H3.76A3.763 3.763 0 0 1 0 55.798v-2.305l5.431-9.614V9.17a2.753 2.753 0 0 1 2.75-2.75H55.82a2.753 2.753 0 0 1 2.75 2.75v34.71L64 53.493v2.305a3.763 3.763 0 0 1-3.759 3.758ZM1 53.756v2.042a2.762 2.762 0 0 0 2.759 2.758H60.24A2.763 2.763 0 0 0 63 55.798v-2.042l-5.431-9.614V9.168a1.753 1.753 0 0 0-1.75-1.75H8.18a1.752 1.752 0 0 0-1.75 1.75v34.974L1 53.756Z'
        />
        <path fill='#fff' d='M63.5 53.125H.5v1h63v-1Z' />
      </g>
      <defs>
        <clipPath id='a'>
          <path fill='#fff' d='M0 .987h64v64H0z' />
        </clipPath>
      </defs>
    </svg>
  )
})

SvgLaptopWhite64.displayName = 'SvgLaptopWhite64'
export default SvgLaptopWhite64
