import type { Ref } from 'react'
import React, { forwardRef } from 'react'
import type { StandardProps } from '@toptal/picasso-shared'

const SIZE = 64

type ScaleType = 1 | 2
export interface Props extends StandardProps {
  scale?: ScaleType
  base?: number
}
const SvgHandWhite64 = forwardRef(function SvgHandWhite64(
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
      viewBox='0 0 64 67'
      className={className}
      style={svgStyle}
      ref={ref}
      data-testid={testId}
    >
      <g clipPath='url(#a)'>
        <path
          fill='#231F20'
          d='M32 65.108V51.983H.5V33.608h63L32 65.108Z'
          opacity={0.3}
        />
        <path
          fill='#fff'
          d='M31.5 66.314V52.483H0v-37.75h31.5V.902l32.22 32.19a.773.773 0 0 1 .035.995L31.5 66.314ZM1 51.483h31.5v12.419l30.325-30.296L32.5 3.314v12.419H1v35.75Z'
        />
        <path fill='#fff' d='M64 15.233h-1v36.75h1v-36.75Z' />
      </g>
      <defs>
        <clipPath id='a'>
          <path fill='#fff' d='M0 .902h64v65.412H0z' />
        </clipPath>
      </defs>
    </svg>
  )
})

SvgHandWhite64.displayName = 'SvgHandWhite64'
export default SvgHandWhite64
