import type { Ref } from 'react'
import React, { forwardRef } from 'react'
import type { StandardProps } from '@toptal/picasso-shared'

const SIZE = 64

type ScaleType = 1 | 2
export interface Props extends StandardProps {
  scale?: ScaleType
  base?: number
}
const SvgDashboardSettingsBlue64 = forwardRef(
  function SvgDashboardSettingsBlue64(props: Props, ref: Ref<SVGSVGElement>) {
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
            d='M17 36H6v22h11V36ZM44 36h-9v22h9V36ZM43.13 23l.5.66c-.84 1.13-1.84 2.13-2.97 2.97l-2.68-2.04c-1.06.66-2.22 1.14-3.43 1.42l-.45 3.34c-1.39.2-2.81.2-4.2 0l-.45-3.34c-1.21-.28-2.37-.76-3.42-1.42l-2.68 2.04c-.86-.64-1.64-1.37-2.34-2.18v7.56h37v-9H43.14l-.01-.01Z'
            opacity={0.15}
          />
          <path
            stroke='#204ECD'
            strokeMiterlimit={10}
            d='M16.28 23.5H6.5v8h9.78v-8ZM29.5 36.5h-8v21h8v-21ZM57.5 36.5h-8v21h8v-21Z'
          />
          <path
            stroke='#204ECD'
            strokeMiterlimit={10}
            d='M50 15.5h11.5c1.1 0 2 .9 2 2v44c0 1.1-.9 2-2 2h-59c-1.1 0-2-.9-2-2v-44c0-1.1.9-2 2-2H14'
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
            d='m27 15 3.5 3.5L37 12'
          />
        </g>
        <defs>
          <clipPath id='a'>
            <path fill='#fff' d='M0 0h64v64H0z' />
          </clipPath>
        </defs>
      </svg>
    )
  }
)

SvgDashboardSettingsBlue64.displayName = 'SvgDashboardSettingsBlue64'
export default SvgDashboardSettingsBlue64
