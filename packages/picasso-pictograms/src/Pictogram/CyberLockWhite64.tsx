import type { Ref } from 'react'
import React, { forwardRef } from 'react'
import type { StandardProps } from '@toptal/picasso-shared'

const SIZE = 64

type ScaleType = 1 | 2
export interface Props extends StandardProps {
  scale?: ScaleType
  base?: number
}
const SvgCyberLockWhite64 = forwardRef(function SvgCyberLockWhite64(
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
          fillRule='evenodd'
          clipRule='evenodd'
          d='M20.514 28.062v16.954h22.972V28.062H20.514Z'
          fill='#231F20'
        />
        <path
          d='M43.985 45.519h-23.97v-17.96h23.97v17.96Zm-22.97-1h21.97v-15.96h-21.97v15.96Z'
          fill='#fff'
        />
        <path
          d='M40.888 28.06h-1v-4.278A7.89 7.89 0 0 0 32 15.885a7.888 7.888 0 0 0-7.888 7.897v4.277h-1v-4.277a8.888 8.888 0 1 1 17.776 0v4.277ZM54.277 14.572a4.844 4.844 0 1 1 0-9.688 4.846 4.846 0 0 1 3.426 8.272 4.83 4.83 0 0 1-3.426 1.416Zm0-8.688a3.845 3.845 0 1 0 2.719 6.565 3.845 3.845 0 0 0-2.718-6.565h-.001ZM9.723 59.116a4.846 4.846 0 1 1 3.425-1.42l-.353-.353.354.354a4.813 4.813 0 0 1-3.426 1.419Zm0-8.688a3.844 3.844 0 1 0 0 7.688 3.845 3.845 0 0 0 0-7.688ZM54.27 59.12a4.828 4.828 0 0 1-3.426-1.417 4.845 4.845 0 0 1 3.427-8.27 4.844 4.844 0 0 1 0 9.687Zm-2.719-2.124a3.845 3.845 0 1 0 2.72-6.564 3.845 3.845 0 0 0-2.72 6.564ZM9.73 14.568h-.001a4.845 4.845 0 1 1 0-9.691 4.845 4.845 0 0 1 0 9.69Zm0-8.688a3.844 3.844 0 0 0-.001 7.688 3.844 3.844 0 0 0 0-7.688Z'
          fill='#fff'
        />
        <path
          d='m57.524 51.304-.797-.603A30.729 30.729 0 0 0 63 32c0-5.03-1.222-9.984-3.56-14.437l.885-.467A32.073 32.073 0 0 1 64 32a31.72 31.72 0 0 1-6.476 19.304ZM32 64a31.713 31.713 0 0 1-19.304-6.476l.604-.797A30.728 30.728 0 0 0 32 63a31.06 31.06 0 0 0 14.633-3.664l.472.881A32.057 32.057 0 0 1 32 64ZM3.778 47.097A32.055 32.055 0 0 1 0 32a31.714 31.714 0 0 1 6.476-19.304l.797.604A30.728 30.728 0 0 0 1 32a31.056 31.056 0 0 0 3.66 14.624l-.882.473ZM50.715 7.285A30.726 30.726 0 0 0 32 1a31.052 31.052 0 0 0-14.562 3.626l-.47-.882A32.06 32.06 0 0 1 32 0a31.72 31.72 0 0 1 19.32 6.488l-.605.797Z'
          fill='#fff'
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

SvgCyberLockWhite64.displayName = 'SvgCyberLockWhite64'
export default SvgCyberLockWhite64
