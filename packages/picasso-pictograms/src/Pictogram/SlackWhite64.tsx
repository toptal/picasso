import type { Ref } from 'react'
import React, { forwardRef } from 'react'
import type { StandardProps } from '@toptal/picasso-shared'

const SIZE = 64

type ScaleType = 1 | 2
export interface Props extends StandardProps {
  scale?: ScaleType
  base?: number
}
const SvgSlackWhite64 = forwardRef(function SvgSlackWhite64(
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
          fill='#fff'
          fillRule='evenodd'
          d='M6.99 18A5.99 5.99 0 0 0 1 23.99v.02A5.99 5.99 0 0 0 6.99 30h17.02A5.99 5.99 0 0 0 30 24.01v-.02A5.99 5.99 0 0 0 24.01 18H6.99ZM0 23.99A6.99 6.99 0 0 1 6.99 17h17.02A6.99 6.99 0 0 1 31 23.99v.02A6.99 6.99 0 0 1 24.01 31H6.99A6.99 6.99 0 0 1 0 24.01v-.02ZM39.99 34A5.99 5.99 0 0 0 34 39.99v.02A5.99 5.99 0 0 0 39.99 46h17.02A5.99 5.99 0 0 0 63 40.01v-.02A5.99 5.99 0 0 0 57.01 34H39.99ZM33 39.99A6.99 6.99 0 0 1 39.99 33h17.02A6.99 6.99 0 0 1 64 39.99v.02A6.99 6.99 0 0 1 57.01 47H39.99A6.99 6.99 0 0 1 33 40.01v-.02Z'
          clipRule='evenodd'
        />
        <path
          fill='#000'
          d='M46.5 24.01V6.99A6.49 6.49 0 0 0 40.01.5h-.02a6.49 6.49 0 0 0-6.49 6.49v17.02a6.49 6.49 0 0 0 6.49 6.49h.02a6.49 6.49 0 0 0 6.49-6.49ZM30.5 57.01V39.99a6.49 6.49 0 0 0-6.49-6.49h-.02a6.49 6.49 0 0 0-6.49 6.49v17.02a6.49 6.49 0 0 0 6.49 6.49h.02a6.49 6.49 0 0 0 6.49-6.49ZM63.5 23.5c0 3.86-3.14 7-7 7h-7v-7c0-3.86 3.14-7 7-7s7 3.14 7 7ZM14.5 33.5v7c0 3.86-3.14 7-7 7s-7-3.14-7-7 3.14-7 7-7h7Z'
          opacity={0.3}
        />
        <path
          fill='#fff'
          fillRule='evenodd'
          d='M46 6.99A5.99 5.99 0 0 0 40.01 1h-.02A5.99 5.99 0 0 0 34 6.99v17.02A5.99 5.99 0 0 0 39.99 30h.02A5.99 5.99 0 0 0 46 24.01V6.99ZM40.01 0A6.99 6.99 0 0 1 47 6.99v17.02A6.99 6.99 0 0 1 40.01 31h-.02A6.99 6.99 0 0 1 33 24.01V6.99A6.99 6.99 0 0 1 39.99 0h.02ZM30 39.99A5.99 5.99 0 0 0 24.01 34h-.02A5.99 5.99 0 0 0 18 39.99v17.02A5.99 5.99 0 0 0 23.99 63h.02A5.99 5.99 0 0 0 30 57.01V39.99ZM24.01 33A6.99 6.99 0 0 1 31 39.99v17.02A6.99 6.99 0 0 1 24.01 64h-.02A6.99 6.99 0 0 1 17 57.01V39.99A6.99 6.99 0 0 1 23.99 33h.02ZM30 7.5C30 3.916 27.084 1 23.5 1A6.508 6.508 0 0 0 17 7.5c0 3.584 2.916 6.5 6.5 6.5H30V7.5ZM23.5 0C27.636 0 31 3.364 31 7.5V15h-7.5c-4.136 0-7.5-3.364-7.5-7.5S19.364 0 23.5 0ZM63 23.5c0-3.584-2.916-6.5-6.5-6.5a6.508 6.508 0 0 0-6.5 6.5V30h6.5c3.584 0 6.5-2.916 6.5-6.5ZM56.5 16c4.136 0 7.5 3.364 7.5 7.5S60.636 31 56.5 31H49v-7.5c0-4.136 3.364-7.5 7.5-7.5ZM47 56.5c0-3.584-2.916-6.5-6.5-6.5H34v6.5c0 3.584 2.916 6.5 6.5 6.5s6.5-2.916 6.5-6.5ZM40.5 49c4.136 0 7.5 3.364 7.5 7.5S44.636 64 40.5 64 33 60.636 33 56.5V49h7.5ZM15 33v7.5c0 4.136-3.364 7.5-7.5 7.5S0 44.636 0 40.5 3.364 33 7.5 33H15Zm-1 1H7.5A6.508 6.508 0 0 0 1 40.5C1 44.084 3.916 47 7.5 47s6.5-2.916 6.5-6.5V34Z'
          clipRule='evenodd'
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

SvgSlackWhite64.displayName = 'SvgSlackWhite64'
export default SvgSlackWhite64
