import React, { forwardRef, Ref } from 'react'
import { StandardProps } from '@toptal/picasso-shared'

const SIZE = 64

type ScaleType = 1 | 2
export interface Props extends StandardProps {
  scale?: ScaleType
  base?: number
}
const SvgLegalWhite64 = forwardRef(function SvgLegalWhite64(
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
      viewBox='0 0 64 65'
      fill='none'
      className={className}
      style={svgStyle}
      ref={ref}
      data-testid={testId}
    >
      <g clipPath='url(#a)'>
        <path
          opacity={0.3}
          d='M22.561 55.723a8.79 8.79 0 0 0 8.777 8.76h1.32a8.793 8.793 0 0 0 8.777-8.76c-.004-2.233.17-4.463.518-6.669h-19.91c.349 2.206.522 4.436.518 6.67Z'
          fill='#231F20'
        />
        <path
          d='M32.664 64.987h-1.328a9.28 9.28 0 0 1-9.27-9.27A39.922 39.922 0 0 0 14.18 31.57a18.118 18.118 0 0 1-3.802-11.058C10.378 9.746 20.078.987 32 .987s21.622 8.759 21.622 19.525A18.118 18.118 0 0 1 49.82 31.57a39.925 39.925 0 0 0-7.886 24.147 9.28 9.28 0 0 1-9.27 9.27Zm-.664-63c-11.37 0-20.622 8.31-20.622 18.525a17.127 17.127 0 0 0 3.597 10.451 40.927 40.927 0 0 1 8.09 24.754 8.28 8.28 0 0 0 8.27 8.27h1.33a8.28 8.28 0 0 0 8.27-8.27 40.93 40.93 0 0 1 8.09-24.754 17.127 17.127 0 0 0 3.597-10.451C52.622 10.297 43.37 1.987 32 1.987Z'
          fill='#fff'
        />
        <path
          d='M41.992 48.555H22.05v1h19.943v-1ZM36.092 41.028h-1V30.27h-6.184v10.758h-1V30.27h-2.86a3.76 3.76 0 0 1-3.123-1.797 3.413 3.413 0 0 1-.12-3.35 3.632 3.632 0 0 1 3.77-1.986 3.581 3.581 0 0 1 3.113 2.823c.186 1.053.26 2.122.22 3.19v.12h6.184v-.12c-.04-1.068.034-2.137.22-3.19a3.582 3.582 0 0 1 3.112-2.823 3.624 3.624 0 0 1 3.77 1.986 3.415 3.415 0 0 1-.113 3.34 3.761 3.761 0 0 1-3.097 1.807h-2.892v10.758ZM25.086 24.107a2.583 2.583 0 0 0-2.385 1.46 2.4 2.4 0 0 0 .078 2.386 2.75 2.75 0 0 0 2.278 1.317h2.851v-.122a14.178 14.178 0 0 0-.199-2.982 2.572 2.572 0 0 0-2.26-2.037 2.933 2.933 0 0 0-.363-.022Zm13.828 0c-.122 0-.243.007-.363.022a2.571 2.571 0 0 0-2.26 2.037 14.178 14.178 0 0 0-.2 2.982v.122h2.881a2.747 2.747 0 0 0 2.253-1.323 2.402 2.402 0 0 0 .074-2.38 2.583 2.583 0 0 0-2.385-1.46Z'
          fill='#fff'
        />
        <path
          d='M64 49.554H41.992v-1H63V17.42H52.744v-1H64v33.134ZM22.049 49.554H0V16.42h11.274v1H1v31.134h21.049v1Z'
          fill='#fff'
        />
      </g>
      <defs>
        <clipPath id='a'>
          <path fill='#fff' transform='translate(0 .987)' d='M0 0h64v64H0z' />
        </clipPath>
      </defs>
    </svg>
  )
})

SvgLegalWhite64.displayName = 'SvgLegalWhite64'
export default SvgLegalWhite64
