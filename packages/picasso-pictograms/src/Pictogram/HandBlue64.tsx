import React, { forwardRef, Ref } from 'react'
import { StandardProps } from '@toptal/picasso-shared'

const SIZE = 64

type ScaleType = 1 | 2
export interface Props extends StandardProps {
  scale?: ScaleType
  base?: number
}
const SvgHandBlue64 = forwardRef(function SvgHandBlue64(
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
          d='M32 64.206V51.081H.5V32.706h63L32 64.206Z'
          fill='#183A9E'
        />
        <path
          d='M31.5 65.412v-13.83H0V13.83h31.5V0l32.22 32.19a.773.773 0 0 1 .035.995L31.5 65.412ZM1 50.582h31.5V63l30.325-30.296L32.5 2.412v12.419H1v35.75Z'
          fill='#204ECF'
        />
        <path d='M64 14.331h-1v36.75h1v-36.75Z' fill='#204ECF' />
      </g>
      <defs>
        <clipPath id='a'>
          <path fill='#fff' d='M0 0h64v65.412H0z' />
        </clipPath>
      </defs>
    </svg>
  )
})

SvgHandBlue64.displayName = 'SvgHandBlue64'
export default SvgHandBlue64
