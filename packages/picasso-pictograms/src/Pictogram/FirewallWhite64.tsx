import type { Ref } from 'react'
import React, { forwardRef } from 'react'
import type { StandardProps } from '@toptal/picasso-shared'

const SIZE = 64

type ScaleType = 1 | 2
export interface Props extends StandardProps {
  scale?: ScaleType
  base?: number
}
const SvgFirewallWhite64 = forwardRef(function SvgFirewallWhite64(
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
          d='M43.795 31.882c-6.502-6.46-12.465-8.137-10.111-17.285-10.493 5.987-11.771 18.094-8.408 25.762a10.16 10.16 0 0 1-6.257-7.16 16.682 16.682 0 1 0 24.776-1.317Z'
          opacity={0.3}
        />
        <path
          fill='#fff'
          d='M32 60.863a17.187 17.187 0 0 1-13.37-27.979l.626-.774.247.965a9.54 9.54 0 0 0 4.837 6.288c-2.988-8.253-.903-19.496 9.097-25.2l1.026-.586-.295 1.144c-1.733 6.736 1.198 9.198 5.635 12.925 1.327 1.114 2.832 2.378 4.345 3.88v.002a17.251 17.251 0 0 1 5.025 12.684A17.188 17.188 0 0 1 32 60.863Zm-13.18-26.58a16.184 16.184 0 1 0 24.623-2.047c-1.483-1.473-2.97-2.723-4.283-3.825-4.308-3.619-7.487-6.288-6.224-12.775-9.098 5.874-10.56 16.864-7.202 24.522l.497 1.136-1.146-.472a10.541 10.541 0 0 1-6.265-6.538Z'
        />
        <path fill='#fff' d='M60 60.859H4v-56h56v56Zm-55-1h54v-54H5v54Z' />
      </g>
      <defs>
        <clipPath id='a'>
          <path fill='#fff' d='M0 .859h64v64H0z' />
        </clipPath>
      </defs>
    </svg>
  )
})

SvgFirewallWhite64.displayName = 'SvgFirewallWhite64'
export default SvgFirewallWhite64
