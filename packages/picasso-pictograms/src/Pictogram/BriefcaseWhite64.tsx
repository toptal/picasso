import type { Ref } from 'react'
import React, { forwardRef } from 'react'
import type { StandardProps } from '@toptal/picasso-shared'

const SIZE = 64

type ScaleType = 1 | 2
export interface Props extends StandardProps {
  scale?: ScaleType
  base?: number
}
const SvgBriefcaseWhite64 = forwardRef(function SvgBriefcaseWhite64(
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
          d='M.5 21.947v42.091h63v-42.09H.5Zm37.367 29.444H26.133v-8.923h11.735v8.923Z'
          opacity={0.3}
        />
        <path
          fill='#fff'
          d='M64 64.538H0V12.213h64v52.325Zm-63-1h62V13.213H1v50.325Z'
        />
        <path
          fill='#fff'
          d='M44.969 12.713h-1v-8.3a2.878 2.878 0 0 0-2.875-2.875H22.906a2.878 2.878 0 0 0-2.875 2.875v8.3h-1v-8.3A3.88 3.88 0 0 1 22.906.538h18.188a3.88 3.88 0 0 1 3.875 3.875v8.3ZM38.368 51.891H25.632v-9.923h12.736v9.923Zm-11.736-1h10.736v-7.923H26.632v7.923Z'
        />
        <path
          fill='#fff'
          d='M26.132 47.43H3.875A3.88 3.88 0 0 1 0 43.555V40.18h1v3.375a2.878 2.878 0 0 0 2.875 2.875h22.257v1ZM60.125 47.43H37.868v-1h22.257A2.878 2.878 0 0 0 63 43.555V40.18h1v3.375a3.88 3.88 0 0 1-3.875 3.875Z'
        />
      </g>
      <defs>
        <clipPath id='a'>
          <path fill='#fff' d='M0 .538h64v64H0z' />
        </clipPath>
      </defs>
    </svg>
  )
})

SvgBriefcaseWhite64.displayName = 'SvgBriefcaseWhite64'
export default SvgBriefcaseWhite64
