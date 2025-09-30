import type { Ref } from 'react'
import React, { forwardRef } from 'react'
import type { StandardProps } from '@toptal/picasso-shared'
import { twMerge } from '@toptal/picasso-tailwind-merge'

import { getColorClass } from './styles'

const BASE_SIZE = 16

type ScaleType = 1 | 2 | 3 | 4
export interface Props extends StandardProps {
  scale?: ScaleType
  color?: string
  base?: number
  classes?: {
    root?: string
  }
}
const SvgOrgUnit16 = forwardRef(function SvgOrgUnit16(
  props: Props,
  ref: Ref<SVGSVGElement>
) {
  const {
    classes,
    className,
    style = {},
    color,
    scale,
    base,
    'data-testid': testId,
  } = props
  const scaledSize = base || BASE_SIZE * Math.ceil(scale || 1)
  const svgStyle = {
    minWidth: `${scaledSize}px`,
    minHeight: `${scaledSize}px`,
    ...style,
  }

  return (
    <svg
      viewBox='0 0 16 16'
      fill='none'
      className={twMerge(
        'stroke-current inline-block text-inherit h-[1em] align-[-.125em]',
        classes?.root,
        className,
        getColorClass(color)
      )}
      style={svgStyle}
      ref={ref}
      data-testid={testId}
    >
      <g clip-path='url(#clip0_5482_105)'>
        <path
          d='M3 13.5C3.82843 13.5 4.5 12.8284 4.5 12C4.5 11.1716 3.82843 10.5 3 10.5C2.17157 10.5 1.5 11.1716 1.5 12C1.5 12.8284 2.17157 13.5 3 13.5Z'
          stroke='currentColor'
        />
        <path
          d='M0.5 16C0.5 15.337 0.763392 14.7011 1.23223 14.2322C1.70107 13.7634 2.33696 13.5 3 13.5C3.66304 13.5 4.29893 13.7634 4.76777 14.2322C5.23661 14.7011 5.5 15.337 5.5 16'
          stroke='currentColor'
        />
        <path
          d='M8 13.5C8.82843 13.5 9.5 12.8284 9.5 12C9.5 11.1716 8.82843 10.5 8 10.5C7.17157 10.5 6.5 11.1716 6.5 12C6.5 12.8284 7.17157 13.5 8 13.5Z'
          stroke='currentColor'
        />
        <path
          d='M10.5 16C10.5 15.337 10.2366 14.7011 9.76777 14.2322C9.29893 13.7634 8.66304 13.5 8 13.5C7.33696 13.5 6.70107 13.7634 6.23223 14.2322C5.76339 14.7011 5.5 15.337 5.5 16'
          stroke='currentColor'
        />
        <path
          d='M8 3.5C8.82843 3.5 9.5 2.82843 9.5 2C9.5 1.17157 8.82843 0.5 8 0.5C7.17157 0.5 6.5 1.17157 6.5 2C6.5 2.82843 7.17157 3.5 8 3.5Z'
          stroke='currentColor'
        />
        <path
          d='M10.5 6C10.5 5.33696 10.2366 4.70107 9.76777 4.23223C9.29893 3.76339 8.66304 3.5 8 3.5C7.33696 3.5 6.70107 3.76339 6.23223 4.23223C5.76339 4.70107 5.5 5.33696 5.5 6'
          stroke='currentColor'
        />
        <path
          d='M13 13.5C13.8284 13.5 14.5 12.8284 14.5 12C14.5 11.1716 13.8284 10.5 13 10.5C12.1716 10.5 11.5 11.1716 11.5 12C11.5 12.8284 12.1716 13.5 13 13.5Z'
          stroke='currentColor'
        />
        <path
          d='M10.5 16C10.5 15.337 10.7634 14.7011 11.2322 14.2322C11.7011 13.7634 12.337 13.5 13 13.5C13.663 13.5 14.2989 13.7634 14.7678 14.2322C15.2366 14.7011 15.5 15.337 15.5 16'
          stroke='currentColor'
        />
        <path d='M2.5 9V7.5H13.5V9M8 6V9' stroke='currentColor' />
      </g>
      <defs>
        <clipPath id='clip0_5482_105'>
          <rect width='16' height='16' fill='white' />
        </clipPath>
      </defs>
    </svg>
  )
})

SvgOrgUnit16.displayName = 'SvgOrgUnit16'
export default SvgOrgUnit16
