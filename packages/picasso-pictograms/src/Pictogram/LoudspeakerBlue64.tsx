import type { Ref } from 'react'
import React, { forwardRef } from 'react'
import type { StandardProps } from '@toptal/picasso-shared'

const SIZE = 64

type ScaleType = 1 | 2
export interface Props extends StandardProps {
  scale?: ScaleType
  base?: number
}
const SvgLoudspeakerBlue64 = forwardRef(function SvgLoudspeakerBlue64(
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
          opacity={0.15}
          d='M.5 32.754v12.958h15.75L32 64.367V32.754H.5Z'
          fill='#183A9E'
        />
        <path
          d='m37.714 46.138-.396-.919a13.447 13.447 0 0 0-.075-24.737l.39-.92a14.447 14.447 0 0 1 .08 26.576Z'
          fill='#204ECF'
        />
        <path
          d='m44.39 52.51-.534-.846a22.221 22.221 0 0 0-.12-37.668l.53-.849a23.22 23.22 0 0 1 .125 39.362Z'
          fill='#204ECF'
        />
        <path
          d='m50.615 58.893-.582-.813a30.995 30.995 0 0 0 0-50.425l.582-.814a31.994 31.994 0 0 1 0 52.052ZM32.5 65.734 16.018 46.212H0v-26.69h16.018L32.5 0v65.734ZM1 45.212h15.482L31.5 63V2.734L16.482 20.522H1v24.69Z'
          fill='#204ECF'
        />
        <path d='M16.75 20.022h-1v25.69h1v-25.69Z' fill='#204ECF' />
      </g>
      <defs>
        <clipPath id='a'>
          <path fill='#fff' d='M0 0h64v65.734H0z' />
        </clipPath>
      </defs>
    </svg>
  )
})

SvgLoudspeakerBlue64.displayName = 'SvgLoudspeakerBlue64'
export default SvgLoudspeakerBlue64
