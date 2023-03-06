import React, { forwardRef, Ref } from 'react'
import { StandardProps } from '@toptal/picasso-shared'

const SIZE = 64

type ScaleType = 1 | 2
export interface Props extends StandardProps {
  scale?: ScaleType
  base?: number
}
const SvgApprovedTalentWhite64 = forwardRef(function SvgApprovedTalentWhite64(
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
          opacity={0.3}
          d='M21.5 17.75a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11Z'
          fill='#231F20'
        />
        <path
          d='M21.5 18.75a6.5 6.5 0 1 1 6.5-6.5 6.508 6.508 0 0 1-6.5 6.5Zm0-12a5.5 5.5 0 1 0 5.5 5.5 5.506 5.506 0 0 0-5.5-5.5ZM41.353 48.903l-6.636-6.635.707-.707 5.929 5.928 8.496-8.495.707.707-9.203 9.202Z'
          fill='#fff'
        />
        <path
          d='M21.5 42.5c0-.17.021-.333.025-.501L21.5 42A20.5 20.5 0 1 1 42 21.5l-.001.025c.168-.003.332-.025.501-.025.168 0 .331.021.499.025L43 21.5A21.5 21.5 0 1 0 21.5 43l.025-.001c-.004-.168-.025-.33-.025-.499Z'
          fill='#fff'
        />
        <path
          d='M30.466 25.316c.273-.191.553-.37.835-.55A12.487 12.487 0 0 0 9 32.5h1a11.49 11.49 0 0 1 20.466-7.184Z'
          fill='#fff'
        />
        <path
          opacity={0.3}
          d='M30.466 25.316A11.49 11.49 0 0 0 10 32.5h14.038a21.147 21.147 0 0 1 6.428-7.184Z'
          fill='#231F20'
        />
        <path
          d='M42.5 64A21.5 21.5 0 1 1 64 42.5 21.524 21.524 0 0 1 42.5 64Zm0-42A20.5 20.5 0 1 0 63 42.5 20.523 20.523 0 0 0 42.5 22Z'
          fill='#fff'
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

SvgApprovedTalentWhite64.displayName = 'SvgApprovedTalentWhite64'
export default SvgApprovedTalentWhite64
