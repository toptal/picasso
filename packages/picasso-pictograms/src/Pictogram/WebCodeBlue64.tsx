import type { Ref } from 'react'
import React, { forwardRef } from 'react'
import type { StandardProps } from '@toptal/picasso-shared'

const SIZE = 64

type ScaleType = 1 | 2
export interface Props extends StandardProps {
  scale?: ScaleType
  base?: number
}
const SvgWebCodeBlue64 = forwardRef(function SvgWebCodeBlue64(
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
        <path fill='#183A9C' d='M50 55H13v5h37v-5Z' opacity={0.15} />
        <path
          stroke='#204ECD'
          strokeMiterlimit={10}
          d='M62.5 3.5H.5v51h62v-51Z'
        />
        <path
          stroke='#204ECD'
          strokeMiterlimit={10}
          d='m19 23-8.5 8.5L19 40M44 40l8.5-8.5L44 23M24 46l15-29M13 60.5h37'
        />
        <path
          fill='#183A9C'
          d='M1 4v7h61V4H1Zm3.5 5C3.67 9 3 8.33 3 7.5S3.67 6 4.5 6 6 6.67 6 7.5 5.33 9 4.5 9Zm5 0C8.67 9 8 8.33 8 7.5S8.67 6 9.5 6s1.5.67 1.5 1.5S10.33 9 9.5 9Zm5 0c-.83 0-1.5-.67-1.5-1.5S13.67 6 14.5 6s1.5.67 1.5 1.5S15.33 9 14.5 9Z'
          opacity={0.15}
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

SvgWebCodeBlue64.displayName = 'SvgWebCodeBlue64'
export default SvgWebCodeBlue64
