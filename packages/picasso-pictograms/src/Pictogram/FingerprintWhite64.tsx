import type { Ref } from 'react'
import React, { forwardRef } from 'react'
import type { StandardProps } from '@toptal/picasso-shared'

const SIZE = 64

type ScaleType = 1 | 2
export interface Props extends StandardProps {
  scale?: ScaleType
  base?: number
}
const SvgFingerprintWhite64 = forwardRef(function SvgFingerprintWhite64(
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
          d='M32 56.697c13.048 0 23.625-10.618 23.625-23.716S45.048 9.264 32 9.264c-13.047 0-23.625 10.619-23.625 23.717 0 13.098 10.578 23.716 23.625 23.716Z'
          fill='#231F20'
        />
        <path
          d='M64 32.98h-1a30.899 30.899 0 0 0-9.68-22.592l.69-.725A31.892 31.892 0 0 1 64 32.981ZM1 32.98H0A31.99 31.99 0 0 1 47.142 4.676l-.475.88A30.99 30.99 0 0 0 1 32.98Z'
          fill='#fff'
        />
        <path
          d='M56.125 32.98h-1A23.197 23.197 0 0 0 32 9.765a22.82 22.82 0 0 0-14.4 5.05l-.624-.782A23.812 23.812 0 0 1 32 8.764a24.198 24.198 0 0 1 24.125 24.217ZM8.875 32.98h-1a24.23 24.23 0 0 1 3.579-12.697l.851.524a23.233 23.233 0 0 0-3.43 12.174Z'
          fill='#fff'
        />
        <path
          d='M16.75 32.98h-1a16.245 16.245 0 0 1 31.628-5.283l-.946.322a15.244 15.244 0 0 0-29.682 4.962ZM1.539 41.322l-.123-.992a7.4 7.4 0 0 0 6.46-7.35h1a8.4 8.4 0 0 1-7.337 8.342Z'
          fill='#fff'
        />
        <path
          d='m4.562 48.778-.25-.968A15.29 15.29 0 0 0 15.75 32.98h1A16.29 16.29 0 0 1 4.562 48.779ZM9.553 55.435l-.377-.927a23.04 23.04 0 0 0 7.095-4.547l.684.73a24.043 24.043 0 0 1-7.402 4.744ZM21.684 44.579l-.878-.479a23.321 23.321 0 0 0 2.82-11.12h1c0 4.051-1.011 8.038-2.942 11.599ZM16.501 60.805 16 59.94A31.26 31.26 0 0 0 31.5 32.98h1a32.265 32.265 0 0 1-15.999 27.825ZM25.418 64.233l-.627-.78a39.001 39.001 0 0 0 9.34-10.885l.866.5a40.012 40.012 0 0 1-9.58 11.165ZM38.47 45.241l-.953-.304a39.154 39.154 0 0 0 1.858-11.956h1a40.15 40.15 0 0 1-1.906 12.26ZM36.31 64.689l-.75-.66a46.56 46.56 0 0 0 11.558-27.49l.997.073A47.552 47.552 0 0 1 36.31 64.69ZM49.203 59.978l-.876-.483a55.055 55.055 0 0 0 6.798-26.514h1a56.058 56.058 0 0 1-6.922 26.997ZM40.375 32.98h-1a7.375 7.375 0 1 0-14.75 0h-1a8.374 8.374 0 1 1 16.75 0Z'
          fill='#fff'
        />
      </g>
      <defs>
        <clipPath id='a'>
          <path fill='#fff' transform='translate(0 .859)' d='M0 0h64v64H0z' />
        </clipPath>
      </defs>
    </svg>
  )
})

SvgFingerprintWhite64.displayName = 'SvgFingerprintWhite64'
export default SvgFingerprintWhite64
