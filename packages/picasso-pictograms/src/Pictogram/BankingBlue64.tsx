import type { Ref } from 'react'
import React, { forwardRef } from 'react'
import type { StandardProps } from '@toptal/picasso-shared'

const SIZE = 64

type ScaleType = 1 | 2
export interface Props extends StandardProps {
  scale?: ScaleType
  base?: number
}
const SvgBankingBlue64 = forwardRef(function SvgBankingBlue64(
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
          fill='#183A9E'
          d='M63.5 17.508H.5v8.401h63v-8.401ZM11.812 47.72H4.845v7.778h6.967v-7.777Z'
          opacity={0.15}
        />
        <path
          fill='#183A9E'
          d='M11.812 25.908H4.845v5.607h6.967v-5.607ZM27.593 47.72h-6.967v7.778h6.967v-7.777ZM27.593 25.908h-6.967v5.607h6.967v-5.607ZM43.374 47.72h-6.967v7.778h6.967v-7.777ZM43.374 25.908h-6.967v5.607h6.967v-5.607ZM59.155 47.72h-6.967v7.778h6.967v-7.777ZM59.155 25.908h-6.967v5.607h6.967v-5.607Z'
          opacity={0.15}
        />
        <path
          fill='#204ECF'
          d='M64 26.41H0v-9.624L32 0l32 16.786v9.623Zm-63-1h62v-8.02L32 1.13 1 17.39v8.02ZM64 64.064H0V55h64v9.065Zm-63-1h62v-7.066H1v7.066Z'
        />
        <path
          fill='#204ECF'
          d='M12.312 55.998H4.345v-30.59h7.967v30.59Zm-6.967-1h5.967v-28.59H5.345v28.59ZM28.093 55.998h-7.967v-30.59h7.967v30.59Zm-6.967-1h5.967v-28.59h-5.967v28.59ZM43.874 55.998h-7.967v-30.59h7.967v30.59Zm-6.967-1h5.967v-28.59h-5.967v28.59ZM59.655 55.998h-7.967v-30.59h7.967v30.59Zm-6.967-1h5.967v-28.59h-5.967v28.59ZM34.16 19.878h-4.32a3.01 3.01 0 0 1-3.007-3.006h1a2.01 2.01 0 0 0 2.007 2.006h4.32a2.007 2.007 0 1 0 0-4.013h-4.32a3.007 3.007 0 1 1 0-6.014h4.32a3.01 3.01 0 0 1 3.007 3.006h-1a2.009 2.009 0 0 0-2.007-2.006h-4.32a2.007 2.007 0 1 0 0 4.014h4.32a3.008 3.008 0 1 1 0 6.013Z'
        />
        <path fill='#204ECF' d='M32.5 6.305h-1v16.12h1V6.304Z' />
      </g>
      <defs>
        <clipPath id='a'>
          <path fill='#fff' d='M0 0h64v64.065H0z' />
        </clipPath>
      </defs>
    </svg>
  )
})

SvgBankingBlue64.displayName = 'SvgBankingBlue64'
export default SvgBankingBlue64
