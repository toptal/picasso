import type { Ref } from 'react'
import React, { forwardRef } from 'react'
import type { StandardProps } from '@toptal/picasso-shared'

const SIZE = 64

type ScaleType = 1 | 2
export interface Props extends StandardProps {
  scale?: ScaleType
  base?: number
}
const SvgPriorityIncidentBlue64 = forwardRef(function SvgPriorityIncidentBlue64(
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
          d='M22 5.03c-.17 0-.33-.03-.5-.03C12.39 5 5 12.39 5 21.5c0 .17.02.33.03.5H22V5.03ZM38.22 48.52l-1.15-8.06a3.466 3.466 0 1 1 6.86 0l-1.15 8.06a2.304 2.304 0 0 1-4.56 0ZM63.05 59.08 63 59H17.8l-.05.08c-1.13 1.96.28 4.42 2.55 4.42h40.2c2.27 0 3.68-2.45 2.55-4.42Z'
          opacity={0.15}
        />
        <path
          fill='#183A9C'
          d='M40.5 59.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z'
          opacity={0.15}
        />
        <path
          stroke='#204ECD'
          strokeMiterlimit={10}
          d='m42.48 23.5 20.57 35.59c1.13 1.96-.28 4.42-2.55 4.42H20.3c-2.27 0-3.68-2.45-2.55-4.42L38.32 23.5c.92-1.6 3.23-1.6 4.16 0Z'
        />
        <path
          stroke='#204ECD'
          strokeMiterlimit={10}
          d='m38.22 48.52-1.15-8.06a3.466 3.466 0 1 1 6.86 0l-1.15 8.06a2.304 2.304 0 0 1-4.56 0ZM40.5 59.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM21.5 12v9.5H5'
        />
        <path
          stroke='#204ECD'
          strokeMiterlimit={10}
          d='M27.91 41.5c-2.02.65-4.18 1-6.41 1-11.6 0-21-9.4-21-21s9.4-21 21-21c10.74 0 19.59 8.06 20.85 18.46'
        />
        <path
          stroke='#204ECD'
          strokeMiterlimit={10}
          d='M19 56.5H7.5V37M41 7.5h15.5V42'
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

SvgPriorityIncidentBlue64.displayName = 'SvgPriorityIncidentBlue64'
export default SvgPriorityIncidentBlue64
