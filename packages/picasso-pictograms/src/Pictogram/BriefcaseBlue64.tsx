import type { Ref } from 'react'
import React, { forwardRef } from 'react'
import type { StandardProps } from '@toptal/picasso-shared'

const SIZE = 64

type ScaleType = 1 | 2
export interface Props extends StandardProps {
  scale?: ScaleType
  base?: number
}
const SvgBriefcaseBlue64 = forwardRef(function SvgBriefcaseBlue64(
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
          d='M.5 21.41V63.5h63V21.41H.5Zm37.367 29.443H26.133V41.93h11.735v8.923Z'
          opacity={0.15}
        />
        <path fill='#204ECF' d='M64 64H0V11.675h64V64ZM1 63h62V12.675H1V63Z' />
        <path
          fill='#204ECF'
          d='M44.969 12.175h-1v-8.3A2.878 2.878 0 0 0 41.094 1H22.906a2.878 2.878 0 0 0-2.875 2.875v8.3h-1v-8.3A3.88 3.88 0 0 1 22.906 0h18.188a3.88 3.88 0 0 1 3.875 3.875v8.3ZM38.368 51.353H25.632V41.43h12.736v9.923Zm-11.736-1h10.736V42.43H26.632v7.923Z'
        />
        <path
          fill='#204ECF'
          d='M26.132 46.892H3.875A3.88 3.88 0 0 1 0 43.017v-3.375h1v3.375a2.878 2.878 0 0 0 2.875 2.875h22.257v1ZM60.125 46.892H37.868v-1h22.257A2.878 2.878 0 0 0 63 43.017v-3.375h1v3.375a3.88 3.88 0 0 1-3.875 3.875Z'
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

SvgBriefcaseBlue64.displayName = 'SvgBriefcaseBlue64'
export default SvgBriefcaseBlue64
