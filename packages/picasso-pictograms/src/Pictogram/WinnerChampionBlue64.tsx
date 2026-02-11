import type { Ref } from 'react'
import React, { forwardRef } from 'react'
import type { StandardProps } from '@toptal/picasso-shared'

const SIZE = 64

type ScaleType = 1 | 2
export interface Props extends StandardProps {
  scale?: ScaleType
  base?: number
}
const SvgWinnerChampionBlue64 = forwardRef(function SvgWinnerChampionBlue64(
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
          fill='#183A9C'
          d='m60 38-7 21H42V27h-3l-7 32H21V49h-3l-7 10H1v4h62V38h-3ZM21.6 9.05 32 12.38l10.4-3.33-5.2 5.07 1.23 7.16-6.43-8.9v5.52l-6.43 3.38 1.23-7.16-5.2-5.07Z'
          opacity={0.15}
        />
        <path
          stroke='#204ECD'
          strokeMiterlimit={10}
          d='M42.5 37.5v-11h-21v22H.5v15h63v-26h-21ZM21.5 49v10M42.5 38v21M32 1.49 35.21 8l7.19 1.05-5.2 5.07 1.23 7.16L32 17.9l-6.43 3.38 1.23-7.16-5.2-5.07L28.79 8 32 1.49Z'
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

SvgWinnerChampionBlue64.displayName = 'SvgWinnerChampionBlue64'
export default SvgWinnerChampionBlue64
