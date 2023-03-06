import React, { forwardRef, Ref } from 'react'
import { StandardProps } from '@toptal/picasso-shared'

const SIZE = 64

type ScaleType = 1 | 2
export interface Props extends StandardProps {
  scale?: ScaleType
  base?: number
}
const SvgLightningBlue64 = forwardRef(function SvgLightningBlue64(
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
          d='M48.869 27.008H32V.5L15.131 36.992H32V63.5l16.869-36.492Z'
          fill='#183A9E'
        />
        <path
          d='m32.39 63.85-.454-.056a.55.55 0 0 1-.436-.542v-25.76H14.35L31.652.06l.822.156.026.433v25.858h17.15L32.39 63.85Zm-.74-.786v.002-.002ZM15.913 36.492H32.5v24.735l15.587-33.719H31.5V2.773L15.913 36.492Z'
          fill='#204ECF'
        />
        <path
          d='M32 64a32 32 0 1 1 32-32 32.036 32.036 0 0 1-32 32Zm0-63a31 31 0 1 0 31 31A31.036 31.036 0 0 0 32 1Z'
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

SvgLightningBlue64.displayName = 'SvgLightningBlue64'
export default SvgLightningBlue64
