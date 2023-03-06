import React, { forwardRef, Ref } from 'react'
import { StandardProps } from '@toptal/picasso-shared'

const SIZE = 64

type ScaleType = 1 | 2
export interface Props extends StandardProps {
  scale?: ScaleType
  base?: number
}
const SvgEarWhite64 = forwardRef(function SvgEarWhite64(
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
          opacity={0.3}
          d='M53.018 22.756a11.022 11.022 0 0 0-21.95-1.448l-.106 1.448v4.657a8.7 8.7 0 1 1 0 17.398v7.247a1.743 1.743 0 0 0 3.19.972L51.02 29.088l-.009-.001a10.966 10.966 0 0 0 2.007-6.33Z'
          fill='#231F20'
        />
        <path
          d='M32.667 64.746A12.703 12.703 0 0 1 19.98 52.058h1a11.685 11.685 0 0 0 21.434 6.447l.211-.319.016.005L58.655 35.58l-.006-.003.382-.538A21.008 21.008 0 1 0 20.98 22.756h-1a22.01 22.01 0 1 1 40.24 12.328l.003.002-.373.537-16.718 23.604a12.666 12.666 0 0 1-10.465 5.519Z'
          fill='#fff'
        />
        <path
          d='m11.283 58.203-5.706-16.95H.5v-1h5.796l4.987 14.815 7.962-23.648 4.34 12.892h7.377a8.2 8.2 0 0 0 0-16.4h-.5v-5.156a11.528 11.528 0 0 1 23.056 0h-1a10.528 10.528 0 0 0-21.056 0v4.17a9.2 9.2 0 0 1-.5 18.386h-8.096l-3.621-10.758-7.962 23.65Z'
          fill='#fff'
        />
      </g>
      <defs>
        <clipPath id='a'>
          <path fill='#fff' transform='translate(0 .746)' d='M0 0h64v64H0z' />
        </clipPath>
      </defs>
    </svg>
  )
})

SvgEarWhite64.displayName = 'SvgEarWhite64'
export default SvgEarWhite64
