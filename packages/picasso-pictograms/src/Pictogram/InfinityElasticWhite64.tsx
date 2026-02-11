import type { Ref } from 'react'
import React, { forwardRef } from 'react'
import type { StandardProps } from '@toptal/picasso-shared'

const SIZE = 64

type ScaleType = 1 | 2
export interface Props extends StandardProps {
  scale?: ScaleType
  base?: number
}
const SvgInfinityElasticWhite64 = forwardRef(function SvgInfinityElasticWhite64(
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
          fill='#000'
          d='M58.03 43.11c-5.86 5.85-15.36 5.85-21.22 0l-5.39-5.57-5.39 5.57c-5.86 5.85-15.36 5.85-21.22 0-2.29-2.3-3.68-5.16-4.17-8.14-.77 4.62.61 9.52 4.17 13.08 5.86 5.85 15.36 5.85 21.22 0l5.39-5.57 5.39 5.57c5.86 5.85 15.36 5.85 21.22 0 3.56-3.56 4.94-8.47 4.17-13.08-.49 2.98-1.88 5.84-4.17 8.14ZM21.08 26.84a8.015 8.015 0 0 0-11.32 0c-2.2 2.2-2.84 5.36-1.94 8.13a8.106 8.106 0 0 1 1.94-3.19 8.015 8.015 0 0 1 11.32 0l3.08 3.19 2.39-2.47-5.47-5.66ZM53.08 26.84a8.015 8.015 0 0 0-11.32 0l-5.47 5.66 2.39 2.47 3.08-3.19a8.015 8.015 0 0 1 11.32 0c.92.93 1.57 2.02 1.94 3.19.9-2.77.25-5.93-1.94-8.13Z'
          opacity={0.3}
        />
        <path
          stroke='#fff'
          strokeMiterlimit={10}
          d='M26.11 43.11c-5.86 5.86-15.36 5.86-21.21 0-5.86-5.86-5.86-15.36 0-21.21 5.86-5.86 15.36-5.86 21.21 0'
        />
        <path
          stroke='#fff'
          strokeMiterlimit={10}
          d='M21.16 38.16c-3.12 3.12-8.19 3.12-11.31 0-3.12-3.12-3.12-8.19 0-11.31 3.12-3.12 8.19-3.12 11.31 0M36.89 21.89c5.86-5.86 15.36-5.86 21.21 0 5.85 5.86 5.86 15.36 0 21.21-5.86 5.85-15.36 5.86-21.21 0'
        />
        <path
          stroke='#fff'
          strokeMiterlimit={10}
          d='M41.84 26.84c3.12-3.12 8.19-3.12 11.31 0 3.12 3.12 3.12 8.19 0 11.31-3.12 3.12-8.19 3.12-11.31 0M21.16 26.84l15.73 16.27M26.11 21.89l15.73 16.27M12.5 52v4.5c0 1.1.9 2 2 2h34c1.1 0 2-.9 2-2V52M50.5 13V8.5c0-1.1-.9-2-2-2h-34c-1.1 0-2 .9-2 2V13M36.37 32.5l5.47-5.66M26.11 43.11l5.39-5.57M31.5 27.47l5.39-5.58M21.16 38.16l5.47-5.66'
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

SvgInfinityElasticWhite64.displayName = 'SvgInfinityElasticWhite64'
export default SvgInfinityElasticWhite64
