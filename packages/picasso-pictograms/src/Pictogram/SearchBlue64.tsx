import type { Ref } from 'react'
import React, { forwardRef } from 'react'
import type { StandardProps } from '@toptal/picasso-shared'

const SIZE = 64

type ScaleType = 1 | 2
export interface Props extends StandardProps {
  scale?: ScaleType
  base?: number
}
const SvgSearchBlue64 = forwardRef(function SvgSearchBlue64(
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
      viewBox='0 0 65 65'
      className={className}
      style={svgStyle}
      ref={ref}
      data-testid={testId}
    >
      <g clipPath='url(#a)'>
        <path
          fill='#183A9E'
          d='M26.6 45.066c10.199 0 18.466-8.267 18.466-18.466 0-10.198-8.267-18.465-18.465-18.465-10.199 0-18.466 8.267-18.466 18.465 0 10.199 8.267 18.466 18.466 18.466Z'
          opacity={0.15}
        />
        <path
          fill='#204ECF'
          d='M26.6 53.201a26.6 26.6 0 1 1 26.601-26.6 26.63 26.63 0 0 1-26.6 26.6ZM26.6 1a25.6 25.6 0 1 0 25.601 25.6A25.63 25.63 0 0 0 26.601 1Z'
        />
        <path
          fill='#204ECF'
          d='M58.748 64.207 42.174 47.633l.707-.707 15.867 15.867 4.045-4.045-15.867-15.867.707-.707 16.574 16.574-5.459 5.46Z'
        />
      </g>
      <defs>
        <clipPath id='a'>
          <path fill='#fff' d='M0 0h64.207v64.207H0z' />
        </clipPath>
      </defs>
    </svg>
  )
})

SvgSearchBlue64.displayName = 'SvgSearchBlue64'
export default SvgSearchBlue64
