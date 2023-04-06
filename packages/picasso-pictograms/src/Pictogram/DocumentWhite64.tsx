import type { Ref } from 'react'
import React, { forwardRef } from 'react'
import type { StandardProps } from '@toptal/picasso-shared'

const SIZE = 64

type ScaleType = 1 | 2
export interface Props extends StandardProps {
  scale?: ScaleType
  base?: number
}
const SvgDocumentWhite64 = forwardRef(function SvgDocumentWhite64(
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
          d='M39.195 1.246v11.536H50.73L39.195 1.246ZM50.73 58.815H.5v5.43h50.23v-5.43Z'
          fill='#231F20'
        />
        <path
          d='M50.73 13.283H38.695V1.246h1v11.037H50.73v1ZM23.528 12.282H9.478v1h14.05v-1ZM39.195 23.998H9.477v1h29.718v-1ZM39.195 30.572H9.477v1h29.718v-1ZM38.63 37.145H9.477v1H38.63v-1ZM34.78 43.72H9.477v1H34.78v-1ZM14.519 50.27H9.477v1h5.042v-1Z'
          fill='#fff'
        />
        <path
          d='M51.23 64.746H0v-64h39.402l11.828 11.83V27.74h-1V12.99L38.988 1.746H1v62h49.23V36.765h1v27.98Z'
          fill='#fff'
        />
        <path
          d='m32.724 50.26 1.786-7.005L57.7 20.062a3.778 3.778 0 0 1 5.219 0 3.695 3.695 0 0 1 0 5.22l-23.19 23.193-7.005 1.785Zm2.687-6.492-1.302 5.107 5.107-1.302 22.996-22.999a2.694 2.694 0 0 0 0-3.805 2.755 2.755 0 0 0-3.805 0L35.411 43.768Z'
          fill='#fff'
        />
      </g>
      <defs>
        <clipPath id='a'>
          <path fill='#fff' transform='translate(0 .746)' d='M0 0h64v64H0z' />
        </clipPath>
      </defs>
    </svg>
  )
})

SvgDocumentWhite64.displayName = 'SvgDocumentWhite64'
export default SvgDocumentWhite64
