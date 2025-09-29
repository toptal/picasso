import type { Ref } from 'react'
import React, { forwardRef } from 'react'
import type { StandardProps } from '@toptal/picasso-shared'
import { twMerge } from '@toptal/picasso-tailwind-merge'

import { getColorClass } from './styles'

const BASE_SIZE = 24

type ScaleType = 1 | 2 | 3 | 4
export interface Props extends StandardProps {
  scale?: ScaleType
  color?: string
  base?: number
  classes?: {
    root?: string
  }
}
const SvgOrgUnit24 = forwardRef(function SvgOrgUnit24(
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
      viewBox='0 0 24 24'
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
      <g clip-path='url(#clip0_5482_108)'>
        <path
          d='M5.75 18.875C6.78553 18.875 7.625 18.0355 7.625 17C7.625 15.9645 6.78553 15.125 5.75 15.125C4.71447 15.125 3.875 15.9645 3.875 17C3.875 18.0355 4.71447 18.875 5.75 18.875Z'
          stroke='currentColor'
        />
        <path
          d='M2.625 22C2.625 21.1712 2.95424 20.3763 3.54029 19.7903C4.12634 19.2042 4.9212 18.875 5.75 18.875C6.5788 18.875 7.37366 19.2042 7.95971 19.7903C8.54576 20.3763 8.875 21.1712 8.875 22'
          stroke='currentColor'
        />
        <path
          d='M12 18.875C13.0355 18.875 13.875 18.0355 13.875 17C13.875 15.9645 13.0355 15.125 12 15.125C10.9645 15.125 10.125 15.9645 10.125 17C10.125 18.0355 10.9645 18.875 12 18.875Z'
          stroke='currentColor'
        />
        <path
          d='M15.125 22C15.125 21.1712 14.7958 20.3763 14.2097 19.7903C13.6237 19.2042 12.8288 18.875 12 18.875C11.1712 18.875 10.3763 19.2042 9.79029 19.7903C9.20424 20.3763 8.875 21.1712 8.875 22'
          stroke='currentColor'
        />
        <path
          d='M12 6.375C13.0355 6.375 13.875 5.53553 13.875 4.5C13.875 3.46447 13.0355 2.625 12 2.625C10.9645 2.625 10.125 3.46447 10.125 4.5C10.125 5.53553 10.9645 6.375 12 6.375Z'
          stroke='currentColor'
        />
        <path
          d='M15.125 9.5C15.125 8.6712 14.7958 7.87634 14.2097 7.29029C13.6237 6.70424 12.8288 6.375 12 6.375C11.1712 6.375 10.3763 6.70424 9.79029 7.29029C9.20424 7.87634 8.875 8.6712 8.875 9.5'
          stroke='currentColor'
        />
        <path
          d='M18.25 18.875C19.2855 18.875 20.125 18.0355 20.125 17C20.125 15.9645 19.2855 15.125 18.25 15.125C17.2145 15.125 16.375 15.9645 16.375 17C16.375 18.0355 17.2145 18.875 18.25 18.875Z'
          stroke='currentColor'
        />
        <path
          d='M15.125 22C15.125 21.1712 15.4542 20.3763 16.0403 19.7903C16.6263 19.2042 17.4212 18.875 18.25 18.875C19.0788 18.875 19.8737 19.2042 20.4597 19.7903C21.0458 20.3763 21.375 21.1712 21.375 22'
          stroke='currentColor'
        />
        <path
          d='M5.125 13.25V11.375H18.875V13.25M12 9.5V13.25'
          stroke='currentColor'
        />
      </g>
      <defs>
        <clipPath id='clip0_5482_108'>
          <rect
            width='20'
            height='20'
            fill='white'
            transform='translate(2 2)'
          />
        </clipPath>
      </defs>
    </svg>
  )
})

SvgOrgUnit24.displayName = 'SvgOrgUnit24'
export default SvgOrgUnit24
