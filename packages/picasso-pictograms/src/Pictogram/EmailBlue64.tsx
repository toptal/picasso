import type { Ref } from 'react'
import React, { forwardRef } from 'react'
import type { StandardProps } from '@toptal/picasso-shared'

const SIZE = 64

type ScaleType = 1 | 2
export interface Props extends StandardProps {
  scale?: ScaleType
  base?: number
}
const SvgEmailBlue64 = forwardRef(function SvgEmailBlue64(
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
          d='M63.5 57.425H.5v6.188h63v-6.188ZM21.016 8.392 32 .613l10.984 7.779H21.016ZM.5 22.923l8.626-6.109v12.218L.5 22.923ZM63.5 22.923l-8.626-6.109v12.218l8.626-6.109Z'
          opacity={0.15}
        />
        <path
          fill='#204ECF'
          d='M64 64.113H0V22.664l8.837-6.259.578.817L1 23.182v39.931h62V23.182l-8.415-5.96.578-.817L64 22.664v41.449ZM42.694 8.8 32 1.226 21.306 8.8l-.578-.816L32 0l11.272 7.984-.578.816Z'
        />
        <path
          fill='#204ECF'
          d='M32 45.846.211 23.331l.578-.816L32 44.621l31.211-22.106.578.816L32 45.846Z'
        />
        <path
          fill='#204ECF'
          d='M28.936 42.861.21 63.203l.578.817 28.727-20.342-.579-.817ZM35.065 42.86l-.579.816 28.725 20.345.578-.816L35.065 42.86ZM55.374 29.032h-1V8.892H9.626v20.14h-1V7.892h46.748v21.14Z'
        />
        <path
          fill='#204ECF'
          d='M32 29.115a4.475 4.475 0 1 1 0-8.95 4.475 4.475 0 0 1 0 8.95Zm0-7.95a3.475 3.475 0 1 0 0 6.95 3.475 3.475 0 0 0 0-6.95Z'
        />
        <path
          fill='#204ECF'
          d='M31.995 34.075a9.435 9.435 0 1 1 9.161-7.146 2.883 2.883 0 0 1-5.681-.695v-5.569h1v5.57a1.883 1.883 0 0 0 3.71.453 8.44 8.44 0 0 0-14.253-7.911 8.437 8.437 0 0 0 9.82 13.42l.446.896a9.416 9.416 0 0 1-4.203.982Z'
        />
      </g>
      <defs>
        <clipPath id='a'>
          <path fill='#fff' d='M0 0h64v64.113H0z' />
        </clipPath>
      </defs>
    </svg>
  )
})

SvgEmailBlue64.displayName = 'SvgEmailBlue64'
export default SvgEmailBlue64
