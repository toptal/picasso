import type { Ref } from 'react'
import React, { forwardRef } from 'react'
import type { StandardProps } from '@toptal/picasso-shared'

const SIZE = 64

type ScaleType = 1 | 2
export interface Props extends StandardProps {
  scale?: ScaleType
  base?: number
}
const SvgShareBlue64 = forwardRef(function SvgShareBlue64(
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
          fill='#183A9E'
          d='M60.31 58.069H10.071v5.43H60.31v-5.43ZM48.773.5v11.536h11.536'
          opacity={0.15}
        />
        <path
          fill='#204ECF'
          d='M60.309 12.537H48.272V.5h1v11.037h11.037v1ZM33.103 11.537H19.051v1h14.052v-1ZM48.772 21.08H31.326v1h17.446v-1ZM48.772 27.648h-13.96v1h13.96v-1ZM48.772 34.216H35.07v1h13.703v-1ZM48.772 40.785H32.316v1h16.456v-1Z'
        />
        <path
          fill='#204ECF'
          d='M60.809 64H9.572V44.662h1V63h49.237V12.244L48.565 1H10.572v18.338h-1V0h39.407l11.83 11.83V64Z'
        />
        <path
          fill='#204ECF'
          d='M16.37 29.667a3.216 3.216 0 1 1 0-6.431 3.216 3.216 0 0 1 0 6.431Zm0-5.431a2.214 2.214 0 1 0-.001 4.429 2.214 2.214 0 0 0 .002-4.43ZM16.37 41.818a3.216 3.216 0 1 1 0-6.433 3.216 3.216 0 0 1 0 6.433Zm0-5.431a2.215 2.215 0 1 0 0 4.43 2.215 2.215 0 0 0 0-4.43ZM25.748 35.743a3.216 3.216 0 1 1 0-6.433 3.216 3.216 0 0 1 0 6.433Zm0-5.432a2.216 2.216 0 1 0 .001 4.433 2.216 2.216 0 0 0-.001-4.433Z'
        />
        <path
          fill='#204ECF'
          d='m18.92 27.508-.543.839 4.822 3.124.543-.839-4.822-3.124ZM23.2 33.584l-4.824 3.122.543.84 4.824-3.123-.543-.839Z'
        />
        <path
          fill='#204ECF'
          d='M19.492 48.352a16.3 16.3 0 1 1 16.3-16.3 16.32 16.32 0 0 1-16.3 16.3Zm0-31.602a15.3 15.3 0 1 0 15.3 15.301 15.319 15.319 0 0 0-15.3-15.301Z'
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

SvgShareBlue64.displayName = 'SvgShareBlue64'
export default SvgShareBlue64
