import React, { forwardRef, Ref } from 'react'
import { StandardProps } from '@toptal/picasso-shared'

const SIZE = 64

type ScaleType = 1 | 2
export interface Props extends StandardProps {
  scale?: ScaleType
  base?: number
}
const SvgEntertainmentBlue64 = forwardRef(function SvgEntertainmentBlue64(
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
      <path
        opacity={0.15}
        d='M13.547 37.596V25.524H7.46a6.053 6.053 0 0 1 6.088-6.088V1.428H.5v36.168A24.997 24.997 0 0 0 32 61.712L32 61.706a24.983 24.983 0 0 1-18.452-24.11ZM50.453 37.596a11.931 11.931 0 0 1-20.373 8.45 11.93 11.93 0 0 1-3.486-8.45h23.86Z'
        fill='#183A9E'
      />
      <path
        opacity={0.15}
        d='M32.682 25.524a6.086 6.086 0 0 0-10.395-4.31 6.087 6.087 0 0 0-1.78 4.31h12.175ZM56.54 25.524a6.088 6.088 0 0 0-12.175 0h12.176Z'
        fill='#183A9E'
      />
      <path
        d='M38.523 63.072a25.505 25.505 0 0 1-25.476-25.476V.928H64v36.668a25.505 25.505 0 0 1-25.477 25.476ZM14.047 1.928v35.668a24.476 24.476 0 0 0 48.953 0V1.928H14.047Z'
        fill='#204ECF'
      />
      <path
        d='M38.524 50.025a12.444 12.444 0 0 1-12.43-12.43v-.5h24.86v.5a12.444 12.444 0 0 1-12.43 12.43Zm-11.42-11.93a11.43 11.43 0 0 0 22.839 0H27.105ZM33.182 26.024H20.006v-.5a6.588 6.588 0 0 1 13.176 0v.5Zm-12.154-1H32.16a5.588 5.588 0 0 0-11.131 0ZM13.547 26.024H6.96v-.5a6.595 6.595 0 0 1 6.587-6.588v1a5.595 5.595 0 0 0-5.565 5.088h5.565v1ZM57.04 26.024H43.866v-.5a6.587 6.587 0 0 1 13.176 0v.5Zm-12.153-1H56.02a5.588 5.588 0 0 0-11.132 0Z'
        fill='#204ECF'
      />
      <path
        d='M25.477 63.072A25.505 25.505 0 0 1 0 37.596V.928h13.547v1H1v35.668a24.498 24.498 0 0 0 30.87 23.633l.261.966c-2.17.583-4.407.878-6.654.877Z'
        fill='#204ECF'
      />
    </svg>
  )
})

SvgEntertainmentBlue64.displayName = 'SvgEntertainmentBlue64'
export default SvgEntertainmentBlue64
