import type { Ref } from 'react'
import React, { forwardRef } from 'react'
import type { StandardProps } from '@toptal/picasso-shared'

const SIZE = 64

type ScaleType = 1 | 2
export interface Props extends StandardProps {
  scale?: ScaleType
  base?: number
}
const SvgCommunicationWhite64 = forwardRef(function SvgCommunicationWhite64(
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
        opacity={0.3}
        d='M50.939 50.939a6.221 6.221 0 1 0 0-12.443 6.221 6.221 0 0 0 0 12.443ZM11.393.5v24.619l7.599-7.599h7.179V9.553h11.658V.5H11.393ZM50.939 50.939A12.562 12.562 0 0 0 38.378 63.5H63.5A12.562 12.562 0 0 0 50.939 50.94Z'
        fill='#231F20'
      />
      <path
        d='M13.061 51.44a6.721 6.721 0 1 1 6.721-6.722 6.73 6.73 0 0 1-6.721 6.721Zm0-12.443a5.72 5.72 0 1 0 0 11.441 5.72 5.72 0 0 0 0-11.441Z'
        fill='#fff'
      />
      <path
        d='M26.122 63.5h-1A12.06 12.06 0 1 0 1 63.5H0a13.06 13.06 0 1 1 26.122 0ZM50.939 51.44a6.722 6.722 0 1 1 6.721-6.722 6.73 6.73 0 0 1-6.721 6.721Zm0-12.443a5.722 5.722 0 1 0 5.721 5.72 5.728 5.728 0 0 0-5.721-5.72Z'
        fill='#fff'
      />
      <path
        d='M64 63.5h-1a12.06 12.06 0 1 0-24.122 0h-1A13.061 13.061 0 0 1 64 63.5ZM53.107 34.294 44.8 25.987H25.67V9.053h27.436v25.24ZM26.67 24.987h18.545l6.892 6.893V10.052H26.67v14.934Z'
        fill='#fff'
      />
      <path
        d='M10.893 26.326V0H38.33v9.553h-1V1H11.893v22.912l6.892-6.892h7.385v1h-6.971l-8.306 8.306Z'
        fill='#fff'
      />
    </svg>
  )
})

SvgCommunicationWhite64.displayName = 'SvgCommunicationWhite64'
export default SvgCommunicationWhite64
