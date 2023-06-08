import type { Ref } from 'react'
import React, { forwardRef } from 'react'
import type { StandardProps } from '@toptal/picasso-shared'

const SIZE = 64

type ScaleType = 1 | 2
export interface Props extends StandardProps {
  scale?: ScaleType
  base?: number
}
const SvgLightbulbWhite64 = forwardRef(function SvgLightbulbWhite64(
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
          fill='#231F20'
          d='M50.737 58.07H.5v5.43h50.237v-5.43ZM39.201.5v11.537h11.536L39.201.5Z'
          opacity={0.3}
        />
        <path
          fill='#fff'
          d='M23.53 11.537H9.479v1h14.053v-1ZM35.042 23.252H9.478v1h25.564v-1ZM28.473 29.82H9.478v1h18.995v-1ZM23.678 36.389h-14.2v1h14.2v-1ZM30.247 42.957H9.478v1h20.769v-1ZM14.52 49.525H9.479v1h5.043v-1Z'
        />
        <path
          fill='#fff'
          d='M50.737 64H0V0h39.408L51.09 11.683l-.707.707L38.994 1H1v62h49.737v1Z'
        />
        <path fill='#fff' d='M50.896 12.537H38.859V.5h1v11.037h11.037v1Z' />
        <path
          fill='#fff'
          d='M51.237 64H0V0h39.408l11.829 11.83v31.589h-1V12.244L38.994 1H1v62h49.237V50.113h1V64Z'
        />
        <path
          fill='#fff'
          d='m60.233 60.156-20.521-20.52-6.997 6.996-10.63-10.63 17.968-17.968 10.63 10.63-6.997 6.997 20.521 20.52-3.974 3.975ZM39.712 38.221l20.52 20.521 2.561-2.56L42.272 35.66l6.997-6.997-9.216-9.216-16.554 16.554 9.216 9.216 6.996-6.997Z'
        />
      </g>
      <defs>
        <clipPath id='a'>
          <path fill='#fff' d='M0 0h64.207v64H0z' />
        </clipPath>
      </defs>
    </svg>
  )
})

SvgLightbulbWhite64.displayName = 'SvgLightbulbWhite64'
export default SvgLightbulbWhite64
