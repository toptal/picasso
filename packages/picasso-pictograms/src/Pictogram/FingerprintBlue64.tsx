import React, { forwardRef, Ref } from 'react'
import { StandardProps } from '@toptal/picasso-shared'

const SIZE = 64

type ScaleType = 1 | 2
export interface Props extends StandardProps {
  scale?: ScaleType
  base?: number
}
const SvgFingerprintBlue64 = forwardRef(function SvgFingerprintBlue64(
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
          d='M32 55.839c13.048 0 23.625-10.619 23.625-23.717C55.625 19.024 45.048 8.406 32 8.406c-13.047 0-23.625 10.618-23.625 23.716S18.953 55.84 32 55.84Z'
          fill='#183A9E'
        />
        <path
          d='M64 32.122h-1A30.899 30.899 0 0 0 53.32 9.53l.69-.724A31.892 31.892 0 0 1 64 32.122ZM1 32.122H0A31.99 31.99 0 0 1 47.142 3.816l-.475.88A30.99 30.99 0 0 0 1 32.122Z'
          fill='#204ECF'
        />
        <path
          d='M56.125 32.122h-1A23.197 23.197 0 0 0 32 8.906a22.82 22.82 0 0 0-14.4 5.05l-.624-.782A23.812 23.812 0 0 1 32 7.906a24.198 24.198 0 0 1 24.125 24.216ZM8.875 32.122h-1a24.23 24.23 0 0 1 3.579-12.697l.851.523a23.233 23.233 0 0 0-3.43 12.174Z'
          fill='#204ECF'
        />
        <path
          d='M16.75 32.122h-1a16.244 16.244 0 0 1 31.628-5.284l-.946.323a15.244 15.244 0 0 0-29.682 4.961ZM1.539 40.463l-.123-.992a7.4 7.4 0 0 0 6.46-7.349h1a8.4 8.4 0 0 1-7.337 8.341Z'
          fill='#204ECF'
        />
        <path
          d='m4.562 47.919-.25-.968A15.29 15.29 0 0 0 15.75 32.122h1A16.29 16.29 0 0 1 4.562 47.92ZM9.553 54.576l-.377-.927a23.04 23.04 0 0 0 7.095-4.547l.684.73a24.043 24.043 0 0 1-7.402 4.744ZM21.684 43.72l-.878-.478a23.322 23.322 0 0 0 2.82-11.12h1c0 4.05-1.011 8.037-2.942 11.598ZM16.501 59.946 16 59.081A31.261 31.261 0 0 0 31.5 32.122h1a32.266 32.266 0 0 1-15.999 27.824ZM25.418 63.374l-.627-.78a39.004 39.004 0 0 0 9.34-10.885l.866.501a40.012 40.012 0 0 1-9.58 11.164ZM38.47 44.383l-.953-.305a39.154 39.154 0 0 0 1.858-11.956h1a40.152 40.152 0 0 1-1.906 12.26ZM36.31 63.83l-.75-.66a46.56 46.56 0 0 0 11.558-27.49l.997.074A47.552 47.552 0 0 1 36.31 63.83ZM49.203 59.12l-.876-.483a55.054 55.054 0 0 0 6.798-26.515h1a56.058 56.058 0 0 1-6.922 26.997ZM40.375 32.122h-1a7.375 7.375 0 1 0-14.75 0h-1a8.374 8.374 0 1 1 16.75 0Z'
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

SvgFingerprintBlue64.displayName = 'SvgFingerprintBlue64'
export default SvgFingerprintBlue64
