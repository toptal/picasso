import type { Ref } from 'react'
import React, { forwardRef } from 'react'
import type { StandardProps } from '@toptal/picasso-shared'

const SIZE = 64

type ScaleType = 1 | 2
export interface Props extends StandardProps {
  scale?: ScaleType
  base?: number
}
const SvgFlagWhite64 = forwardRef(function SvgFlagWhite64(
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
      viewBox='0 0 65 65'
      className={className}
      style={svgStyle}
      ref={ref}
      data-testid={testId}
    >
      <g clipPath='url(#a)'>
        <path
          fill='#231F20'
          d='M55.676 21.673h-4.814V40h4.814V21.673ZM42.636 17.092h-4.813v18.325h4.813V17.092ZM28.057 28.265H.901l3.584-5.742h23.572v5.742Z'
          opacity={0.3}
        />
        <path fill='#fff' d='M28.557 1.359h-1v63h1v-63Z' />
        <path
          fill='#fff'
          d='M28.057 28.765H0l7.625-12.22L0 4.329h28.057v1H1.803l7 11.218-7 11.219h26.254v1ZM51.362 35.918h-14.04V16.592h14.04v19.326Zm-13.04-1h12.04V17.592h-12.04v17.326Z'
        />
        <path
          fill='#fff'
          d='M64.401 40.5H50.362V21.172h14.04V40.5Zm-13.039-1h12.04V22.172h-12.04V39.5ZM38.323 35.418h-1v28.94h1v-28.94Z'
        />
        <path
          fill='#fff'
          d='M63.901 63.859h-63v1h63v-1ZM38.323 13.623h-1v3.469h1v-3.47Z'
        />
      </g>
      <defs>
        <clipPath id='a'>
          <path fill='#fff' d='M0 .859h64.401v64H0z' />
        </clipPath>
      </defs>
    </svg>
  )
})

SvgFlagWhite64.displayName = 'SvgFlagWhite64'
export default SvgFlagWhite64
