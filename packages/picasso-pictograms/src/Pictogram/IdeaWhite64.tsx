import React, { forwardRef, Ref } from 'react'
import { StandardProps } from '@toptal/picasso-shared'

const SIZE = 64

type ScaleType = 1 | 2
export interface Props extends StandardProps {
  scale?: ScaleType
  base?: number
}
const SvgIdeaWhite64 = forwardRef(function SvgIdeaWhite64(
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
          d='M32 39.636a7.712 7.712 0 1 0 0-15.424 7.712 7.712 0 0 0 0 15.424ZM32 39.636a15.57 15.57 0 0 0-15.57 15.571h31.14A15.57 15.57 0 0 0 32 39.637Z'
          fill='#231F20'
        />
        <path
          d='M32 64.902a32 32 0 1 1 32-32 32.036 32.036 0 0 1-32 32Zm0-63a31 31 0 1 0 31 31 31.035 31.035 0 0 0-31-31Z'
          fill='#fff'
        />
        <path
          d='M32 40.136a8.212 8.212 0 1 1 8.212-8.212A8.221 8.221 0 0 1 32 40.136Zm0-15.424a7.212 7.212 0 1 0 7.212 7.212A7.22 7.22 0 0 0 32 24.712Z'
          fill='#fff'
        />
        <path
          d='M48.07 55.207h-1a15.07 15.07 0 1 0-30.14 0h-1a16.07 16.07 0 0 1 32.14 0ZM32.14 20.096h-.28a2.35 2.35 0 0 1-2.347-2.348 8.016 8.016 0 0 0-1.58-4.848 4.208 4.208 0 0 1-.883-2.568A4.75 4.75 0 0 1 32 5.824a4.75 4.75 0 0 1 4.95 4.508 4.208 4.208 0 0 1-.882 2.568 8.016 8.016 0 0 0-1.58 4.848 2.35 2.35 0 0 1-2.348 2.348ZM32 6.824a3.753 3.753 0 0 0-3.95 3.508c.003.71.24 1.4.677 1.962a9.02 9.02 0 0 1 1.786 5.454 1.35 1.35 0 0 0 1.347 1.348h.28a1.35 1.35 0 0 0 1.347-1.348 9.02 9.02 0 0 1 1.786-5.454 3.215 3.215 0 0 0 .677-1.962A3.753 3.753 0 0 0 32 6.824Z'
          fill='#fff'
        />
      </g>
      <defs>
        <clipPath id='a'>
          <path fill='#fff' transform='translate(0 .902)' d='M0 0h64v64H0z' />
        </clipPath>
      </defs>
    </svg>
  )
})

SvgIdeaWhite64.displayName = 'SvgIdeaWhite64'
export default SvgIdeaWhite64
