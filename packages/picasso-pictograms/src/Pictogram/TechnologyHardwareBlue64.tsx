import type { Ref } from 'react'
import React, { forwardRef } from 'react'
import type { StandardProps } from '@toptal/picasso-shared'

const SIZE = 64

type ScaleType = 1 | 2
export interface Props extends StandardProps {
  scale?: ScaleType
  base?: number
}
const SvgTechnologyHardwareBlue64 = forwardRef(
  function SvgTechnologyHardwareBlue64(props: Props, ref: Ref<SVGSVGElement>) {
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
            fill='#183A9E'
            d='M55.748 5.931H8.253A2.321 2.321 0 0 0 5.93 8.252v47.495a2.322 2.322 0 0 0 2.322 2.322h47.495a2.321 2.321 0 0 0 2.321-2.322V8.252a2.321 2.321 0 0 0-2.322-2.32ZM52.16 38.978l-3.54 3.541v8.385H15.38V42.52l-3.54-3.54V26.631l3.54-3.539v-9.997h33.24v9.997l3.54 3.54v12.345Z'
            opacity={0.15}
          />
          <path
            fill='#204ECF'
            d='M55.748 58.569H8.252a2.824 2.824 0 0 1-2.82-2.821V8.252a2.825 2.825 0 0 1 2.82-2.82h47.496a2.824 2.824 0 0 1 2.82 2.82v47.496a2.825 2.825 0 0 1-2.82 2.82ZM8.252 6.43a1.823 1.823 0 0 0-1.82 1.821v47.496a1.823 1.823 0 0 0 1.82 1.82h47.496a1.823 1.823 0 0 0 1.82-1.82V8.252a1.823 1.823 0 0 0-1.82-1.82H8.252Z'
          />
          <path
            fill='#204ECF'
            d='M49.121 51.404H14.879v-8.678l-3.539-3.54v-12.76l3.539-3.54v-9.79h1V23.3l-3.539 3.54v11.932l3.539 3.54v8.092h32.242v-8.092l3.539-3.54V26.84L48.121 23.3V13.096h1v9.79l3.539 3.54v12.76l-3.539 3.54v8.678Z'
          />
          <path
            fill='#204ECF'
            d='M44.448 44.476H19.552V19.579h24.896v24.897Zm-23.896-1h22.896V20.579H20.552v22.897ZM63.5 18.465h-5.431v1H63.5v-1ZM63.5 27.155h-5.431v1H63.5v-1ZM63.5 35.845h-5.431v1H63.5v-1ZM63.5 44.535h-5.431v1H63.5v-1ZM5.931 18.465H.5v1h5.431v-1ZM5.931 27.155H.5v1h5.431v-1ZM5.931 35.845H.5v1h5.431v-1ZM5.931 44.535H.5v1h5.431v-1ZM45.535 58.069h-1V63.5h1v-5.431ZM36.845 58.069h-1V63.5h1v-5.431ZM28.155 58.069h-1V63.5h1v-5.431ZM19.465 58.069h-1V63.5h1v-5.431ZM45.535.5h-1v5.431h1V.5ZM36.845.5h-1v5.431h1V.5ZM28.155.5h-1v5.431h1V.5ZM19.465.5h-1v5.431h1V.5Z'
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

SvgTechnologyHardwareBlue64.displayName = 'SvgTechnologyHardwareBlue64'
export default SvgTechnologyHardwareBlue64
