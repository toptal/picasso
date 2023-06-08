import type { Ref } from 'react'
import React, { forwardRef } from 'react'
import type { StandardProps } from '@toptal/picasso-shared'

const SIZE = 64

type ScaleType = 1 | 2
export interface Props extends StandardProps {
  scale?: ScaleType
  base?: number
}
const SvgTravelWhite64 = forwardRef(function SvgTravelWhite64(
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
          d='M13.712 17.878H8.638v33.674h5.074V17.878ZM22.718 17.878h-5.073v33.674h5.073V17.878ZM31.726 17.878h-5.074v33.674h5.073V17.878ZM44.869 10.837v7.04H63.5l-18.631-7.04ZM49.238 41.232a6.517 6.517 0 1 0 0-13.034 6.517 6.517 0 0 0 0 13.034Z'
          opacity={0.3}
        />
        <path
          fill='#fff'
          d='M36.605 60.749H3.759A3.763 3.763 0 0 1 0 56.99V12.44A3.763 3.763 0 0 1 3.759 8.68h32.846a3.763 3.763 0 0 1 3.759 3.759v5.438h-1V12.44a2.762 2.762 0 0 0-2.759-2.759H3.759A2.762 2.762 0 0 0 1 12.44v44.55a2.762 2.762 0 0 0 2.759 2.759h32.846a2.762 2.762 0 0 0 2.759-2.759v-5.438h1v5.438a3.763 3.763 0 0 1-3.759 3.759Z'
        />
        <path
          fill='#fff'
          d='M8.638 64a3.755 3.755 0 0 1-3.75-3.751h1a2.751 2.751 0 0 0 5.501 0h1A3.755 3.755 0 0 1 8.64 64ZM31.726 64a3.755 3.755 0 0 1-3.751-3.751h1a2.751 2.751 0 1 0 5.502 0h1A3.755 3.755 0 0 1 31.726 64ZM27.008 9.181h-1v-5.87A2.314 2.314 0 0 0 23.697 1h-7.03a2.315 2.315 0 0 0-2.312 2.312v5.87h-1v-5.87A3.315 3.315 0 0 1 16.668 0h7.029a3.315 3.315 0 0 1 3.311 3.312v5.87ZM64 52.052H34.477V17.378h9.892v-7.265L64 17.533v34.519Zm-28.523-1H63V18.378H35.477v32.674Zm9.892-33.674h15.394L45.369 11.56v5.818Z'
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

SvgTravelWhite64.displayName = 'SvgTravelWhite64'
export default SvgTravelWhite64
