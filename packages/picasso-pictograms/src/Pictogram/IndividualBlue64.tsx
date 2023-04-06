import type { Ref } from 'react'
import React, { forwardRef } from 'react'
import type { StandardProps } from '@toptal/picasso-shared'

const SIZE = 64

type ScaleType = 1 | 2
export interface Props extends StandardProps {
  scale?: ScaleType
  base?: number
}
const SvgIndividualBlue64 = forwardRef(function SvgIndividualBlue64(
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
          d='M32 30.335a16.657 16.657 0 0 0-16.657 16.657h33.314A16.657 16.657 0 0 0 32 30.335ZM32 30.335a8.25 8.25 0 1 0 0-16.5 8.25 8.25 0 0 0 0 16.5Z'
          fill='#183A9E'
        />
        <path
          d='M32 30.835a8.75 8.75 0 1 1 8.75-8.75 8.76 8.76 0 0 1-8.75 8.75Zm0-16.5a7.75 7.75 0 1 0 7.75 7.75 7.759 7.759 0 0 0-7.75-7.75Z'
          fill='#204ECF'
        />
        <path
          d='M49.157 46.992h-1a16.157 16.157 0 1 0-32.314 0h-1a17.157 17.157 0 1 1 34.314 0Z'
          fill='#204ECF'
        />
        <path
          d='M32 64a32 32 0 1 1 32-32 32.036 32.036 0 0 1-32 32Zm0-63a31 31 0 1 0 31 31A31.035 31.035 0 0 0 32 1Z'
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

SvgIndividualBlue64.displayName = 'SvgIndividualBlue64'
export default SvgIndividualBlue64
