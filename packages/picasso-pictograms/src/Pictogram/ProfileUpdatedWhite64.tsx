import type { Ref } from 'react'
import React, { forwardRef } from 'react'
import type { StandardProps } from '@toptal/picasso-shared'

const SIZE = 64

type ScaleType = 1 | 2
export interface Props extends StandardProps {
  scale?: ScaleType
  base?: number
}
const SvgProfileUpdatedWhite64 = forwardRef(function SvgProfileUpdatedWhite64(
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
          fill='#000'
          d='M28.05 29H12.5c0-4.69 3.81-8.5 8.5-8.5 4.25 0 7.76 3.12 8.39 7.2 3.25-2.9 7.42-4.77 12.03-5.12.04-.52.08-1.05.08-1.58 0-.48-.02-.96-.05-1.44C40.71 8.91 31.84.5 21 .5S.5 9.68.5 21 9.68 41.5 21 41.5c.53 0 1.06-.04 1.58-.08.37-4.79 2.38-9.12 5.47-12.42ZM21 7.5c3.04 0 5.5 2.46 5.5 5.5s-2.46 5.5-5.5 5.5-5.5-2.46-5.5-5.5 2.46-5.5 5.5-5.5ZM34.33 43 31 46.33l8 8 16-16L51.67 35 39 47.67 34.33 43Z'
          opacity={0.3}
        />
        <path
          stroke='#fff'
          strokeMiterlimit={10}
          d='M21 18.5a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11ZM12.5 29c0-4.69 3.81-8.5 8.5-8.5 4.25 0 7.77 3.12 8.4 7.19'
        />
        <path
          stroke='#fff'
          strokeMiterlimit={10}
          d='M22.58 41.44c-.52.04-1.05.06-1.58.06C9.68 41.5.5 32.32.5 21S9.68.5 21 .5s19.71 8.41 20.45 19.06M34.33 43 31 46.33l8 8 16-16L51.67 35 39 47.67 34.33 43Z'
        />
        <path
          stroke='#fff'
          strokeMiterlimit={10}
          d='M43 63.5c11.322 0 20.5-9.178 20.5-20.5S54.322 22.5 43 22.5 22.5 31.678 22.5 43 31.678 63.5 43 63.5Z'
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

SvgProfileUpdatedWhite64.displayName = 'SvgProfileUpdatedWhite64'
export default SvgProfileUpdatedWhite64
