import React, { forwardRef, Ref } from 'react'
import { StandardProps } from '@toptal/picasso-shared'

const SIZE = 64

type ScaleType = 1 | 2
export interface Props extends StandardProps {
  scale?: ScaleType
  base?: number
}
const SvgEnergyWhite64 = forwardRef(function SvgEnergyWhite64(
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
      viewBox='0 0 65 65'
      fill='none'
      className={className}
      style={svgStyle}
      ref={ref}
      data-testid={testId}
    >
      <g clipPath='url(#a)'>
        <path
          opacity={0.3}
          d='M29.518 34.643H6.898l.858-4.056h20.905l.857 4.056ZM59.01 42.562H40.407l.857-4.056h16.888l.858 4.056ZM33.722 54.064H2.793L.617 64.359h35.182l-2.077-10.295ZM61.539 54.064H37.976l-2.177 10.295h27.818l-2.078-10.295Z'
          fill='#231F20'
        />
        <path
          d='M36.416 64.859H0L8.208 26.03h20l8.208 38.828Zm-35.183-1h33.95L27.398 27.03H9.018L1.233 63.859Z'
          fill='#fff'
        />
        <path
          d='M64.233 64.859h-29.05l6.533-30.91H57.7l6.533 30.91Zm-27.817-1H63l-6.11-28.91H42.527l-6.111 28.91ZM18.708 26.53h-1V23a3.832 3.832 0 0 0-3.828-3.828H4.945a4.828 4.828 0 0 1 0-9.657h30.462a3.828 3.828 0 0 0 0-7.656H11.299v-1h24.108a4.828 4.828 0 0 1 0 9.656H4.945a3.828 3.828 0 0 0 0 7.657h8.935A4.834 4.834 0 0 1 18.708 23v3.53Z'
          fill='#fff'
        />
        <path
          d='M50.208 34.45h-1v-3.573a4.834 4.834 0 0 1 4.828-4.828h5.253a3.828 3.828 0 1 0 0-7.657h-5.488a4.828 4.828 0 0 1 0-9.656h5.954v1H53.8a3.828 3.828 0 0 0 0 7.656h5.488a4.828 4.828 0 1 1 0 9.657h-5.253a3.832 3.832 0 0 0-3.828 3.828v3.573Z'
          fill='#fff'
        />
      </g>
      <defs>
        <clipPath id='a'>
          <path
            fill='#fff'
            transform='translate(0 .859)'
            d='M0 0h64.233v64H0z'
          />
        </clipPath>
      </defs>
    </svg>
  )
})

SvgEnergyWhite64.displayName = 'SvgEnergyWhite64'
export default SvgEnergyWhite64
