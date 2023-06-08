import type { Ref } from 'react'
import React, { forwardRef } from 'react'
import type { StandardProps } from '@toptal/picasso-shared'

const SIZE = 64

type ScaleType = 1 | 2
export interface Props extends StandardProps {
  scale?: ScaleType
  base?: number
}
const SvgInvestmentBlue64 = forwardRef(function SvgInvestmentBlue64(
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
          d='M21.23 26.699h-6.861v10.56h6.86V26.7ZM38.081 47.974H25.92v7.069H38.08v-7.069Z'
          opacity={0.15}
        />
        <path
          fill='#204ECF'
          d='M50.13 30.873h-7.859V9.939h7.86v20.934Zm-6.859-1h5.86V10.939h-5.86v18.934Z'
        />
        <path
          fill='#204ECF'
          d='M46.701 7.694h-1v2.745h1V7.694ZM46.701 30.373h-1v5.768h1v-5.768ZM35.93 33.895h-7.86V17.534h7.86v16.36Zm-6.86-1h5.86V18.534h-5.86v14.36Z'
        />
        <path
          fill='#204ECF'
          d='M32.5 10.439h-1v7.595h1v-7.595ZM32.5 33.395h-1v7.385h1v-7.386ZM21.73 37.76h-7.861V26.198h7.86v11.56Zm-6.861-1h5.86v-9.561h-5.86v9.56Z'
        />
        <path
          fill='#204ECF'
          d='M18.299 18.587h-1v8.112h1v-8.112ZM18.299 37.26h-1v3.52h1v-3.52Z'
        />
        <path
          fill='#204ECF'
          d='M61.327 48.474H2.672A2.676 2.676 0 0 1 0 45.802V2.672A2.675 2.675 0 0 1 2.672 0h58.655A2.676 2.676 0 0 1 64 2.672v43.13a2.676 2.676 0 0 1-2.673 2.672ZM2.672 1A1.674 1.674 0 0 0 1 2.672v43.13a1.674 1.674 0 0 0 1.672 1.672h58.655A1.674 1.674 0 0 0 63 45.802V2.672A1.674 1.674 0 0 0 61.327 1H2.672Z'
        />
        <path
          fill='#204ECF'
          d='M38.581 47.974h-1v11.627h1V47.974ZM26.419 47.974h-1v11.627h1V47.974ZM47.62 63H16.38v1H47.62v-1Z'
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

SvgInvestmentBlue64.displayName = 'SvgInvestmentBlue64'
export default SvgInvestmentBlue64
