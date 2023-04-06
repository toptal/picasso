import type { Ref } from 'react'
import React, { forwardRef } from 'react'
import type { StandardProps } from '@toptal/picasso-shared'

const SIZE = 64

type ScaleType = 1 | 2
export interface Props extends StandardProps {
  scale?: ScaleType
  base?: number
}
const SvgLoudspeakerWhite64 = forwardRef(function SvgLoudspeakerWhite64(
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
      viewBox='0 0 64 66'
      fill='none'
      className={className}
      style={svgStyle}
      ref={ref}
      data-testid={testId}
    >
      <g clipPath='url(#a)'>
        <path
          opacity={0.3}
          d='M.5 32.895v12.958h15.75L32 64.508V32.897H.5Z'
          fill='#231F20'
        />
        <path
          d='m37.714 46.28-.396-.92a13.445 13.445 0 0 0-.075-24.736l.39-.92a14.447 14.447 0 0 1 .08 26.576Z'
          fill='#fff'
        />
        <path
          d='m44.39 52.65-.534-.845a22.22 22.22 0 0 0-.12-37.668l.53-.848a23.22 23.22 0 0 1 .125 39.362Z'
          fill='#fff'
        />
        <path
          d='m50.615 59.035-.582-.814a30.995 30.995 0 0 0 0-50.425l.582-.813a31.994 31.994 0 0 1 0 52.052ZM32.5 65.876 16.018 46.354H0v-26.69h16.018L32.5.142v65.734ZM1 45.354h15.482L31.5 63.142V2.876L16.482 20.664H1v24.69Z'
          fill='#fff'
        />
        <path d='M16.75 20.164h-1v25.69h1v-25.69Z' fill='#fff' />
      </g>
      <defs>
        <clipPath id='a'>
          <path
            fill='#fff'
            transform='translate(0 .142)'
            d='M0 0h64v65.734H0z'
          />
        </clipPath>
      </defs>
    </svg>
  )
})

SvgLoudspeakerWhite64.displayName = 'SvgLoudspeakerWhite64'
export default SvgLoudspeakerWhite64
