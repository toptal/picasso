import React, { forwardRef, Ref } from 'react'
import { StandardProps } from '@toptal/picasso-shared'

const SIZE = 64

type ScaleType = 1 | 2
export interface Props extends StandardProps {
  scale?: ScaleType
  base?: number
}
const SvgEnergyBlue64 = forwardRef(function SvgEnergyBlue64(
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
      viewBox='0 0 65 64'
      fill='none'
      className={className}
      style={svgStyle}
      ref={ref}
      data-testid={testId}
    >
      <g clipPath='url(#a)'>
        <path
          opacity={0.15}
          d='M29.518 33.784H6.898l.858-4.056h20.905l.857 4.056ZM59.01 41.703H40.407l.857-4.056h16.888l.858 4.056ZM33.722 53.205H2.793L.617 63.5h35.182l-2.077-10.295ZM61.539 53.205H37.976L35.799 63.5h27.818l-2.078-10.295Z'
          fill='#183A9E'
        />
        <path
          d='M36.416 64H0l8.208-38.828h20L36.416 64ZM1.233 63h33.95l-7.785-36.828H9.018L1.233 63Z'
          fill='#204ECF'
        />
        <path
          d='M64.233 64h-29.05l6.533-30.91H57.7L64.233 64Zm-27.817-1H63l-6.11-28.91H42.527L36.416 63ZM18.708 25.672h-1v-3.53a3.833 3.833 0 0 0-3.828-3.829H4.945a4.828 4.828 0 0 1 0-9.656h30.462a3.828 3.828 0 0 0 0-7.657H11.299V0h24.108a4.828 4.828 0 0 1 0 9.657H4.945a3.828 3.828 0 0 0 0 7.656h8.935a4.833 4.833 0 0 1 4.828 4.829v3.53Z'
          fill='#204ECF'
        />
        <path
          d='M50.208 33.59h-1V30.02a4.834 4.834 0 0 1 4.828-4.828h5.253a3.828 3.828 0 0 0 0-7.657h-5.488a4.828 4.828 0 0 1 0-9.656h5.954v1H53.8a3.828 3.828 0 0 0 0 7.656h5.488a4.828 4.828 0 1 1 0 9.657h-5.253a3.832 3.832 0 0 0-3.828 3.828v3.572Z'
          fill='#204ECF'
        />
      </g>
      <defs>
        <clipPath id='a'>
          <path fill='#fff' d='M0 0h64.233v64H0z' />
        </clipPath>
      </defs>
    </svg>
  )
})

SvgEnergyBlue64.displayName = 'SvgEnergyBlue64'
export default SvgEnergyBlue64
