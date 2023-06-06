import type { Ref } from 'react'
import React, { forwardRef } from 'react'
import type { StandardProps } from '@toptal/picasso-shared'

const SIZE = 64

type ScaleType = 1 | 2
export interface Props extends StandardProps {
  scale?: ScaleType
  base?: number
}
const SvgTelecommunicationsBlue64 = forwardRef(
  function SvgTelecommunicationsBlue64(props: Props, ref: Ref<SVGSVGElement>) {
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
            fill='#183A9E'
            d='M13.642 51.065a23.913 23.913 0 0 0 33.818 0l-4.401-4.401H10.194a23.909 23.909 0 0 0 3.448 4.4ZM42.89 27.013a5.197 5.197 0 1 0 0-10.394 5.197 5.197 0 0 0 0 10.394Z'
            opacity={0.15}
          />
          <path
            fill='#204ECF'
            d='M13.642 51.065 1.207 63.5H27.05v-5.688a22.628 22.628 0 0 1-13.407-6.747Z'
            opacity={0.15}
          />
          <path
            fill='#204ECF'
            d='M30.55 58.557A24.4 24.4 0 0 1 13.29 16.894l.353-.353 34.525 34.524-.354.354a24.335 24.335 0 0 1-17.262 7.138ZM13.647 17.958a23.412 23.412 0 0 0 33.102 33.103L13.647 17.96ZM42.89 27.513a5.697 5.697 0 1 1 0-11.393 5.697 5.697 0 0 1 0 11.393Zm0-10.394a4.698 4.698 0 1 0 4.698 4.697 4.703 4.703 0 0 0-4.697-4.697ZM63.93 27.62l-.97-.243.122-.485A20.821 20.821 0 0 0 37.815 1.625l-.485.122-.243-.97.485-.122a21.822 21.822 0 0 1 26.48 26.48l-.121.485Z'
          />
          <path
            fill='#204ECF'
            d='m56.528 27.157-.97-.242.122-.486A14.341 14.341 0 0 0 38.278 9.027l-.486.122-.242-.97.485-.121a15.34 15.34 0 0 1 18.614 18.614l-.12.485ZM37.848 23.16 24.74 28.055l.35.936 13.106-4.893-.35-.936ZM40.61 26.51l-4.893 13.107.936.35 4.893-13.107-.937-.35ZM64.207 64H0l13.289-13.29.707.708L2.414 63h61.793v1Z'
          />
          <path fill='#204ECF' d='M27.549 57.812h-1V63.5h1v-5.688Z' />
        </g>
        <defs>
          <clipPath id='a'>
            <path fill='#fff' d='M0 0h64.707v64H0z' />
          </clipPath>
        </defs>
      </svg>
    )
  }
)

SvgTelecommunicationsBlue64.displayName = 'SvgTelecommunicationsBlue64'
export default SvgTelecommunicationsBlue64
