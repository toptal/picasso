import React, { forwardRef, Ref } from 'react'
import { StandardProps } from '@toptal/picasso-shared'

const SIZE = 64

type ScaleType = 1 | 2
export interface Props extends StandardProps {
  scale?: ScaleType
  base?: number
}
const SvgUploadBlue64 = forwardRef(function SvgUploadBlue64(
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
          d='M32 .5v63a31.5 31.5 0 1 0 0-63Z'
          fill='#183A9E'
        />
        <path
          d='M32 64a32 32 0 1 1 32-32 32.036 32.036 0 0 1-32 32Zm0-63a31 31 0 1 0 31 31A31.036 31.036 0 0 0 32 1Z'
          fill='#204ECF'
        />
        <path d='M46.476 18.021H17.522v1h28.954v-1Z' fill='#204ECF' />
        <path
          d='M46.125 33.353 32 19.23 17.875 33.353l-.707-.707 14.359-14.358a.685.685 0 0 1 .946 0l14.36 14.358-.708.707Z'
          fill='#204ECF'
        />
        <path d='M32.5 18.521h-1v28.956h1V18.523Z' fill='#204ECF' />
      </g>
      <defs>
        <clipPath id='a'>
          <path fill='#fff' d='M0 0h64v64H0z' />
        </clipPath>
      </defs>
    </svg>
  )
})

SvgUploadBlue64.displayName = 'SvgUploadBlue64'
export default SvgUploadBlue64
