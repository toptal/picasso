import type { Ref } from 'react'
import React, { forwardRef } from 'react'
import type { StandardProps } from '@toptal/picasso-shared'

const SIZE = 64

type ScaleType = 1 | 2
export interface Props extends StandardProps {
  scale?: ScaleType
  base?: number
}
const SvgArtificialIntelligenceBlue64 = forwardRef(
  function SvgArtificialIntelligenceBlue64(
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
            d='M34.254 20.467a5.4 5.4 0 1 0 0-10.8 5.4 5.4 0 0 0 0 10.8ZM21.359 30.057a5.4 5.4 0 1 0 0-10.8 5.4 5.4 0 0 0 0 10.8ZM47.15 30.057a5.4 5.4 0 1 0 0-10.8 5.4 5.4 0 0 0 0 10.8Z'
            fill='#183A9E'
          />
          <path
            d='M34.254 20.967a5.9 5.9 0 1 1 0-11.799 5.9 5.9 0 0 1 0 11.799Zm0-10.8a4.9 4.9 0 1 0 4.9 4.9 4.906 4.906 0 0 0-4.9-4.9ZM21.36 30.557a5.9 5.9 0 1 1 5.899-5.9 5.906 5.906 0 0 1-5.9 5.9Zm0-10.8a4.9 4.9 0 1 0-.002 9.8 4.9 4.9 0 0 0 .001-9.8ZM47.15 30.557a5.9 5.9 0 1 1 5.9-5.9 5.907 5.907 0 0 1-5.9 5.9Zm0-10.8a4.9 4.9 0 1 0 0 9.798 4.9 4.9 0 0 0 0-9.799Z'
            fill='#204ECF'
          />
          <path
            d='M34.754 20.467h-1v26.442h1V20.467ZM29.354 46.909h-1v-7.078l-7.495-4.655v-5.119h1v4.564l7.495 4.655v7.633ZM40.154 46.909h-1v-7.633l7.495-4.655v-4.564h1v5.119l-7.495 4.655v7.078Z'
            fill='#204ECF'
          />
          <path
            d='M52.613 64H23.16v-6.375H11.231a3.84 3.84 0 0 1-3.836-3.836V41.57H2.738L8.091 21.17A26.916 26.916 0 0 1 33.795.004l.009.5-.01-.5a26.855 26.855 0 0 1 18.82 46.453V64ZM24.16 63h27.453V46.02l.161-.148a25.934 25.934 0 0 0 8.34-19.014A25.812 25.812 0 0 0 9.06 21.407L4.035 40.57h4.36V53.79a2.84 2.84 0 0 0 2.836 2.836H24.16V63Z'
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
  }
)

SvgArtificialIntelligenceBlue64.displayName = 'SvgArtificialIntelligenceBlue64'
export default SvgArtificialIntelligenceBlue64
