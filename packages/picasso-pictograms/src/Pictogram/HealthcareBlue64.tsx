import type { Ref } from 'react'
import React, { forwardRef } from 'react'
import type { StandardProps } from '@toptal/picasso-shared'

const SIZE = 64

type ScaleType = 1 | 2
export interface Props extends StandardProps {
  scale?: ScaleType
  base?: number
}
const SvgHealthcareBlue64 = forwardRef(function SvgHealthcareBlue64(
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
          d='M47.221 4.612a16.282 16.282 0 0 0-15.22 10.504A16.28 16.28 0 0 0 .521 21.745c.01.178.026.356.041.534.008.095.013.19.022.285C2.365 40.6 32 59.389 32 59.389S61.635 40.6 63.415 22.564c.01-.095.014-.19.022-.285.015-.178.032-.356.04-.534A16.279 16.279 0 0 0 47.22 4.612Zm-4.674 31.784h-7.031v7.032h-7.032v-7.032h-7.03v-7.03h7.03v-7.032h7.032v7.031h7.031v7.031Z'
          fill='#183A9E'
        />
        <path
          d='m32 59.98-.268-.17a124.307 124.307 0 0 1-15.108-11.7C6.402 38.797.838 30.22.087 22.612l-.032-.404c-.012-.146-.024-.292-.032-.438A16.78 16.78 0 0 1 32 13.83a16.78 16.78 0 0 1 31.977 7.94c-.007.142-.02.286-.032.43l-.032.411c-.751 7.608-6.315 16.186-16.537 25.497a124.298 124.298 0 0 1-15.108 11.702l-.268.17ZM16.779 5.112A15.796 15.796 0 0 0 1.022 21.719c.007.135.019.27.03.406l.03.39C2.73 39.2 29.043 56.858 32 58.793c2.958-1.935 29.271-19.597 30.917-36.279l.032-.399c.011-.131.023-.263.029-.395a15.78 15.78 0 0 0-30.51-6.427L32 16.524l-.467-1.23A15.866 15.866 0 0 0 16.779 5.111Z'
          fill='#204ECF'
        />
        <path
          d='M36.016 43.927h-8.032v-7.031h-7.03v-8.031h7.03v-7.031h8.032v7.03h7.03v8.032h-7.03v7.031Zm-7.032-1h6.032v-7.031h7.03v-6.031h-7.03v-7.031h-6.032v7.03h-7.03v6.032h7.03v7.031Z'
          fill='#204ECF'
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

SvgHealthcareBlue64.displayName = 'SvgHealthcareBlue64'
export default SvgHealthcareBlue64
