import type { Ref } from 'react'
import React, { forwardRef } from 'react'
import type { StandardProps } from '@toptal/picasso-shared'

const SIZE = 64

type ScaleType = 1 | 2
export interface Props extends StandardProps {
  scale?: ScaleType
  base?: number
}
const SvgCertificateCredentialsBlue64 = forwardRef(
  function SvgCertificateCredentialsBlue64(
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
            fill='#183A9C'
            d='M10.05 40.54 3.5 36l1.44-1H1v9h8.42l.63-3.46ZM37.06 35l1.44 1-6.55 4.54.63 3.46H63v-9H37.06ZM25.8 47h-.3L21 53.5 16.5 47h-.3l-3.7.67V62.5l8.5-4.46 8.5 4.46V47.67L25.8 47Z'
            opacity={0.15}
          />
          <path
            stroke='#204ECD'
            strokeMiterlimit={10}
            d='M29.5 48v14.5L21 58.04l-8.5 4.46V48M9 44.5H.5v-41h63v41H33'
          />
          <path
            stroke='#204ECD'
            strokeMiterlimit={10}
            d='m21 18.5 4.54 6.55 7.83-1.42-1.42 7.83L38.5 36l-6.55 4.54 1.42 7.83-7.83-1.42L21 53.5l-4.54-6.55-7.83 1.42 1.42-7.83L3.5 36l6.55-4.54-1.42-7.83 7.83 1.42L21 18.5ZM41 14.5h14M41 20.5h14M41 26.5h6'
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

SvgCertificateCredentialsBlue64.displayName = 'SvgCertificateCredentialsBlue64'
export default SvgCertificateCredentialsBlue64
