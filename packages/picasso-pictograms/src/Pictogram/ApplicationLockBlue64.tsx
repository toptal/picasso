import type { Ref } from 'react'
import React, { forwardRef } from 'react'
import type { StandardProps } from '@toptal/picasso-shared'

const SIZE = 64

type ScaleType = 1 | 2
export interface Props extends StandardProps {
  scale?: ScaleType
  base?: number
}
const SvgApplicationLockBlue64 = forwardRef(function SvgApplicationLockBlue64(
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
          d='M63.5 51.043H.5v7.553h63v-7.553ZM43.485 30.38h-22.97v16.96h22.97V30.38Z'
          opacity={0.15}
        />
        <path
          fill='#204ECF'
          d='M64 59.096H0V5.958h64v53.138Zm-63-1h62V6.958H1v51.138Z'
        />
        <path
          fill='#204ECF'
          d='M43.985 47.84h-23.97V29.88h23.97v17.96Zm-22.97-1h21.97V30.88h-21.97v15.96Z'
        />
        <path
          fill='#204ECF'
          d='M40.888 30.38h-1v-4.277a7.888 7.888 0 0 0-15.776 0v4.277h-1v-4.277a8.888 8.888 0 0 1 17.776 0v4.277ZM12.157 14.178a1.688 1.688 0 1 0 0-3.375 1.688 1.688 0 0 0 0 3.375ZM6.532 14.178a1.688 1.688 0 1 0 0-3.375 1.688 1.688 0 0 0 0 3.375ZM17.782 14.178a1.688 1.688 0 1 0 0-3.375 1.688 1.688 0 0 0 0 3.375Z'
        />
      </g>
      <defs>
        <clipPath id='a'>
          <path fill='#fff' d='M0 .527h64v64H0z' />
        </clipPath>
      </defs>
    </svg>
  )
})

SvgApplicationLockBlue64.displayName = 'SvgApplicationLockBlue64'
export default SvgApplicationLockBlue64
