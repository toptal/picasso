import type { Ref } from 'react'
import React, { forwardRef } from 'react'
import type { StandardProps } from '@toptal/picasso-shared'

const SIZE = 64

type ScaleType = 1 | 2
export interface Props extends StandardProps {
  scale?: ScaleType
  base?: number
}
const SvgChecklistWhite64 = forwardRef(function SvgChecklistWhite64(
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
          d='M44.375 11.75v5.611h14.402v40.528H5.223V17.361h14.402V11.75H.5V63.5h63V11.75H44.375Z'
          opacity={0.3}
        />
        <path
          fill='#fff'
          d='M64 64H0V11.25h19.625v1H1V63h62V12.25H44.375v-1H64V64Z'
        />
        <path
          fill='#fff'
          d='M44.875 17.86h-25.75V5.64h6.756a6.14 6.14 0 0 1 12.238 0h6.756v12.22Zm-24.75-1h23.75V6.64h-6.736v-.5a5.14 5.14 0 0 0-10.278 0v.5h-6.736v10.22ZM17.867 29.202l-3.243-3.243.707-.707 2.536 2.536 3.834-3.835.707.707-4.541 4.542ZM51.552 25.9h-21.77v1h21.77v-1ZM17.867 40.426l-3.243-3.242.707-.707 2.536 2.535 3.834-3.835.707.707-4.541 4.542ZM51.552 37.125h-21.77v1h21.77v-1ZM17.867 51.65l-3.243-3.242.707-.707 2.536 2.535 3.834-3.835.707.707-4.541 4.542ZM51.552 48.35h-21.77v1h21.77v-1Z'
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

SvgChecklistWhite64.displayName = 'SvgChecklistWhite64'
export default SvgChecklistWhite64
