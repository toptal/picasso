import React, { forwardRef, Ref } from 'react'
import { StandardProps } from '@toptal/picasso-shared'

const SIZE = 64

type ScaleType = 1 | 2
export interface Props extends StandardProps {
  scale?: ScaleType
  base?: number
}
const SvgAntivirusShieldBlue64 = forwardRef(function SvgAntivirusShieldBlue64(
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
          opacity={0.15}
          d='M32 39.702a8.758 8.758 0 1 0 0-17.515 8.758 8.758 0 0 0 0 17.515Z'
          fill='#183A9E'
        />
        <path
          d='m32 64.084-15.202-7.217A17.673 17.673 0 0 1 6.75 40.975V2.843h13.813c2.239 0 4.462-.38 6.573-1.126L32 0l4.864 1.717a19.697 19.697 0 0 0 6.574 1.126H57.25v38.132a17.672 17.672 0 0 1-10.048 15.892L32 64.084ZM7.75 3.843v37.132a16.668 16.668 0 0 0 9.477 14.989L32 62.977l14.773-7.013a16.668 16.668 0 0 0 9.477-14.99V3.844H43.437a20.703 20.703 0 0 1-6.906-1.183L32 1.06l-4.531 1.6a20.703 20.703 0 0 1-6.907 1.183H7.75Z'
          fill='#204ECF'
        />
        <path d='M32.5 18.046h-1v4.14h1v-4.14Z' fill='#204ECF' />
        <path
          d='M32 18.546a3.216 3.216 0 1 1 0-6.432 3.216 3.216 0 0 1 0 6.432Zm0-5.43a2.216 2.216 0 1 0 0 4.43 2.216 2.216 0 0 0 0-4.43ZM32.5 39.702h-1v4.14h1v-4.14Z'
          fill='#204ECF'
        />
        <path
          d='M32 49.773a3.216 3.216 0 1 1 0-6.431 3.216 3.216 0 0 1 0 6.431Zm0-5.431a2.215 2.215 0 1 0 0 4.43 2.215 2.215 0 0 0 0-4.43ZM40.767 21.47l-2.928 2.928.707.707 2.928-2.927-.707-.707Z'
          fill='#204ECF'
        />
        <path
          d='M43.04 23.118a3.213 3.213 0 1 1 .007-6.426 3.213 3.213 0 0 1-.007 6.426Zm0-5.429a2.215 2.215 0 1 0 .004 4.43 2.215 2.215 0 0 0-.004-4.43ZM25.454 36.783l-2.928 2.928.707.707 2.928-2.928-.707-.707Z'
          fill='#204ECF'
        />
        <path
          d='M20.96 45.198a3.214 3.214 0 1 1 .003-6.428 3.214 3.214 0 0 1-.003 6.428Zm0-5.428a2.215 2.215 0 1 0 .003 4.43 2.215 2.215 0 0 0-.003-4.43ZM44.898 30.444h-4.14v1h4.14v-1Z'
          fill='#204ECF'
        />
        <path
          d='M47.613 34.16a3.216 3.216 0 1 1 0-6.432 3.216 3.216 0 0 1 0 6.432Zm0-5.431a2.216 2.216 0 1 0 0 4.432 2.216 2.216 0 0 0 0-4.433ZM23.243 30.444h-4.14v1h4.14v-1Z'
          fill='#204ECF'
        />
        <path
          d='M16.387 34.16a3.216 3.216 0 1 1 0-6.432 3.216 3.216 0 0 1 0 6.432Zm0-5.431a2.216 2.216 0 1 0 0 4.432 2.216 2.216 0 0 0 0-4.433ZM38.546 36.783l-.707.707 2.928 2.927.707-.707-2.928-2.927Z'
          fill='#204ECF'
        />
        <path
          d='M43.04 45.198a3.215 3.215 0 1 1 .005-6.429 3.215 3.215 0 0 1-.005 6.43Zm0-5.428a2.214 2.214 0 1 0 .004 4.427 2.214 2.214 0 0 0-.003-4.427ZM23.233 21.47l-.707.708 2.928 2.927.707-.707-2.928-2.927Z'
          fill='#204ECF'
        />
        <path
          d='M20.96 23.118a3.207 3.207 0 0 1-2.274-.94 3.22 3.22 0 1 1 2.273.94Zm-1.567-1.647a2.215 2.215 0 1 0 3.133-3.133 2.215 2.215 0 0 0-3.133 3.133ZM32 40.202a9.258 9.258 0 1 1 9.257-9.258A9.268 9.268 0 0 1 32 40.202Zm0-17.515a8.257 8.257 0 1 0 8.257 8.257A8.266 8.266 0 0 0 32 22.686Z'
          fill='#204ECF'
        />
      </g>
      <defs>
        <clipPath id='a'>
          <path fill='#fff' d='M0 0h64v64.084H0z' />
        </clipPath>
      </defs>
    </svg>
  )
})

SvgAntivirusShieldBlue64.displayName = 'SvgAntivirusShieldBlue64'
export default SvgAntivirusShieldBlue64
