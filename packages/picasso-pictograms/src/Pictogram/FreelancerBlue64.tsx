import React, { forwardRef, Ref } from 'react'
import { StandardProps } from '@toptal/picasso-shared'

const SIZE = 64

type ScaleType = 1 | 2
export interface Props extends StandardProps {
  scale?: ScaleType
  base?: number
}
const SvgFreelancerBlue64 = forwardRef(function SvgFreelancerBlue64(
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
      viewBox='0 0 64 65'
      fill='none'
      className={className}
      style={svgStyle}
      ref={ref}
      data-testid={testId}
    >
      <g clipPath='url(#a)'>
        <path
          opacity={0.15}
          d='M19.806 47.744h24.388v15.799h8.224a20.417 20.417 0 0 0-40.835 0h8.223v-15.8Z'
          fill='#183A9E'
        />
        <path
          opacity={0.15}
          d='M32 43.126a10.113 10.113 0 1 0 0-20.227 10.113 10.113 0 0 0 0 20.227ZM9.5.543v9.455l6.75-2.799V.543H9.5Z'
          fill='#183A9E'
        />
        <path
          opacity={0.15}
          d='M5.881 29.312 32 18.274l26.119 11.038V19.23L32 8.192 5.881 19.23v10.082Z'
          fill='#183A9E'
        />
        <path
          opacity={0.3}
          d='M32 57.637a1.994 1.994 0 1 0 0-3.987 1.994 1.994 0 0 0 0 3.987Z'
          fill='#231F20'
        />
        <path
          d='M44.694 63.543h-1V48.244H20.307v15.299h-1V47.244h25.387v16.299ZM32 43.626a10.612 10.612 0 1 1 10.612-10.613A10.624 10.624 0 0 1 32 43.626ZM32 23.4a9.612 9.612 0 1 0 9.612 9.612A9.623 9.623 0 0 0 32 23.401Z'
          fill='#204ECF'
        />
        <path
          d='M52.918 63.543h-1a19.917 19.917 0 1 0-39.835 0h-1a20.917 20.917 0 1 1 41.835 0ZM64 22.258 32 8.735 0 22.258v-8.734L32 0l.194.083L64 13.523v8.735ZM32 7.648l.194.083L63 20.751v-6.564L32 1.086 1 14.187v6.563L32 7.65Z'
          fill='#204ECF'
        />
        <path
          d='M10 9.998H9V.043h7.75v7.156h-1V1.043H10v8.955ZM58.619 64.043H5.381V19.23h1v43.813h51.238V19.23h1v44.813Z'
          fill='#204ECF'
        />
      </g>
      <defs>
        <clipPath id='a'>
          <path fill='#fff' d='M0 0h64v64.043H0z' />
        </clipPath>
      </defs>
    </svg>
  )
})

SvgFreelancerBlue64.displayName = 'SvgFreelancerBlue64'
export default SvgFreelancerBlue64
