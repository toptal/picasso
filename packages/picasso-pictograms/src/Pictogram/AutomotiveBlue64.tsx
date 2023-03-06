import React, { forwardRef, Ref } from 'react'
import { StandardProps } from '@toptal/picasso-shared'

const SIZE = 64

type ScaleType = 1 | 2
export interface Props extends StandardProps {
  scale?: ScaleType
  base?: number
}
const SvgAutomotiveBlue64 = forwardRef(function SvgAutomotiveBlue64(
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
          d='M60.211 23.736H3.789l7.499-13.404a9 9 0 0 1 7.854-4.606h25.716a9 9 0 0 1 7.854 4.606l7.499 13.404ZM49.719 49.276H63.5v5.622a3.375 3.375 0 0 1-3.375 3.375h-7.031a3.375 3.375 0 0 1-3.375-3.375v-5.622ZM13.719 33.673H50.28v3.826a3.826 3.826 0 0 1-3.826 3.827h-28.91a3.826 3.826 0 0 1-3.826-3.827v-3.826ZM.5 49.276h13.781v5.622a3.375 3.375 0 0 1-3.375 3.375H3.875A3.375 3.375 0 0 1 .5 54.898v-5.622Z'
          fill='#183A9E'
        />
        <path
          d='m59.774 23.98-7.498-13.403a8.508 8.508 0 0 0-7.418-4.35H19.142a8.508 8.508 0 0 0-7.418 4.35L4.226 23.98l-.873-.488 7.498-13.404a9.51 9.51 0 0 1 8.291-4.862h25.716a9.51 9.51 0 0 1 8.29 4.862l7.5 13.404-.874.488Z'
          fill='#204ECF'
        />
        <path
          d='M64 49.776H0V27.111a3.88 3.88 0 0 1 3.875-3.875h56.25A3.879 3.879 0 0 1 64 27.111v22.665Zm-63-1h62V27.111a2.878 2.878 0 0 0-2.875-2.875H3.875A2.878 2.878 0 0 0 1 27.111v21.665Z'
          fill='#204ECF'
        />
        <path
          d='M10.906 58.773H3.875A3.879 3.879 0 0 1 0 54.898v-6.122h14.781v6.122a3.88 3.88 0 0 1-3.875 3.875ZM1 49.776v5.122a2.878 2.878 0 0 0 2.875 2.875h7.031a2.878 2.878 0 0 0 2.875-2.875v-5.122H1ZM60.125 58.773h-7.031a3.879 3.879 0 0 1-3.875-3.875v-6.122H64v6.122a3.88 3.88 0 0 1-3.875 3.875Zm-9.906-8.997v5.122a2.878 2.878 0 0 0 2.875 2.875h7.031A2.878 2.878 0 0 0 63 54.898v-5.122H50.219ZM46.455 41.826h-28.91a4.331 4.331 0 0 1-4.326-4.327v-4.326H50.78v4.326a4.33 4.33 0 0 1-4.326 4.327ZM14.22 34.173v3.326a3.33 3.33 0 0 0 3.326 3.327h28.91a3.33 3.33 0 0 0 3.326-3.327v-3.326H14.22Z'
          fill='#204ECF'
        />
        <path
          d='M14.219 33.613h-1a3.27 3.27 0 0 0-3.267-3.267H.5v-1h9.452a4.272 4.272 0 0 1 4.267 4.267ZM13.719 37.999H4.267A4.272 4.272 0 0 1 0 33.732h1a3.27 3.27 0 0 0 3.267 3.267h9.452v1ZM50.781 33.613h-1a4.272 4.272 0 0 1 4.267-4.267H63.5v1h-9.452a3.27 3.27 0 0 0-3.267 3.267ZM59.733 37.999H50.28v-1h9.452A3.27 3.27 0 0 0 63 33.732h1a4.271 4.271 0 0 1-4.267 4.267Z'
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

SvgAutomotiveBlue64.displayName = 'SvgAutomotiveBlue64'
export default SvgAutomotiveBlue64
