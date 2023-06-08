import type { Ref } from 'react'
import React, { forwardRef } from 'react'
import type { StandardProps } from '@toptal/picasso-shared'

const SIZE = 64

type ScaleType = 1 | 2
export interface Props extends StandardProps {
  scale?: ScaleType
  base?: number
}
const SvgProjectWhite64 = forwardRef(function SvgProjectWhite64(
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
          d='M63.5 57.768H.545V63.5H63.5v-5.732ZM31.977 10.946a5.221 5.221 0 1 0 0-10.442 5.221 5.221 0 0 0 0 10.442ZM31.977 10.954a10.544 10.544 0 0 0-10.543 10.543H42.52a10.544 10.544 0 0 0-10.544-10.543Z'
          opacity={0.3}
        />
        <path
          fill='#fff'
          d='M31.977 11.45A5.724 5.724 0 1 1 31.97.002a5.724 5.724 0 0 1 .008 11.448Zm0-10.45a4.725 4.725 0 1 0-.007 9.45A4.725 4.725 0 0 0 31.978 1Z'
        />
        <path
          fill='#fff'
          d='M43.02 21.5h-1a10.04 10.04 0 0 0-17.147-7.107 10.044 10.044 0 0 0-2.938 7.107h-1a11.042 11.042 0 1 1 22.085 0Z'
        />
        <path fill='#fff' d='M63.955 64H0V21h63.955v43ZM1 63h61.955V22H1v41Z' />
        <path
          fill='#fff'
          d='M22.15 54.914a12.415 12.415 0 1 1 10.287-19.355l-.83.56a11.413 11.413 0 1 0-.041 12.824l.825.565a12.406 12.406 0 0 1-10.24 5.406ZM41.178 45.69l-3.469-3.47.708-.708 2.761 2.763 4.162-4.165.707.707-4.869 4.873Z'
        />
        <path
          fill='#fff'
          d='M41.804 54.914A12.415 12.415 0 1 1 54.208 42.5a12.423 12.423 0 0 1-12.404 12.414Zm0-23.828A11.414 11.414 0 1 0 53.208 42.5a11.422 11.422 0 0 0-11.404-11.414ZM27.667 43h-5.795v-8.442h1V42h4.795v1Z'
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

SvgProjectWhite64.displayName = 'SvgProjectWhite64'
export default SvgProjectWhite64
