import type { Ref } from 'react'
import React, { forwardRef } from 'react'
import type { StandardProps } from '@toptal/picasso-shared'

const SIZE = 64

type ScaleType = 1 | 2
export interface Props extends StandardProps {
  scale?: ScaleType
  base?: number
}
const SvgBankingWhite64 = forwardRef(function SvgBankingWhite64(
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
      viewBox='0 0 64 64'
      fill='none'
      className={className}
      style={svgStyle}
      ref={ref}
      data-testid={testId}
    >
      <g clipPath='url(#a)'>
        <path
          opacity={0.3}
          d='M63.5 17.981H.5v8.402h63V17.98ZM11.812 48.194H4.845v7.778h6.967v-7.778Z'
          fill='#231F20'
        />
        <path
          opacity={0.3}
          d='M11.812 26.381H4.845v5.607h6.967v-5.607ZM27.593 48.194h-6.967v7.778h6.967v-7.778ZM27.593 26.381h-6.967v5.607h6.967v-5.607ZM43.374 48.194h-6.967v7.778h6.967v-7.778ZM43.374 26.381h-6.967v5.607h6.967v-5.607ZM59.155 48.194h-6.967v7.778h6.967v-7.778ZM59.155 26.381h-6.967v5.607h6.967v-5.607Z'
          fill='#231F20'
        />
        <path
          d='M64 26.883H0v-9.624L32 .473 64 17.26v9.624Zm-63-1h62v-8.02L32 1.604 1 17.862v8.02ZM64 64.538H0v-9.066h64v9.066Zm-63-1h62v-7.066H1v7.066Z'
          fill='#fff'
        />
        <path
          d='M12.312 56.472H4.345v-30.59h7.967v30.59Zm-6.967-1h5.967v-28.59H5.345v28.59ZM28.093 56.472h-7.967v-30.59h7.967v30.59Zm-6.967-1h5.967v-28.59h-5.967v28.59ZM43.874 56.472h-7.967v-30.59h7.967v30.59Zm-6.967-1h5.967v-28.59h-5.967v28.59ZM59.655 56.472h-7.967v-30.59h7.967v30.59Zm-6.967-1h5.967v-28.59h-5.967v28.59ZM34.16 20.352h-4.32a3.01 3.01 0 0 1-3.007-3.007h1a2.01 2.01 0 0 0 2.007 2.007h4.32a2.007 2.007 0 1 0 0-4.014h-4.32a3.007 3.007 0 1 1 0-6.014h4.32a3.01 3.01 0 0 1 3.007 3.007h-1a2.009 2.009 0 0 0-2.007-2.007h-4.32a2.007 2.007 0 1 0 0 4.014h4.32a3.01 3.01 0 0 1 3.013 3.007 3.006 3.006 0 0 1-3.013 3.007Z'
          fill='#fff'
        />
        <path d='M32.5 6.778h-1v16.12h1V6.778Z' fill='#fff' />
      </g>
      <defs>
        <clipPath id='a'>
          <path
            fill='#fff'
            transform='translate(0 .473)'
            d='M0 0h64v64.065H0z'
          />
        </clipPath>
      </defs>
    </svg>
  )
})

SvgBankingWhite64.displayName = 'SvgBankingWhite64'
export default SvgBankingWhite64
