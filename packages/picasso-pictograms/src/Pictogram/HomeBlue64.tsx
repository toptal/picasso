import type { Ref } from 'react'
import React, { forwardRef } from 'react'
import type { StandardProps } from '@toptal/picasso-shared'

const SIZE = 64

type ScaleType = 1 | 2
export interface Props extends StandardProps {
  scale?: ScaleType
  base?: number
}
const SvgHomeBlue64 = forwardRef(function SvgHomeBlue64(
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
          d='M9.5.543v9.455l6.75-2.799V.543H9.5ZM5.881 29.312 32 18.274l26.119 11.038V19.23L32 8.192 5.881 19.23v10.082Z'
          opacity={0.15}
        />
        <path
          fill='#183A9E'
          d='M35.338 28.425H18.576V39.3h16.762V28.426Z'
          opacity={0.15}
        />
        <path
          fill='#204ECF'
          d='M64 22.258 32 8.735 0 22.258v-8.734L32 0l32 13.524v8.734ZM32 7.648 63 20.75v-6.563L32 1.086 1 14.187v6.563L32 7.65Z'
        />
        <path
          fill='#204ECF'
          d='M10 9.998H9V.043h7.75v7.156h-1V1.043H10v8.955ZM58.619 64.043H5.381V19.23h1v43.813h51.238V19.23h1v44.813Z'
        />
        <path
          fill='#204ECF'
          d='M52.078 63.543h-1V46.858a1.752 1.752 0 0 0-1.75-1.75H14.672a1.752 1.752 0 0 0-1.75 1.75v16.685h-1V46.858a2.753 2.753 0 0 1 2.75-2.75h34.656a2.753 2.753 0 0 1 2.75 2.75v16.685ZM35.837 39.8H18.076V27.925h17.761V39.8Zm-16.761-1h15.761v-9.875H19.076V38.8Z'
        />
        <path
          fill='#204ECF'
          d='M27.456 39.3h-1v5.308h1V39.3ZM40.197 50.567h-1v7.783h1v-7.783Z'
        />
        <path
          fill='#204ECF'
          d='M33.962 53.192h-1v-1.313a1.814 1.814 0 0 1 1.813-1.812h8.344a1.752 1.752 0 0 0 1.75-1.75V34.949h1v13.368a2.753 2.753 0 0 1-2.75 2.75h-8.344a.813.813 0 0 0-.813.812v1.313ZM44.623 63.565a4.931 4.931 0 0 0-9.852 0l-1-.043a5.931 5.931 0 0 1 11.852 0l-1 .043Z'
        />
      </g>
      <defs>
        <clipPath id='a'>
          <path fill='#fff' d='M0 0h64v64.043H0z' />
        </clipPath>
      </defs>
    </svg>
  )
})

SvgHomeBlue64.displayName = 'SvgHomeBlue64'
export default SvgHomeBlue64
