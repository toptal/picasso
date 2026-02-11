import type { Ref } from 'react'
import React, { forwardRef } from 'react'
import type { StandardProps } from '@toptal/picasso-shared'

const SIZE = 64

type ScaleType = 1 | 2
export interface Props extends StandardProps {
  scale?: ScaleType
  base?: number
}
const SvgChecklistInventoryBlue64 = forwardRef(
  function SvgChecklistInventoryBlue64(props: Props, ref: Ref<SVGSVGElement>) {
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
          <path fill='#183A9C' d='M49 47h-8v8h8v-8Z' opacity={0.15} />
          <path stroke='#204ECD' strokeMiterlimit={10} d='m42.5 50.5 2 2 4-4' />
          <path
            fill='#183A9C'
            d='M57 58H7v5h50v-5ZM23 9h-8v8h8V9ZM46 .8V12h11.2L46 .8Z'
            opacity={0.15}
          />
          <path
            stroke='#204ECD'
            strokeMiterlimit={10}
            d='M57.5 12.41 45.57.5H7.5v63h50V12.41Z'
          />
          <path
            stroke='#204ECD'
            strokeMiterlimit={10}
            d='M45.5 1v11.5H57M16.5 12.5l2 2 4-4'
          />
          <path fill='#183A9C' d='M23 22h-8v8h8v-8Z' opacity={0.15} />
          <path stroke='#204ECD' strokeMiterlimit={10} d='m16.5 25.5 2 2 4-4' />
          <path fill='#183A9C' d='M23 34h-8v8h8v-8Z' opacity={0.15} />
          <path stroke='#204ECD' strokeMiterlimit={10} d='m16.5 37.5 2 2 4-4' />
          <path fill='#183A9C' d='M23 47h-8v8h8v-8Z' opacity={0.15} />
          <path stroke='#204ECD' strokeMiterlimit={10} d='m16.5 50.5 2 2 4-4' />
          <path fill='#183A9C' d='M36 47h-8v8h8v-8Z' opacity={0.15} />
          <path stroke='#204ECD' strokeMiterlimit={10} d='m29.5 50.5 2 2 4-4' />
          <path fill='#183A9C' d='M36 34h-8v8h8v-8Z' opacity={0.15} />
          <path stroke='#204ECD' strokeMiterlimit={10} d='m29.5 37.5 2 2 4-4' />
          <path fill='#183A9C' d='M36 22h-8v8h8v-8Z' opacity={0.15} />
          <path stroke='#204ECD' strokeMiterlimit={10} d='m29.5 25.5 2 2 4-4' />
          <path fill='#183A9C' d='M36 9h-8v8h8V9Z' opacity={0.15} />
          <path stroke='#204ECD' strokeMiterlimit={10} d='m29.5 12.5 2 2 4-4' />
          <path fill='#183A9C' d='M49 17h-8V9h5v3h3v5Z' opacity={0.15} />
          <path stroke='#204ECD' strokeMiterlimit={10} d='m42.5 12.5 2 2 2-2' />
          <path fill='#183A9C' d='M49 22h-8v8h8v-8Z' opacity={0.15} />
          <path stroke='#204ECD' strokeMiterlimit={10} d='m42.5 25.5 2 2 4-4' />
          <path fill='#183A9C' d='M49 34h-8v8h8v-8Z' opacity={0.15} />
          <path stroke='#204ECD' strokeMiterlimit={10} d='m42.5 37.5 2 2 4-4' />
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

SvgChecklistInventoryBlue64.displayName = 'SvgChecklistInventoryBlue64'
export default SvgChecklistInventoryBlue64
