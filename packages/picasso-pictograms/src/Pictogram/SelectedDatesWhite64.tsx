import type { Ref } from 'react'
import React, { forwardRef } from 'react'
import type { StandardProps } from '@toptal/picasso-shared'

const SIZE = 64

type ScaleType = 1 | 2
export interface Props extends StandardProps {
  scale?: ScaleType
  base?: number
}
const SvgSelectedDatesWhite64 = forwardRef(function SvgSelectedDatesWhite64(
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
          fill='#000'
          d='M59.5 8H53v5h-4V8H14v5h-4V8H3.5A2.5 2.5 0 0 0 1 10.5V20h61v-9.5A2.5 2.5 0 0 0 59.5 8Z'
          opacity={0.3}
        />
        <path
          stroke='#fff'
          strokeMiterlimit={10}
          d='M53 7.5h6.53a2.97 2.97 0 0 1 2.97 2.97v46.06a2.97 2.97 0 0 1-2.97 2.97H3.47A2.97 2.97 0 0 1 .5 56.53V10.47A2.97 2.97 0 0 1 3.47 7.5H10M14 7.5h35'
        />
        <path
          fill='#fff'
          d='M13 3v9h-2V3h2Zm1-1h-4v11h4V2ZM52 3v9h-2V3h2Zm1-1h-4v11h4V2Z'
        />
        <path fill='#000' d='M22 28H11v9h11v-9Z' opacity={0.3} />
        <path fill='#fff' d='M36 29v7h-9v-7h9Zm1-1H26v9h11v-9Z' />
        <path fill='#000' d='M52 28H41v9h11v-9Z' opacity={0.3} />
        <path fill='#fff' d='M21 42v7h-9v-7h9Zm1-1H11v9h11v-9Z' />
        <path fill='#000' d='M37 41H26v9h11v-9Z' opacity={0.3} />
        <path fill='#fff' d='M51 42v7h-9v-7h9Zm1-1H41v9h11v-9Z' />
      </g>
      <defs>
        <clipPath id='a'>
          <path fill='#fff' d='M0 0h64v64H0z' />
        </clipPath>
      </defs>
    </svg>
  )
})

SvgSelectedDatesWhite64.displayName = 'SvgSelectedDatesWhite64'
export default SvgSelectedDatesWhite64
