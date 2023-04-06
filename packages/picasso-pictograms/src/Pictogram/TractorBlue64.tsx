import type { Ref } from 'react'
import React, { forwardRef } from 'react'
import type { StandardProps } from '@toptal/picasso-shared'

const SIZE = 64

type ScaleType = 1 | 2
export interface Props extends StandardProps {
  scale?: ScaleType
  base?: number
}
const SvgTractorBlue64 = forwardRef(function SvgTractorBlue64(
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
      viewBox='0 0 65 64'
      fill='none'
      className={className}
      style={svgStyle}
      ref={ref}
      data-testid={testId}
    >
      <g clipPath='url(#a)'>
        <path
          opacity={0.15}
          d='M53.87 39.754v-5.15H30.98c1.27 2.3 1.92 4.89 1.886 7.516h14.872a8.729 8.729 0 0 1 6.132-2.366ZM16.97 32.7a9.42 9.42 0 1 0 0 18.84 9.42 9.42 0 0 0 0-18.84Zm0 13.372a3.951 3.951 0 1 1 0-7.903 3.951 3.951 0 0 1 0 7.903ZM53.87 51.172a2.288 2.288 0 1 0 0-4.575 2.288 2.288 0 0 0 0 4.575ZM36.556 22.382H23.552V8.975h9.123l3.881 13.407ZM21.157 8.975h-5.25v13.407h5.25V8.975Z'
          fill='#183A9E'
        />
        <path
          d='M16.97 58.515A16.396 16.396 0 1 1 33.367 42.12 16.414 16.414 0 0 1 16.97 58.515Zm0-31.79A15.395 15.395 0 1 0 32.367 42.12 15.413 15.413 0 0 0 16.97 26.725Z'
          fill='#204ECF'
        />
        <path
          d='M16.97 46.572a4.452 4.452 0 1 1 0-8.903 4.452 4.452 0 0 1 0 8.903Zm0-7.904a3.451 3.451 0 1 0 0 6.903 3.451 3.451 0 0 0 0-6.902ZM53.87 58.515a9.63 9.63 0 1 1 9.63-9.63 9.641 9.641 0 0 1-9.63 9.63Zm0-18.26a8.63 8.63 0 1 0 8.63 8.63 8.64 8.64 0 0 0-8.63-8.63Z'
          fill='#204ECF'
        />
        <path
          d='M53.87 51.672a2.788 2.788 0 1 1 0-5.575 2.788 2.788 0 0 1 0 5.575Zm0-4.575a1.788 1.788 0 1 0 0 3.576 1.788 1.788 0 0 0 0-3.576ZM47.738 41.62H32.866v1h14.872v-1ZM54.37 39.755h-1V25.788a2.91 2.91 0 0 0-2.907-2.906H39.491L35.353 8.583a2.92 2.92 0 0 0-2.791-2.098H13.587A2.91 2.91 0 0 0 10.68 9.39v18.354h-1V9.39a3.91 3.91 0 0 1 3.906-3.906h18.975a3.925 3.925 0 0 1 3.752 2.82l3.93 13.577h10.22a3.91 3.91 0 0 1 3.906 3.906v13.967Z'
          fill='#204ECF'
        />
        <path
          d='M49.619 22.382h-1V9.79a3.309 3.309 0 0 0-3.306-3.305v-1a4.31 4.31 0 0 1 4.306 4.305v12.592ZM53.87 31.023h-5.622v1h5.622v-1ZM53.87 57.515H0v1h53.87v-1Z'
          fill='#204ECF'
        />
      </g>
      <defs>
        <clipPath id='a'>
          <path fill='#fff' d='M0 0h64.033v64H0z' />
        </clipPath>
      </defs>
    </svg>
  )
})

SvgTractorBlue64.displayName = 'SvgTractorBlue64'
export default SvgTractorBlue64
