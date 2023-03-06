import React, { forwardRef, Ref } from 'react'
import { StandardProps } from '@toptal/picasso-shared'

const SIZE = 64

type ScaleType = 1 | 2
export interface Props extends StandardProps {
  scale?: ScaleType
  base?: number
}
const SvgFirewallBlue64 = forwardRef(function SvgFirewallBlue64(
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
          d='M43.795 31.023c-6.502-6.46-12.465-8.137-10.111-17.285-10.493 5.987-11.771 18.094-8.408 25.762a10.159 10.159 0 0 1-6.257-7.16 16.682 16.682 0 1 0 24.776-1.317Z'
          fill='#183A9E'
        />
        <path
          d='M32 60.004a17.187 17.187 0 0 1-13.37-27.979l.626-.774.247.965a9.54 9.54 0 0 0 4.837 6.289c-2.988-8.254-.903-19.496 9.097-25.2l1.026-.587-.295 1.145c-1.733 6.735 1.198 9.197 5.635 12.924 1.327 1.115 2.832 2.379 4.345 3.881v.001a17.253 17.253 0 0 1 5.025 12.684A17.188 17.188 0 0 1 32 60.004ZM18.82 33.425a16.184 16.184 0 1 0 24.623-2.048c-1.483-1.473-2.97-2.722-4.283-3.824-4.308-3.62-7.487-6.289-6.224-12.776-9.098 5.874-10.56 16.864-7.202 24.523l.497 1.135-1.146-.472a10.542 10.542 0 0 1-6.265-6.538Z'
          fill='#204ECF'
        />
        <path d='M60 60H4V4h56v56ZM5 59h54V5H5v54Z' fill='#204ECF' />
      </g>
      <defs>
        <clipPath id='a'>
          <path fill='#fff' d='M0 0h64v64H0z' />
        </clipPath>
      </defs>
    </svg>
  )
})

SvgFirewallBlue64.displayName = 'SvgFirewallBlue64'
export default SvgFirewallBlue64
