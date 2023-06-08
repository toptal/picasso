import type { Ref } from 'react'
import React, { forwardRef } from 'react'
import type { StandardProps } from '@toptal/picasso-shared'

const SIZE = 64

type ScaleType = 1 | 2
export interface Props extends StandardProps {
  scale?: ScaleType
  base?: number
}
const SvgFunnelWhite64 = forwardRef(function SvgFunnelWhite64(
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
          d='M37.062 43.027H27.007L.5 17.715h63L37.062 43.027Z'
          opacity={0.3}
        />
        <path
          fill='#fff'
          d='M32 64.902a32.016 32.016 0 0 1-29.31-44.86l.915.402A31.003 31.003 0 1 0 63 32.902c.01-4.287-.877-8.53-2.603-12.454l.916-.402A32.018 32.018 0 0 1 32 64.902ZM11.495 9.652l-.662-.75a32.003 32.003 0 0 1 42.334 0l-.663.75a31.001 31.001 0 0 0-41.009 0Z'
        />
        <path
          fill='#fff'
          d='m37.563 57.26-11.056-4.33v-9.69L0 17.929V8.777h64v9.15L37.562 43.24v14.02Zm-10.056-5.012 9.055 3.546v-12.98L63 17.5V9.777H1V17.5l26.507 25.313v9.435Z'
        />
      </g>
      <defs>
        <clipPath id='a'>
          <path fill='#fff' d='M0 .902h64v64H0z' />
        </clipPath>
      </defs>
    </svg>
  )
})

SvgFunnelWhite64.displayName = 'SvgFunnelWhite64'
export default SvgFunnelWhite64
