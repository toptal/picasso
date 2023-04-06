import type { Ref } from 'react'
import React, { forwardRef } from 'react'
import type { StandardProps } from '@toptal/picasso-shared'

const SIZE = 64

type ScaleType = 1 | 2
export interface Props extends StandardProps {
  scale?: ScaleType
  base?: number
}
const SvgProductBlue64 = forwardRef(function SvgProductBlue64(
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
      viewBox='0 0 64 64'
      fill='none'
      className={className}
      style={svgStyle}
      ref={ref}
      data-testid={testId}
    >
      <g clipPath='url(#a)'>
        <path
          opacity={0.15}
          d='M63.5 57.768H.5V63.5h63v-5.732ZM32 10.95A5.225 5.225 0 1 0 32 .5a5.225 5.225 0 0 0 0 10.45Z'
          fill='#183A9E'
        />
        <path
          opacity={0.15}
          d='M32 10.95A10.549 10.549 0 0 0 21.45 21.5h21.1A10.55 10.55 0 0 0 32 10.95ZM20.488 47.921H7.518v6.485h12.97v-6.485ZM38.485 47.921h-12.97v6.485h12.97v-6.485ZM56.482 47.921h-12.97v6.485h12.97v-6.485Z'
          fill='#183A9E'
        />
        <path
          d='M32 11.45a5.726 5.726 0 1 1 5.725-5.725A5.732 5.732 0 0 1 32 11.45ZM32 1a4.725 4.725 0 1 0 0 9.45A4.725 4.725 0 0 0 32 1Z'
          fill='#204ECF'
        />
        <path
          d='M43.05 21.5h-1a10.05 10.05 0 1 0-20.1 0h-1a11.05 11.05 0 1 1 22.1 0Z'
          fill='#204ECF'
        />
        <path d='M64 64H0V21h64v43ZM1 63h62V22H1v41Z' fill='#204ECF' />
        <path
          d='M20.988 54.906H7.018v-13.97h13.97v13.97Zm-12.97-1h11.97v-11.97H8.018v11.97ZM38.984 54.906H25.015v-13.97h13.97v13.97Zm-12.969-1h11.97v-11.97h-11.97v11.97ZM56.983 54.906h-13.97v-13.97h13.97v13.97Zm-12.97-1h11.97v-11.97h-11.97v11.97Z'
          fill='#204ECF'
        />
        <path d='M32.5 26.249h-1v15.188h1V26.248Z' fill='#204ECF' />
        <path
          d='M50.497 41.437h-1v-7.094H14.503v7.094h-1v-8.094h36.994v8.094Z'
          fill='#204ECF'
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

SvgProductBlue64.displayName = 'SvgProductBlue64'
export default SvgProductBlue64
