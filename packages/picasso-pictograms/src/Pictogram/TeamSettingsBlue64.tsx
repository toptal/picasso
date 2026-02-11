import type { Ref } from 'react'
import React, { forwardRef } from 'react'
import type { StandardProps } from '@toptal/picasso-shared'

const SIZE = 64

type ScaleType = 1 | 2
export interface Props extends StandardProps {
  scale?: ScaleType
  base?: number
}
const SvgTeamSettingsBlue64 = forwardRef(function SvgTeamSettingsBlue64(
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
          fillRule='evenodd'
          d='M46.35 17.1c.2-1.39.2-2.81 0-4.2l-3.34-.45c-.28-1.21-.76-2.37-1.42-3.43l2.04-2.68c-.84-1.13-1.84-2.13-2.97-2.97l-2.68 2.04c-1.06-.66-2.22-1.14-3.43-1.42L34.1.65c-1.39-.2-2.81-.2-4.2 0l-.45 3.34c-1.21.28-2.37.76-3.43 1.42l-2.68-2.04c-1.13.84-2.13 1.84-2.97 2.97l2.04 2.68c-.66 1.06-1.14 2.22-1.42 3.43l-3.34.45c-.2 1.39-.2 2.81 0 4.2l3.34.45c.28 1.21.76 2.37 1.42 3.43l-2.04 2.68c.84 1.13 1.84 2.13 2.97 2.97l2.68-2.04c1.06.66 2.21 1.14 3.42 1.42l.45 3.34c1.39.2 2.81.2 4.2 0l.45-3.34c1.21-.28 2.37-.76 3.43-1.42l2.68 2.04c1.13-.84 2.13-1.84 2.97-2.97l-2.04-2.68c.66-1.06 1.14-2.22 1.42-3.43l3.34-.45h.01ZM26.5 21c0-3.04 2.46-5.5 5.5-5.5-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5c3.04 0 5.5 2.46 5.5 5.5h-11Z'
          clipRule='evenodd'
          opacity={0.15}
        />
        <path
          stroke='#204ECD'
          strokeMiterlimit={10}
          d='M34.1.65c-1.39-.2-2.81-.2-4.2 0l-.45 3.34c-1.21.28-2.37.76-3.43 1.42l-2.68-2.04c-1.13.84-2.13 1.84-2.97 2.97l2.04 2.68c-.66 1.06-1.14 2.22-1.42 3.43l-3.34.45c-.2 1.39-.2 2.81 0 4.2l3.34.45c.28 1.21.76 2.37 1.42 3.43l-2.04 2.68c.84 1.13 1.84 2.13 2.97 2.97l2.68-2.04c1.06.66 2.21 1.14 3.42 1.42l.45 3.34c1.39.2 2.81.2 4.2 0l.45-3.34c1.21-.28 2.37-.76 3.43-1.42l2.68 2.04c1.13-.84 2.13-1.84 2.97-2.97l-2.04-2.68c.66-1.06 1.14-2.22 1.42-3.43l3.34-.45c.2-1.39.2-2.81 0-4.2L43 12.45c-.28-1.21-.76-2.37-1.42-3.43l2.04-2.68c-.84-1.13-1.84-2.13-2.97-2.97l-2.68 2.04c-1.06-.66-2.22-1.14-3.43-1.42L34.09.65h.01Z'
          clipRule='evenodd'
        />
        <path
          stroke='#204ECD'
          strokeMiterlimit={10}
          d='M32 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7ZM26.5 21c0-3.04 2.46-5.5 5.5-5.5s5.5 2.46 5.5 5.5M8.5 55.5a5 5 0 1 0 0-10 5 5 0 0 0 0 10Z'
        />
        <path
          stroke='#204ECD'
          strokeLinecap='square'
          strokeMiterlimit={10}
          d='M.5 63.5c0-4.42 3.58-8 8-8s8 3.58 8 8'
        />
        <path
          stroke='#204ECD'
          strokeMiterlimit={10}
          d='M31.5 55.5a5 5 0 1 0 0-10 5 5 0 0 0 0 10Z'
        />
        <path
          stroke='#204ECD'
          strokeLinecap='square'
          strokeMiterlimit={10}
          d='M23.5 63.5c0-4.42 3.58-8 8-8s8 3.58 8 8'
        />
        <path
          stroke='#204ECD'
          strokeMiterlimit={10}
          d='M54.5 55.5a5 5 0 1 0 0-10 5 5 0 0 0 0 10Z'
        />
        <path
          stroke='#204ECD'
          strokeLinecap='square'
          strokeMiterlimit={10}
          d='M46.5 63.5c0-4.42 3.58-8 8-8s8 3.58 8 8'
        />
        <path
          stroke='#204ECD'
          strokeMiterlimit={10}
          d='M54.5 46v-6.5h-46V46M31.5 45.5v-11'
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

SvgTeamSettingsBlue64.displayName = 'SvgTeamSettingsBlue64'
export default SvgTeamSettingsBlue64
