import type { Ref } from 'react'
import React, { forwardRef } from 'react'
import type { StandardProps } from '@toptal/picasso-shared'

const SIZE = 64

type ScaleType = 1 | 2
export interface Props extends StandardProps {
  scale?: ScaleType
  base?: number
}
const SvgLaptopBlue64 = forwardRef(function SvgLaptopBlue64(
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
          d='M53.838 38.562H10.955V10.955h42.883v27.607Z'
          fill='#183A9E'
        />
        <path
          opacity={0.15}
          d='M.5 52.638h63v2.172a3.259 3.259 0 0 1-3.259 3.26H3.76A3.256 3.256 0 0 1 .5 54.81v-2.172Z'
          fill='#204ECF'
        />
        <path d='M58.069 42.523H5.93v1H58.07v-1Z' fill='#204ECF' />
        <path
          d='M60.241 58.57H3.76A3.762 3.762 0 0 1 0 54.81v-2.304l5.431-9.614V8.182a2.753 2.753 0 0 1 2.75-2.75H55.82a2.753 2.753 0 0 1 2.75 2.75v34.71L64 52.506v2.305a3.763 3.763 0 0 1-3.759 3.758ZM1 52.768v2.041a2.762 2.762 0 0 0 2.759 2.76H60.24A2.762 2.762 0 0 0 63 54.81V52.77l-5.431-9.614V8.18a1.753 1.753 0 0 0-1.75-1.75H8.18a1.752 1.752 0 0 0-1.75 1.75v34.974L1 52.769Z'
          fill='#204ECF'
        />
        <path d='M63.5 52.138H.5v1h63v-1Z' fill='#204ECF' />
      </g>
      <defs>
        <clipPath id='a'>
          <path fill='#fff' d='M0 0h64v64H0z' />
        </clipPath>
      </defs>
    </svg>
  )
})

SvgLaptopBlue64.displayName = 'SvgLaptopBlue64'
export default SvgLaptopBlue64
