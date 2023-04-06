import type { Ref } from 'react'
import React, { forwardRef } from 'react'
import type { StandardProps } from '@toptal/picasso-shared'

const SIZE = 64

type ScaleType = 1 | 2
export interface Props extends StandardProps {
  scale?: ScaleType
  base?: number
}
const SvgOfficeWhite64 = forwardRef(function SvgOfficeWhite64(
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
          d='M47.071 60.513v-3.13H30.71v3.13H20V12.876h-6.375v47.637H6.219v3.129H57.781v-3.13h-10.71Z'
          fill='#231F20'
        />
        <path d='M63.5 63.142H.5v1h63v-1Z' fill='#fff' />
        <path
          d='M6.719 63.642h-1V.142h28.562v12.734h-1V1.142H6.719v62.5Z'
          fill='#fff'
        />
        <path
          d='M29.21 7.595H10.79v1H29.21v-1ZM20 17.157h-9.211v1h9.21v-1ZM20 26.72h-9.211v1h9.21v-1ZM20 36.282h-9.211v1h9.21v-1ZM20 45.845h-9.211v1h9.21v-1Z'
          fill='#fff'
        />
        <path
          d='M58.281 63.642h-1V13.374H20.5v50.267h-1V12.374h38.781v51.267Z'
          fill='#fff'
        />
        <path
          d='M27.397 22.439h-1v5.068h1v-5.069ZM33.393 22.439h-1v5.068h1v-5.069ZM39.39 22.439h-1v5.068h1v-5.069ZM45.388 22.439h-1v5.068h1v-5.069ZM51.384 22.439h-1v5.068h1v-5.069ZM27.397 33.162h-1v5.069h1v-5.07ZM33.393 33.162h-1v5.069h1v-5.07ZM39.39 33.162h-1v5.069h1v-5.07ZM45.388 33.162h-1v5.069h1v-5.07ZM51.384 33.162h-1v5.069h1v-5.07ZM27.397 43.884h-1v5.07h1v-5.07ZM33.393 43.884h-1v5.07h1v-5.07ZM39.39 43.884h-1v5.07h1v-5.07ZM45.388 43.884h-1v5.07h1v-5.07ZM51.384 43.884h-1v5.07h1v-5.07ZM47.571 63.642h-1v-5.759H31.21v5.758h-1v-6.758h17.361v6.758Z'
          fill='#fff'
        />
      </g>
      <defs>
        <clipPath id='a'>
          <path fill='#fff' transform='translate(0 .142)' d='M0 0h64v64H0z' />
        </clipPath>
      </defs>
    </svg>
  )
})

SvgOfficeWhite64.displayName = 'SvgOfficeWhite64'
export default SvgOfficeWhite64
