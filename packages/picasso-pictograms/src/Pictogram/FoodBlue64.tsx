import type { Ref } from 'react'
import React, { forwardRef } from 'react'
import type { StandardProps } from '@toptal/picasso-shared'

const SIZE = 64

type ScaleType = 1 | 2
export interface Props extends StandardProps {
  scale?: ScaleType
  base?: number
}
const SvgFoodBlue64 = forwardRef(function SvgFoodBlue64(
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
        fill='#183A9E'
        d='M58.069 58.069H5.931L.5 51.552h63l-5.431 6.517Z'
        opacity={0.15}
      />
      <path
        fill='#204ECF'
        d='M40.587 36.55a10.19 10.19 0 0 1-3.753-19.665l8.7-3.584a6.137 6.137 0 0 1 8.105 8.127l-3.579 8.688a10.188 10.188 0 0 1-9.473 6.435Zm7.448-22.781a5.12 5.12 0 0 0-2.106.45l-8.72 3.593a9.19 9.19 0 0 0-3.125 15.046 9.191 9.191 0 0 0 15.048-3.113l.002-.007 3.586-8.706a5.13 5.13 0 0 0-4.685-7.264Z'
      />
      <path
        fill='#204ECF'
        d='m56.907 45.836-.803-.596a21.566 21.566 0 0 0-1.66-27.716 23.586 23.586 0 0 0-9.888-5.92 22.02 22.02 0 0 0-14.017.884 21.383 21.383 0 0 0-7.208 4.925l-.306.318-.011-.008L8.584 32.27l.012.012-.356.353a12.381 12.381 0 0 0-3.277 12.749l-.951.307a13.385 13.385 0 0 1 3.34-13.589l.181-.191L22.917 16.4l.005.003a22.358 22.358 0 0 1 7.232-4.839 23.022 23.022 0 0 1 14.648-.93 24.707 24.707 0 0 1 10.366 6.2 22.567 22.567 0 0 1 1.739 29.001Z'
      />
      <path
        fill='#204ECF'
        d='M55.727 10.512 51.68 14.56l.707.707 4.048-4.048-.707-.707Z'
      />
      <path
        fill='#204ECF'
        d='M58.515 12.374a3.942 3.942 0 0 1-2.788-6.731l.707.707a2.943 2.943 0 0 0 0 4.162 3.014 3.014 0 0 0 4.162 0l.707.707a3.92 3.92 0 0 1-2.788 1.155ZM58.303 58.569H5.697L0 51.733v-6.695h64v6.695l-5.697 6.836Zm-52.137-1h51.669L63 51.37v-5.332H1v5.333l5.166 6.198ZM7.248 25.075l-.851-.526a8.49 8.49 0 0 0 1.284-4.457 8.49 8.49 0 0 0-1.284-4.458 9.377 9.377 0 0 1 0-9.966l.85.526a8.378 8.378 0 0 0 0 8.915 9.485 9.485 0 0 1 1.434 4.983 9.485 9.485 0 0 1-1.433 4.983ZM15.704 25.075l-.85-.526a8.378 8.378 0 0 0 0-8.915 9.374 9.374 0 0 1 0-9.966l.85.526a8.376 8.376 0 0 0 0 8.915 9.377 9.377 0 0 1 0 9.966ZM24.16 25.075l-.851-.526a8.378 8.378 0 0 0 0-8.915 9.377 9.377 0 0 1 0-9.966l.85.526a8.379 8.379 0 0 0 0 8.915 9.377 9.377 0 0 1 0 9.966Z'
      />
    </svg>
  )
})

SvgFoodBlue64.displayName = 'SvgFoodBlue64'
export default SvgFoodBlue64
