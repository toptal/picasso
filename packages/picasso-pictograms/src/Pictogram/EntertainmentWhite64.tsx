import type { Ref } from 'react'
import React, { forwardRef } from 'react'
import type { StandardProps } from '@toptal/picasso-shared'

const SIZE = 64

type ScaleType = 1 | 2
export interface Props extends StandardProps {
  scale?: ScaleType
  base?: number
}
const SvgEntertainmentWhite64 = forwardRef(function SvgEntertainmentWhite64(
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
      <path
        opacity={0.3}
        d='M13.547 38.454V26.383H7.46a6.054 6.054 0 0 1 6.088-6.088V2.286H.5v36.168A24.998 24.998 0 0 0 32 62.57L32 62.564a24.983 24.983 0 0 1-18.452-24.11ZM50.453 38.454a11.932 11.932 0 0 1-11.93 11.952 11.93 11.93 0 0 1-11.929-11.952h23.86Z'
        fill='#231F20'
      />
      <path
        opacity={0.3}
        d='M32.682 26.383a6.086 6.086 0 0 0-8.42-5.632 6.088 6.088 0 0 0-3.756 5.632h12.176ZM56.54 26.383a6.088 6.088 0 0 0-12.175 0h12.176Z'
        fill='#231F20'
      />
      <path
        d='M38.523 63.93a25.505 25.505 0 0 1-25.476-25.476V1.786H64v36.668a25.505 25.505 0 0 1-25.477 25.477ZM14.047 2.787v35.668a24.476 24.476 0 0 0 48.953 0V2.786H14.047Z'
        fill='#fff'
      />
      <path
        d='M38.524 50.884a12.444 12.444 0 0 1-12.43-12.43v-.5h24.86v.5a12.444 12.444 0 0 1-12.43 12.43Zm-11.42-11.93a11.43 11.43 0 0 0 22.839 0H27.105ZM33.182 26.883H20.006v-.5a6.588 6.588 0 1 1 13.176 0v.5Zm-12.154-1H32.16a5.588 5.588 0 0 0-11.131 0ZM13.547 26.882H6.96v-.5a6.595 6.595 0 0 1 6.587-6.587v1a5.596 5.596 0 0 0-5.565 5.087h5.565v1ZM57.04 26.883H43.866v-.5a6.587 6.587 0 0 1 13.176 0v.5Zm-12.153-1H56.02a5.588 5.588 0 0 0-11.132 0Z'
        fill='#fff'
      />
      <path
        d='M25.477 63.93A25.505 25.505 0 0 1 0 38.455V1.786h13.547v1H1v35.668a24.498 24.498 0 0 0 30.87 23.634l.261.965c-2.17.584-4.407.879-6.654.878Z'
        fill='#fff'
      />
    </svg>
  )
})

SvgEntertainmentWhite64.displayName = 'SvgEntertainmentWhite64'
export default SvgEntertainmentWhite64
