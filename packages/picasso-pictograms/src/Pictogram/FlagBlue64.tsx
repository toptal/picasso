import type { Ref } from 'react'
import React, { forwardRef } from 'react'
import type { StandardProps } from '@toptal/picasso-shared'

const SIZE = 64

type ScaleType = 1 | 2
export interface Props extends StandardProps {
  scale?: ScaleType
  base?: number
}
const SvgFlagBlue64 = forwardRef(function SvgFlagBlue64(
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
      viewBox='0 0 65 64'
      className={className}
      style={svgStyle}
      ref={ref}
      data-testid={testId}
    >
      <g clipPath='url(#a)'>
        <path
          fill='#183A9E'
          d='M55.676 20.814h-4.814V39.14h4.814V20.814ZM42.636 16.233h-4.813v18.326h4.813V16.233ZM28.057 27.406H.901l3.584-5.742h23.572v5.742Z'
          opacity={0.15}
        />
        <path fill='#204ECF' d='M28.557.5h-1v63h1V.5Z' />
        <path
          fill='#204ECF'
          d='M28.057 27.906H0l7.625-12.219L0 3.469h28.057v1H1.803l7 11.218-7 11.219h26.254v1ZM51.362 35.06h-14.04V15.732h14.04v19.326Zm-13.04-1h12.04V16.732h-12.04v17.326Z'
        />
        <path
          fill='#204ECF'
          d='M64.401 39.64H50.362V20.315h14.04v19.327Zm-13.039-1h12.04V21.315h-12.04v17.327ZM38.323 34.56h-1V63.5h1V34.56Z'
        />
        <path
          fill='#204ECF'
          d='M63.901 63h-63v1h63v-1ZM38.323 12.764h-1v3.469h1v-3.469Z'
        />
      </g>
      <defs>
        <clipPath id='a'>
          <path fill='#fff' d='M0 0h64.401v64H0z' />
        </clipPath>
      </defs>
    </svg>
  )
})

SvgFlagBlue64.displayName = 'SvgFlagBlue64'
export default SvgFlagBlue64
