import type { Ref } from 'react'
import React, { forwardRef } from 'react'
import type { StandardProps } from '@toptal/picasso-shared'

const SIZE = 64

type ScaleType = 1 | 2
export interface Props extends StandardProps {
  scale?: ScaleType
  base?: number
}
const SvgVacationOutBlue64 = forwardRef(function SvgVacationOutBlue64(
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
          d='M59.5 8H53v6h-4V8H14v6h-4V8H3.5A2.5 2.5 0 0 0 1 10.5V20h61v-9.5A2.5 2.5 0 0 0 59.5 8ZM39 36h-7v4h7v-4ZM45 46a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM35.83 44.19l1.18 2.39 2.64.39-1.91 1.86.45 2.63-2.36-1.24-2.37 1.24.45-2.63L32 46.97l2.64-.39 1.19-2.39Z'
          opacity={0.15}
        />
        <path
          stroke='#204ECD'
          strokeMiterlimit={10}
          d='M53 7.5h6.53a2.97 2.97 0 0 1 2.97 2.97v46.06a2.97 2.97 0 0 1-2.97 2.97H3.47A2.97 2.97 0 0 1 .5 56.53V10.47A2.97 2.97 0 0 1 3.47 7.5H10M14 7.5h35'
        />
        <path
          fill='#204ECD'
          d='M13 3v10h-2V3h2Zm1-1h-4v12h4V2ZM52 3v10h-2V3h2Zm1-1h-4v12h4V2Z'
        />
        <path
          stroke='#204ECD'
          strokeMiterlimit={10}
          d='M47.5 30.5h-32a2 2 0 0 0-2 2v20a2 2 0 0 0 2 2h32a2 2 0 0 0 2-2v-20a2 2 0 0 0-2-2ZM36.5 30.5v-3c0-1.1-.9-2-2-2h-6c-1.1 0-2 .9-2 2v3M21.5 54V33M41.5 54V33'
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

SvgVacationOutBlue64.displayName = 'SvgVacationOutBlue64'
export default SvgVacationOutBlue64
