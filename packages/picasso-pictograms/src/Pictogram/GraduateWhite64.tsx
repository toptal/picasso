import type { Ref } from 'react'
import React, { forwardRef } from 'react'
import type { StandardProps } from '@toptal/picasso-shared'

const SIZE = 64

type ScaleType = 1 | 2
export interface Props extends StandardProps {
  scale?: ScaleType
  base?: number
}
const SvgGraduateWhite64 = forwardRef(function SvgGraduateWhite64(
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
          d='M23.454 24.19a10.38 10.38 0 1 0 17.092 0H23.454Z'
          fill='#231F20'
        />
        <path
          opacity={0.3}
          d='M32 40.456a20.924 20.924 0 0 0-17.814 9.956 24.97 24.97 0 0 0 35.628 0A20.925 20.925 0 0 0 32 40.456Z'
          fill='#231F20'
        />
        <path
          d='M32 64.902a32 32 0 1 1 32-32 32.036 32.036 0 0 1-32 32Zm0-63a31 31 0 1 0 31 31 31.035 31.035 0 0 0-31-31Z'
          fill='#fff'
        />
        <path
          d='M32 40.956a10.882 10.882 0 0 1-9.021-16.964l.828.56a9.88 9.88 0 1 0 16.332-.08l.823-.567A10.88 10.88 0 0 1 32 40.956Z'
          fill='#fff'
        />
        <path
          d='M49.407 50.661a20.465 20.465 0 0 0-34.815 0l-.85-.526a21.465 21.465 0 0 1 36.516 0l-.85.526ZM41.05 24.69h-18.1v-9.508h1v8.508h16.1v-8.508h1v9.508Z'
          fill='#fff'
        />
        <path
          d='m32 18.511-15.457-5.068L32 8.375l15.458 5.068L32 18.511Zm-12.248-5.068L32 17.46l12.248-4.016L32 9.428l-12.248 4.015Z'
          fill='#fff'
        />
      </g>
      <defs>
        <clipPath id='a'>
          <path fill='#fff' transform='translate(0 .902)' d='M0 0h64v64H0z' />
        </clipPath>
      </defs>
    </svg>
  )
})

SvgGraduateWhite64.displayName = 'SvgGraduateWhite64'
export default SvgGraduateWhite64
