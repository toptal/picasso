import type { Ref } from 'react'
import React, { forwardRef } from 'react'
import type { StandardProps } from '@toptal/picasso-shared'

const SIZE = 64

type ScaleType = 1 | 2
export interface Props extends StandardProps {
  scale?: ScaleType
  base?: number
}
const SvgFoodWhite64 = forwardRef(function SvgFoodWhite64(
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
      viewBox='0 0 64 64'
      className={className}
      style={svgStyle}
      ref={ref}
      data-testid={testId}
    >
      <path
        fill='#231F20'
        d='M58.069 58.928H5.931L.5 52.41h63l-5.431 6.517Z'
        opacity={0.3}
      />
      <path
        fill='#fff'
        d='M40.587 37.41a10.19 10.19 0 0 1-3.753-19.667l8.7-3.583a6.137 6.137 0 0 1 8.105 8.126l-3.579 8.688a10.188 10.188 0 0 1-9.473 6.435Zm7.448-22.783a5.12 5.12 0 0 0-2.106.451l-8.72 3.593a9.192 9.192 0 1 0 11.923 11.932l.002-.007 3.586-8.706a5.13 5.13 0 0 0-4.685-7.263Z'
      />
      <path
        fill='#fff'
        d='m56.907 46.695-.803-.597a21.566 21.566 0 0 0-1.66-27.715 23.584 23.584 0 0 0-9.888-5.92 22.02 22.02 0 0 0-14.017.884 21.383 21.383 0 0 0-7.208 4.925l-.306.318-.011-.008-14.43 14.547.012.012-.356.353a12.38 12.38 0 0 0-3.277 12.748l-.951.308a13.385 13.385 0 0 1 3.34-13.589l.181-.192 15.384-15.51.005.003a22.357 22.357 0 0 1 7.232-4.838 23.023 23.023 0 0 1 14.648-.93 24.709 24.709 0 0 1 10.366 6.2 22.567 22.567 0 0 1 1.739 29.001Z'
      />
      <path
        fill='#fff'
        d='M55.727 11.37 51.68 15.42l.707.707 4.048-4.048-.707-.707Z'
      />
      <path
        fill='#fff'
        d='M58.515 13.233a3.943 3.943 0 0 1-2.788-6.731l.707.707a2.943 2.943 0 0 0 0 4.162 3.014 3.014 0 0 0 4.162 0l.707.707a3.916 3.916 0 0 1-2.788 1.155ZM58.303 59.428H5.697L0 52.592v-6.696h64v6.696l-5.697 6.836Zm-52.137-1h51.669L63 52.229v-5.333H1v5.333l5.166 6.199ZM7.248 25.933l-.851-.525a8.491 8.491 0 0 0 1.284-4.458 8.491 8.491 0 0 0-1.284-4.457 9.377 9.377 0 0 1 0-9.966l.85.525a8.378 8.378 0 0 0 0 8.915 9.485 9.485 0 0 1 1.434 4.983 9.484 9.484 0 0 1-1.433 4.983ZM15.704 25.933l-.85-.525a8.378 8.378 0 0 0 0-8.915 9.374 9.374 0 0 1 0-9.966l.85.525a8.376 8.376 0 0 0 0 8.915 9.376 9.376 0 0 1 0 9.966ZM24.16 25.933l-.851-.525a8.378 8.378 0 0 0 0-8.915 9.377 9.377 0 0 1 0-9.966l.85.525a8.379 8.379 0 0 0 0 8.915 9.377 9.377 0 0 1 0 9.966Z'
      />
    </svg>
  )
})

SvgFoodWhite64.displayName = 'SvgFoodWhite64'
export default SvgFoodWhite64
