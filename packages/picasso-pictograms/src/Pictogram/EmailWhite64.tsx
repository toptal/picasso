import type { Ref } from 'react'
import React, { forwardRef } from 'react'
import type { StandardProps } from '@toptal/picasso-shared'

const SIZE = 64

type ScaleType = 1 | 2
export interface Props extends StandardProps {
  scale?: ScaleType
  base?: number
}
const SvgEmailWhite64 = forwardRef(function SvgEmailWhite64(
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
          d='M63.5 58.17H.5v6.188h63V58.17ZM21.016 9.138 32 1.358l10.984 7.78H21.016ZM.5 23.669l8.626-6.11v12.219L.5 23.668ZM63.5 23.669l-8.626-6.11v12.219l8.626-6.11Z'
          opacity={0.3}
        />
        <path
          fill='#fff'
          d='M64 64.859H0v-41.45l8.837-6.258.578.817L1 23.928v39.93h62v-39.93l-8.415-5.96.578-.817L64 23.41v41.449ZM42.694 9.546 32 1.972 21.306 9.546l-.578-.816L32 .746 43.272 8.73l-.578.816Z'
        />
        <path
          fill='#fff'
          d='M32 46.592.211 24.077l.578-.816L32 45.367 63.211 23.26l.578.816L32 46.592Z'
        />
        <path
          fill='#fff'
          d='M28.936 43.607.21 63.949l.578.816 28.727-20.342-.579-.816ZM35.065 43.605l-.579.817 28.725 20.345.578-.817-28.724-20.345ZM55.374 29.778h-1V9.638H9.626v20.14h-1V8.638h46.748v21.14Z'
        />
        <path
          fill='#fff'
          d='M32 29.86a4.475 4.475 0 1 1 0-8.95 4.475 4.475 0 0 1 0 8.95Zm0-7.95a3.475 3.475 0 1 0 0 6.952 3.475 3.475 0 0 0 0-6.951Z'
        />
        <path
          fill='#fff'
          d='M31.995 34.82c-.36 0-.719-.019-1.076-.059a9.435 9.435 0 1 1 10.237-7.086 2.883 2.883 0 0 1-5.681-.695v-5.57h1v5.57a1.883 1.883 0 0 0 3.71.453 8.44 8.44 0 0 0-14.253-7.91 8.437 8.437 0 0 0 9.82 13.42l.446.895a9.416 9.416 0 0 1-4.203.983Z'
        />
      </g>
      <defs>
        <clipPath id='a'>
          <path fill='#fff' d='M0 .746h64v64.113H0z' />
        </clipPath>
      </defs>
    </svg>
  )
})

SvgEmailWhite64.displayName = 'SvgEmailWhite64'
export default SvgEmailWhite64
