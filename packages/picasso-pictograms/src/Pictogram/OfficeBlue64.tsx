import type { Ref } from 'react'
import React, { forwardRef } from 'react'
import type { StandardProps } from '@toptal/picasso-shared'

const SIZE = 64

type ScaleType = 1 | 2
export interface Props extends StandardProps {
  scale?: ScaleType
  base?: number
}
const SvgOfficeBlue64 = forwardRef(function SvgOfficeBlue64(
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
          d='M47.071 60.37v-3.128H30.71v3.129H20V12.734h-6.375V60.37H6.219V63.5H57.781v-3.13h-10.71Z'
          opacity={0.15}
        />
        <path fill='#204ECF' d='M63.5 63H.5v1h63v-1Z' />
        <path
          fill='#204ECF'
          d='M6.719 63.5h-1V0h28.562v12.734h-1V1H6.719v62.5Z'
        />
        <path
          fill='#204ECF'
          d='M29.21 7.453H10.79v1H29.21v-1ZM20 17.016h-9.211v1h9.21v-1ZM20 26.578h-9.211v1h9.21v-1ZM20 36.14h-9.211v1h9.21v-1ZM20 45.703h-9.211v1h9.21v-1Z'
        />
        <path
          fill='#204ECF'
          d='M58.281 63.5h-1V13.234H20.5V63.5h-1V12.234h38.781V63.5Z'
        />
        <path
          fill='#204ECF'
          d='M27.397 22.297h-1v5.069h1v-5.07ZM33.393 22.297h-1v5.069h1v-5.07ZM39.39 22.297h-1v5.069h1v-5.07ZM45.388 22.297h-1v5.069h1v-5.07ZM51.384 22.297h-1v5.069h1v-5.07ZM27.397 33.02h-1v5.069h1V33.02ZM33.393 33.02h-1v5.069h1V33.02ZM39.39 33.02h-1v5.069h1V33.02ZM45.388 33.02h-1v5.069h1V33.02ZM51.384 33.02h-1v5.069h1V33.02ZM27.397 43.743h-1v5.069h1v-5.07ZM33.393 43.743h-1v5.069h1v-5.07ZM39.39 43.743h-1v5.069h1v-5.07ZM45.388 43.743h-1v5.069h1v-5.07ZM51.384 43.743h-1v5.069h1v-5.07ZM47.571 63.5h-1v-5.758H31.21V63.5h-1v-6.758h17.361V63.5Z'
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

SvgOfficeBlue64.displayName = 'SvgOfficeBlue64'
export default SvgOfficeBlue64
