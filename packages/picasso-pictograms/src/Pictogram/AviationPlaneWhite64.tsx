import React, { forwardRef, Ref } from 'react'
import { StandardProps } from '@toptal/picasso-shared'

const SIZE = 64

type ScaleType = 1 | 2
export interface Props extends StandardProps {
  scale?: ScaleType
  base?: number
}
const SvgAviationPlaneWhite64 = forwardRef(function SvgAviationPlaneWhite64(
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
          d='m16.25 44.607 8.423-1.96V23.424l-8.423 5.88v15.303ZM16.25 63.973h8.423v-9.867l-8.423 5.88v3.987ZM39.327 23.424v19.223l8.423 1.96V29.304l-8.423-5.88ZM39.327 63.973h8.423v-3.987l-8.423-5.88v9.867Z'
          fill='#231F20'
        />
        <path
          d='M48.25 64.473h-32.5v-4.747l8.423-5.88V43.277L0 48.902V40.04l24.173-16.875V8.3a7.827 7.827 0 0 1 15.654 0v14.864L64 40.039v8.863l-24.173-5.625v10.569l8.423 5.88v4.747Zm-31.5-1h30.5v-3.225l-8.423-5.88v-12.35L63 47.641V40.56L38.827 23.685V8.3a6.827 6.827 0 0 0-13.654 0v15.385L1 40.56v7.082l24.173-5.625v12.35l-8.423 5.88v3.226Z'
          fill='#fff'
        />
        <path
          d='M39.827 23.425h-1v19.222h1V23.425ZM25.173 23.425h-1v19.222h1V23.425ZM25.173 54.107h-1v9.866h1v-9.866ZM39.827 54.107h-1v9.866h1v-9.866ZM32.5 54.107h-1v9.866h1v-9.866Z'
          fill='#fff'
        />
      </g>
      <defs>
        <clipPath id='a'>
          <path fill='#fff' transform='translate(0 .473)' d='M0 0h64v64H0z' />
        </clipPath>
      </defs>
    </svg>
  )
})

SvgAviationPlaneWhite64.displayName = 'SvgAviationPlaneWhite64'
export default SvgAviationPlaneWhite64
