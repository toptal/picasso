import React, { forwardRef, Ref } from 'react'
import { StandardProps } from '@toptal/picasso-shared'

const SIZE = 64

type ScaleType = 1 | 2
export interface Props extends StandardProps {
  scale?: ScaleType
  base?: number
}
const SvgTeamBlue64 = forwardRef(function SvgTeamBlue64(
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
      viewBox='0 0 64 65'
      fill='none'
      className={className}
      style={svgStyle}
      ref={ref}
      data-testid={testId}
    >
      <g clipPath='url(#a)'>
        <path
          opacity={0.15}
          d='M32 32.486a4.906 4.906 0 1 0 0-9.811 4.906 4.906 0 0 0 0 9.811Z'
          fill='#183A9E'
        />
        <path
          opacity={0.15}
          d='M32 32.487a9.906 9.906 0 0 0-9.906 9.905h19.811A9.906 9.906 0 0 0 32 32.487Z'
          fill='#183A9E'
        />
        <path
          d='M12.189 11.345a5.406 5.406 0 1 1 0-10.811 5.406 5.406 0 0 1 0 10.811Zm0-9.812a4.406 4.406 0 1 0 0 8.812 4.406 4.406 0 0 0 0-8.812Z'
          fill='#204ECF'
        />
        <path
          d='M22.594 20.751h-1a9.407 9.407 0 0 0-16.063-6.663 9.406 9.406 0 0 0-2.748 6.663h-1a10.406 10.406 0 1 1 20.811 0ZM32 11.345a5.405 5.405 0 1 1 0-10.81 5.405 5.405 0 0 1 0 10.81Zm0-9.812a4.406 4.406 0 1 0 0 8.812 4.406 4.406 0 0 0 0-8.812Z'
          fill='#204ECF'
        />
        <path
          d='M42.406 20.751h-1a9.406 9.406 0 0 0-18.812 0h-1a10.407 10.407 0 0 1 20.812 0ZM51.811 11.345a5.405 5.405 0 1 1 0-10.81 5.405 5.405 0 0 1 0 10.81Zm0-9.812a4.406 4.406 0 1 0 0 8.813 4.406 4.406 0 0 0 0-8.813Z'
          fill='#204ECF'
        />
        <path
          d='M62.217 20.751h-1a9.403 9.403 0 0 0-9.406-9.425 9.405 9.405 0 0 0-9.405 9.425h-1a10.406 10.406 0 1 1 20.81 0ZM12.189 32.987a5.406 5.406 0 1 1-.001-10.812 5.406 5.406 0 0 1 0 10.812Zm0-9.813a4.406 4.406 0 1 0-.001 8.813 4.406 4.406 0 0 0 0-8.813Z'
          fill='#204ECF'
        />
        <path
          d='M22.594 42.392h-1a9.406 9.406 0 0 0-18.81 0h-1a10.406 10.406 0 0 1 20.81 0ZM32 32.987a5.406 5.406 0 1 1 5.406-5.406A5.413 5.413 0 0 1 32 32.987Zm0-9.813a4.406 4.406 0 1 0 0 8.812 4.406 4.406 0 0 0 0-8.812Z'
          fill='#204ECF'
        />
        <path
          d='M42.406 42.392h-1a9.406 9.406 0 0 0-18.812 0h-1a10.406 10.406 0 0 1 20.812 0ZM51.811 32.987a5.406 5.406 0 1 1 0-10.813 5.406 5.406 0 0 1 0 10.813Zm0-9.813a4.406 4.406 0 1 0 0 8.812 4.406 4.406 0 0 0 0-8.812Z'
          fill='#204ECF'
        />
        <path
          d='M62.217 42.392h-1a9.405 9.405 0 0 0-18.811 0h-1a10.406 10.406 0 0 1 20.81 0ZM12.189 54.628a5.405 5.405 0 1 1-.001-10.811 5.405 5.405 0 0 1 0 10.81Zm0-9.812a4.406 4.406 0 1 0 0 8.812 4.406 4.406 0 0 0 0-8.812Z'
          fill='#204ECF'
        />
        <path
          d='M22.594 64.033h-1a9.406 9.406 0 0 0-18.81 0h-1a10.406 10.406 0 0 1 20.81 0ZM32 54.628a5.405 5.405 0 1 1 0-10.81 5.405 5.405 0 0 1 0 10.81Zm0-9.812a4.406 4.406 0 1 0 0 8.813 4.406 4.406 0 0 0 0-8.813Z'
          fill='#204ECF'
        />
        <path
          d='M42.406 64.033h-1a9.406 9.406 0 0 0-18.812 0h-1a10.406 10.406 0 0 1 20.812 0ZM51.811 54.628a5.405 5.405 0 1 1 0-10.81 5.405 5.405 0 0 1 0 10.81Zm0-9.812a4.406 4.406 0 1 0 0 8.812 4.406 4.406 0 0 0 0-8.812Z'
          fill='#204ECF'
        />
        <path
          d='M62.217 64.033h-1a9.405 9.405 0 0 0-18.811 0h-1a10.406 10.406 0 0 1 20.81 0Z'
          fill='#204ECF'
        />
      </g>
      <defs>
        <clipPath id='a'>
          <path fill='#fff' d='M0 0h64v64.033H0z' />
        </clipPath>
      </defs>
    </svg>
  )
})

SvgTeamBlue64.displayName = 'SvgTeamBlue64'
export default SvgTeamBlue64
