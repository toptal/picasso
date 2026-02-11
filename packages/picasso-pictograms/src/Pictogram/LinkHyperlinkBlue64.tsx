import type { Ref } from 'react'
import React, { forwardRef } from 'react'
import type { StandardProps } from '@toptal/picasso-shared'

const SIZE = 64

type ScaleType = 1 | 2
export interface Props extends StandardProps {
  scale?: ScaleType
  base?: number
}
const SvgLinkHyperlinkBlue64 = forwardRef(function SvgLinkHyperlinkBlue64(
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
          fill='#183A9C'
          d='M45 23.5H33c-.34 0-.67.03-1 .06-.33-.04-.66-.06-1-.06H19c-4.69 0-8.5 3.81-8.5 8.5 0 4.69 3.81 8.5 8.5 8.5h12c.34 0 .67-.03 1-.06.33.04.66.06 1 .06h12c4.69 0 8.5-3.81 8.5-8.5 0-4.69-3.81-8.5-8.5-8.5ZM32 36.38c-2-.46-3.5-2.24-3.5-4.38 0-2.14 1.5-3.92 3.5-4.38 2 .46 3.5 2.24 3.5 4.38 0 2.14-1.5 3.92-3.5 4.38ZM14.5 32c0-2.49 2.01-4.5 4.5-4.5h6.8a8.454 8.454 0 0 0-1.3 4.5c0 1.65.48 3.19 1.3 4.5H19c-2.49 0-4.5-2.01-4.5-4.5ZM45 36.5h-6.8c.82-1.31 1.3-2.85 1.3-4.5s-.48-3.19-1.3-4.5H45c2.49 0 4.5 2.01 4.5 4.5s-2.01 4.5-4.5 4.5ZM59.5 17V4.5H47L59.5 17Z'
          opacity={0.15}
        />
        <path
          stroke='#204ECD'
          strokeMiterlimit={10}
          d='M37 4.5H16.5c-6.63 0-12 5.37-12 12v31c0 6.63 5.37 12 12 12h31c6.63 0 12-5.37 12-12V27M59.5 17V4.5H47L59.5 17ZM53 11l-6.5 6.5'
        />
        <path
          stroke='#204ECD'
          strokeMiterlimit={10}
          d='M33 40.5H19c-4.69 0-8.5-3.81-8.5-8.5 0-4.69 3.81-8.5 8.5-8.5h12c4.69 0 8.5 3.81 8.5 8.5 0 .65-.07 1.28-.21 1.89'
        />
        <path
          stroke='#204ECD'
          strokeMiterlimit={10}
          d='M25.8 36.5H19c-2.49 0-4.5-2.01-4.5-4.5s2.01-4.5 4.5-4.5h12c2.49 0 4.5 2.01 4.5 4.5 0 .69-.16 1.34-.43 1.93'
        />
        <path
          stroke='#204ECD'
          strokeMiterlimit={10}
          d='M39 23.5h6c4.69 0 8.5 3.81 8.5 8.5 0 4.69-3.81 8.5-8.5 8.5H33c-4.69 0-8.5-3.81-8.5-8.5 0-1.65.47-3.2 1.29-4.5'
        />
        <path
          stroke='#204ECD'
          strokeMiterlimit={10}
          d='M42 27.5h3c2.49 0 4.5 2.01 4.5 4.5s-2.01 4.5-4.5 4.5H33c-2.49 0-4.5-2.01-4.5-4.5 0-2.14 1.5-3.93 3.5-4.39'
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

SvgLinkHyperlinkBlue64.displayName = 'SvgLinkHyperlinkBlue64'
export default SvgLinkHyperlinkBlue64
