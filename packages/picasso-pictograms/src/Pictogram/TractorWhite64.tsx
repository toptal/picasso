import React, { forwardRef, Ref } from 'react'
import { StandardProps } from '@toptal/picasso-shared'

const SIZE = 64

type ScaleType = 1 | 2
export interface Props extends StandardProps {
  scale?: ScaleType
  base?: number
}
const SvgTractorWhite64 = forwardRef(function SvgTractorWhite64(
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
      viewBox='0 0 65 65'
      fill='none'
      className={className}
      style={svgStyle}
      ref={ref}
      data-testid={testId}
    >
      <g clipPath='url(#a)'>
        <path
          opacity={0.3}
          d='M53.87 40.24v-5.15H30.98a15.135 15.135 0 0 1 1.886 7.515h14.872a8.73 8.73 0 0 1 6.132-2.366ZM16.97 33.185a9.42 9.42 0 1 0 0 18.84 9.42 9.42 0 0 0 0-18.84Zm0 13.371a3.952 3.952 0 1 1 0-7.903 3.952 3.952 0 0 1 0 7.904ZM53.87 51.657a2.288 2.288 0 1 0 0-4.575 2.288 2.288 0 0 0 0 4.575ZM36.556 22.867H23.552V9.46h9.123l3.881 13.407ZM21.157 9.46h-5.25v13.406h5.25V9.46Z'
          fill='#231F20'
        />
        <path
          d='M16.97 59a16.395 16.395 0 1 1 16.396-16.395A16.414 16.414 0 0 1 16.97 59Zm0-31.79a15.395 15.395 0 1 0 15.396 15.395A15.413 15.413 0 0 0 16.97 27.21Z'
          fill='#fff'
        />
        <path
          d='M16.97 47.057a4.451 4.451 0 1 1 0-8.903 4.451 4.451 0 0 1 0 8.903Zm0-7.904a3.452 3.452 0 1 0 .001 6.904 3.452 3.452 0 0 0 0-6.904ZM53.87 59a9.63 9.63 0 1 1 9.63-9.63A9.641 9.641 0 0 1 53.87 59Zm0-18.26a8.63 8.63 0 1 0 8.63 8.63 8.64 8.64 0 0 0-8.63-8.63Z'
          fill='#fff'
        />
        <path
          d='M53.87 52.157a2.788 2.788 0 1 1 0-5.575 2.788 2.788 0 0 1 0 5.575Zm0-4.575a1.788 1.788 0 1 0 0 3.576 1.788 1.788 0 0 0 0-3.576ZM47.738 42.105H32.866v1h14.872v-1ZM54.37 40.24h-1V26.273a2.91 2.91 0 0 0-2.907-2.906H39.491l-4.138-14.3a2.92 2.92 0 0 0-2.791-2.097H13.587a2.91 2.91 0 0 0-2.906 2.906V28.23h-1V9.876a3.91 3.91 0 0 1 3.906-3.906h18.975a3.925 3.925 0 0 1 3.752 2.82l3.93 13.577h10.22a3.91 3.91 0 0 1 3.906 3.906V40.24Z'
          fill='#fff'
        />
        <path
          d='M49.619 22.867h-1V10.275a3.309 3.309 0 0 0-3.306-3.305v-1a4.31 4.31 0 0 1 4.306 4.305v12.592ZM53.87 31.508h-5.622v1h5.622v-1ZM53.87 58H0v1h53.87v-1Z'
          fill='#fff'
        />
      </g>
      <defs>
        <clipPath id='a'>
          <path
            fill='#fff'
            transform='translate(0 .485)'
            d='M0 0h64.033v64H0z'
          />
        </clipPath>
      </defs>
    </svg>
  )
})

SvgTractorWhite64.displayName = 'SvgTractorWhite64'
export default SvgTractorWhite64
