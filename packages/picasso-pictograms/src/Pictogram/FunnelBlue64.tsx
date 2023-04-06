import type { Ref } from 'react'
import React, { forwardRef } from 'react'
import type { StandardProps } from '@toptal/picasso-shared'

const SIZE = 64

type ScaleType = 1 | 2
export interface Props extends StandardProps {
  scale?: ScaleType
  base?: number
}
const SvgFunnelBlue64 = forwardRef(function SvgFunnelBlue64(
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
          opacity={0.15}
          d='M37.062 42.125H27.007L.5 16.813h63L37.062 42.125Z'
          fill='#183A9E'
        />
        <path
          d='M32 64A32.016 32.016 0 0 1 2.69 19.14l.915.402A31.003 31.003 0 1 0 63 32a30.776 30.776 0 0 0-2.603-12.454l.916-.402A32.018 32.018 0 0 1 32 64ZM11.495 8.75 10.833 8a32.003 32.003 0 0 1 42.334 0l-.663.75a31.001 31.001 0 0 0-41.009 0Z'
          fill='#204ECF'
        />
        <path
          d='m37.563 56.358-11.056-4.33v-9.69L0 17.027V7.875h64v9.15L37.562 42.339v14.02Zm-10.056-5.012 9.055 3.546v-12.98L63 16.599V8.875H1v7.724L27.507 41.91v9.435Z'
          fill='#204ECF'
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

SvgFunnelBlue64.displayName = 'SvgFunnelBlue64'
export default SvgFunnelBlue64
