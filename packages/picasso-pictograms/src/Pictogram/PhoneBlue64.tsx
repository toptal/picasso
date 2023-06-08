import type { Ref } from 'react'
import React, { forwardRef } from 'react'
import type { StandardProps } from '@toptal/picasso-shared'

const SIZE = 64

type ScaleType = 1 | 2
export interface Props extends StandardProps {
  scale?: ScaleType
  base?: number
}
const SvgPhoneBlue64 = forwardRef(function SvgPhoneBlue64(
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
          fill='#183A9E'
          d='M17.698 59.751a1.503 1.503 0 0 1-1.501-1.5V5.75a1.503 1.503 0 0 1 1.502-1.502h6.269a2.516 2.516 0 0 0 2.508 2.363h11.048a2.516 2.516 0 0 0 2.508-2.363h6.27a1.503 1.503 0 0 1 1.501 1.501v52.5a1.503 1.503 0 0 1-1.502 1.501H17.698Z'
          opacity={0.15}
        />
        <path
          fill='#204ECF'
          d='M46.302 64H17.698a5.757 5.757 0 0 1-5.75-5.75V5.75A5.757 5.757 0 0 1 17.698 0h28.604a5.757 5.757 0 0 1 5.75 5.75v52.5a5.757 5.757 0 0 1-5.75 5.75ZM17.698 1a4.755 4.755 0 0 0-4.75 4.75v52.5a4.756 4.756 0 0 0 4.75 4.75h28.604a4.755 4.755 0 0 0 4.75-4.75V5.75A4.756 4.756 0 0 0 46.302 1H17.698Z'
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

SvgPhoneBlue64.displayName = 'SvgPhoneBlue64'
export default SvgPhoneBlue64
