import React, { forwardRef, Ref } from 'react'
import { StandardProps } from '@toptal/picasso-shared'

const SIZE = 64

type ScaleType = 1 | 2
export interface Props extends StandardProps {
  scale?: ScaleType
  base?: number
}
const SvgAviationPlaneBlue64 = forwardRef(function SvgAviationPlaneBlue64(
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
          opacity={0.15}
          d='m16.25 44.134 8.423-1.96V22.951l-8.423 5.88v15.303ZM16.25 63.5h8.423v-9.867l-8.423 5.88V63.5ZM39.327 22.951v19.223l8.423 1.96V28.831l-8.423-5.88ZM39.327 63.5h8.423v-3.987l-8.423-5.88V63.5Z'
          fill='#183A9E'
        />
        <path
          d='M48.25 64h-32.5v-4.747l8.423-5.88v-10.57L0 48.43v-8.864L24.173 22.69V7.827a7.827 7.827 0 0 1 15.654 0V22.69L64 39.565v8.864l-24.173-5.625v10.569l8.423 5.88V64Zm-31.5-1h30.5v-3.226l-8.423-5.88v-12.35L63 47.169v-7.082L38.827 23.212V7.827a6.827 6.827 0 0 0-13.654 0v15.385L1 40.087v7.082l24.173-5.625v12.35l-8.423 5.88V63Z'
          fill='#204ECF'
        />
        <path
          d='M39.827 22.951h-1v19.223h1V22.95ZM25.173 22.951h-1v19.223h1V22.95ZM25.173 53.633h-1V63.5h1v-9.867ZM39.827 53.633h-1V63.5h1v-9.867ZM32.5 53.633h-1V63.5h1v-9.867Z'
          fill='#204ECF'
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

SvgAviationPlaneBlue64.displayName = 'SvgAviationPlaneBlue64'
export default SvgAviationPlaneBlue64
