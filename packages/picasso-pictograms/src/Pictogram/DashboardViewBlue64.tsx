import type { Ref } from 'react'
import React, { forwardRef } from 'react'
import type { StandardProps } from '@toptal/picasso-shared'

const SIZE = 64

type ScaleType = 1 | 2
export interface Props extends StandardProps {
  scale?: ScaleType
  base?: number
}
const SvgDashboardViewBlue64 = forwardRef(function SvgDashboardViewBlue64(
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
          d='M4.5 11a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3ZM9.5 11a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3ZM14.5 11a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3ZM16 13H1v42.56C1 56.91 2.09 58 3.44 58H16V15h47v-2H16Zm-2 13H2v-5h12v5Z'
          opacity={0.15}
        />
        <path fill='#183A9C' d='M59 32H20v7h39v-7Z' opacity={0.15} />
        <path
          stroke='#204ECD'
          strokeMiterlimit={10}
          d='M60.5 5.5h-57a3 3 0 0 0-3 3v47a3 3 0 0 0 3 3h57a3 3 0 0 0 3-3v-47a3 3 0 0 0-3-3ZM5 17.5h6M5 23.5h6M5 29.5h6M5 35.5h6M20 19.5h6M20 23.5h39M20 27.5h19M20 44.5h9M20 48.5h9M20 52.5h9M35 44.5h9M35 48.5h9M35 52.5h9M50 44.5h9M50 48.5h9M50 52.5h9'
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

SvgDashboardViewBlue64.displayName = 'SvgDashboardViewBlue64'
export default SvgDashboardViewBlue64
