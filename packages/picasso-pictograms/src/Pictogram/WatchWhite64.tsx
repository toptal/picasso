import type { Ref } from 'react'
import React, { forwardRef } from 'react'
import type { StandardProps } from '@toptal/picasso-shared'

const SIZE = 64

type ScaleType = 1 | 2
export interface Props extends StandardProps {
  scale?: ScaleType
  base?: number
}
const SvgWatchWhite64 = forwardRef(function SvgWatchWhite64(
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
          opacity={0.3}
          d='M31.978 48.293C40.976 48.293 48.271 41 48.271 32c0-8.998-7.295-16.293-16.293-16.293S15.685 23.002 15.685 32s7.295 16.293 16.293 16.293Z'
          fill='#231F20'
        />
        <path
          d='M39.666 32.5h-7.895L20.113 20.82l.708-.706L32.186 31.5h7.48v1Z'
          fill='#fff'
        />
        <path
          d='M45.952 55.281H18.004l-6.32-15.114.003-.003a21.865 21.865 0 0 1 0-16.329l.187-.459 6.13-14.657h27.948l6.321 15.115-.004.002a21.859 21.859 0 0 1 0 16.329l-.187.459-6.13 14.657Zm-27.282-1h26.616l5.682-13.586-.005-.002.195-.462a20.853 20.853 0 0 0 0-16.463l-.198-.46.008-.003L45.286 9.72H18.67l-5.682 13.586.005.002-.195.462a20.859 20.859 0 0 0 0 16.462l.198.46-.008.004L18.67 54.28Z'
          fill='#fff'
        />
        <path
          d='M46.119 9.219h-1V1H18.837v8.219h-1V0h28.282v9.219ZM46.119 64H17.837v-9.22h1V63h26.282v-8.22h1V64ZM53.35 36.344h-.165v-1h.165a3.344 3.344 0 0 0 0-6.688h-.165v-1h.165a4.344 4.344 0 0 1 0 8.688Z'
          fill='#fff'
        />
        <path
          d='M18.13 2.25H0v1h18.13v-1ZM18.13 60.75H0v1h18.13v-1ZM64 2.25H45.87v1H64v-1ZM64 60.75H45.87v1H64v-1Z'
          fill='#fff'
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

SvgWatchWhite64.displayName = 'SvgWatchWhite64'
export default SvgWatchWhite64
