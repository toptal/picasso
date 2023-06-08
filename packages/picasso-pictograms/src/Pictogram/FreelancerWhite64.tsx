import type { Ref } from 'react'
import React, { forwardRef } from 'react'
import type { StandardProps } from '@toptal/picasso-shared'

const SIZE = 64

type ScaleType = 1 | 2
export interface Props extends StandardProps {
  scale?: ScaleType
  base?: number
}
const SvgFreelancerWhite64 = forwardRef(function SvgFreelancerWhite64(
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
      <g clipPath='url(#a)'>
        <path
          fill='#231F20'
          d='M19.806 48.603h24.388v15.799h8.224a20.417 20.417 0 0 0-40.835 0h8.223v-15.8Z'
          opacity={0.3}
        />
        <path
          fill='#231F20'
          d='M32 43.984a10.112 10.112 0 1 0 0-20.224 10.112 10.112 0 0 0 0 20.224ZM9.5 1.402v9.455l6.75-2.8V1.403H9.5Z'
          opacity={0.3}
        />
        <path
          fill='#231F20'
          d='M5.881 30.17 32 19.133 58.119 30.17V20.088L32 9.051 5.881 20.088V30.17ZM32 58.496a1.994 1.994 0 1 0 0-3.988 1.994 1.994 0 0 0 0 3.988Z'
          opacity={0.3}
        />
        <path
          fill='#fff'
          d='M44.694 64.401h-1V49.103H20.307V64.4h-1V48.103h25.387V64.4ZM32 44.484a10.613 10.613 0 1 1 10.612-10.612A10.624 10.624 0 0 1 32 44.484Zm0-20.225a9.612 9.612 0 1 0 9.612 9.613A9.623 9.623 0 0 0 32 24.259Z'
        />
        <path
          fill='#fff'
          d='M52.918 64.402h-1a19.917 19.917 0 1 0-39.835 0h-1a20.918 20.918 0 0 1 41.835 0ZM64 23.117 32 9.593 0 23.117v-8.734L32 .859l.194.082L64 14.383v8.734ZM32 8.507l.194.083L63 21.61v-6.564L32 1.945l-31 13.1v6.564L32 8.508Z'
        />
        <path
          fill='#fff'
          d='M10 10.857H9V.902h7.75v7.156h-1V1.902H10v8.955ZM58.619 64.902H5.381V20.089h1v43.813h51.238V20.089h1v44.813Z'
        />
      </g>
      <defs>
        <clipPath id='a'>
          <path fill='#fff' d='M0 .859h64v64.043H0z' />
        </clipPath>
      </defs>
    </svg>
  )
})

SvgFreelancerWhite64.displayName = 'SvgFreelancerWhite64'
export default SvgFreelancerWhite64
