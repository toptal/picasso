import type { Ref } from 'react'
import React, { forwardRef } from 'react'
import type { StandardProps } from '@toptal/picasso-shared'

const SIZE = 64

type ScaleType = 1 | 2
export interface Props extends StandardProps {
  scale?: ScaleType
  base?: number
}
const SvgRefreshSettingsBlue64 = forwardRef(function SvgRefreshSettingsBlue64(
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
          fill='#183A9C'
          d='M43.5 32c0-.84-.1-1.66-.27-2.44l5.36-3.09c-.76-2.26-1.96-4.31-3.51-6.06l-5.36 3.09c-1.21-1.1-2.64-1.94-4.23-2.45v-6.19c-1.13-.23-2.3-.35-3.5-.35-1.2 0-2.37.12-3.5.35v6.19a11.51 11.51 0 0 0-4.22 2.45l-5.36-3.09a17.49 17.49 0 0 0-3.51 6.06l5.36 3.09c-.17.79-.27 1.6-.27 2.44 0 .84.1 1.66.27 2.44l-5.36 3.09c.76 2.26 1.96 4.31 3.51 6.06l5.36-3.09c1.2 1.1 2.64 1.94 4.22 2.45v6.19c1.13.23 2.3.35 3.5.35 1.2 0 2.37-.12 3.5-.35v-6.19c1.59-.51 3.02-1.36 4.23-2.45l5.36 3.09a17.49 17.49 0 0 0 3.51-6.06l-5.36-3.09c.17-.79.27-1.6.27-2.44ZM32 36.5c-2.49 0-4.5-2.01-4.5-4.5s2.01-4.5 4.5-4.5 4.5 2.01 4.5 4.5-2.01 4.5-4.5 4.5Z'
          opacity={0.15}
        />
        <path
          stroke='#204ECD'
          strokeMiterlimit={10}
          d='M32 36.5a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9Z'
        />
        <path
          stroke='#204ECD'
          strokeMiterlimit={10}
          d='m45.08 20.41-5.36 3.09c-1.21-1.1-2.64-1.94-4.23-2.45v-6.19c-1.13-.23-2.3-.35-3.5-.35-1.2 0-2.37.12-3.5.35v6.19a11.51 11.51 0 0 0-4.22 2.45l-5.36-3.09a17.49 17.49 0 0 0-3.51 6.06l5.36 3.09c-.17.79-.27 1.6-.27 2.44 0 .84.1 1.66.27 2.44l-5.36 3.09c.76 2.26 1.96 4.31 3.51 6.06l5.36-3.09c1.2 1.1 2.64 1.94 4.22 2.45v6.19c1.13.23 2.3.35 3.5.35 1.2 0 2.37-.12 3.5-.35v-6.19c1.59-.51 3.02-1.36 4.23-2.45l5.36 3.09a17.49 17.49 0 0 0 3.51-6.06l-5.36-3.09c.17-.79.27-1.6.27-2.44 0-.84-.1-1.66-.27-2.44l5.36-3.09c-.76-2.26-1.96-4.31-3.51-6.06Z'
        />
        <path
          stroke='#204ECD'
          strokeMiterlimit={10}
          d='M60.07 17.7c2.19 4.29 3.43 9.15 3.43 14.3 0 17.4-14.1 31.5-31.5 31.5-8.7 0-16.57-3.53-22.27-9.23M3.93 46.3A31.364 31.364 0 0 1 .5 32C.5 14.6 14.6.5 32 .5c8.7 0 16.57 3.53 22.27 9.23'
        />
        <path
          stroke='#204ECD'
          strokeMiterlimit={10}
          d='M54.5 1v9.5H45M9.5 63v-9.5H19'
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

SvgRefreshSettingsBlue64.displayName = 'SvgRefreshSettingsBlue64'
export default SvgRefreshSettingsBlue64
