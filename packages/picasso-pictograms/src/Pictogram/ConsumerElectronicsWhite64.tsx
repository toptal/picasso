import type { Ref } from 'react'
import React, { forwardRef } from 'react'
import type { StandardProps } from '@toptal/picasso-shared'

const SIZE = 64

type ScaleType = 1 | 2
export interface Props extends StandardProps {
  scale?: ScaleType
  base?: number
}
const SvgConsumerElectronicsWhite64 = forwardRef(
  function SvgConsumerElectronicsWhite64(
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
            fill='#231F20'
            d='M48.78 38.773v6.483a10.732 10.732 0 1 0-19.29-6.483h19.29ZM12.286 57.39a6.834 6.834 0 1 0 0-13.67 6.834 6.834 0 0 0 0 13.67ZM36.995 57.39a6.834 6.834 0 1 0 0-13.67 6.834 6.834 0 0 0 0 13.67Z'
            opacity={0.3}
          />
          <path
            fill='#fff'
            d='M64 61.96H48.78v-1H63V3.04H17.453v35.735h-1V2.039H64V61.96Z'
          />
          <path
            fill='#fff'
            d='M63.5 15.586H16.953v1H63.5v-1ZM12.286 57.89a7.334 7.334 0 1 1 7.334-7.335 7.342 7.342 0 0 1-7.334 7.334Zm0-13.67a6.334 6.334 0 1 0 6.334 6.335 6.341 6.341 0 0 0-6.334-6.334ZM36.995 57.89a7.335 7.335 0 1 1 7.334-7.335 7.343 7.343 0 0 1-7.334 7.334Zm0-13.67a6.334 6.334 0 1 0 6.334 6.335 6.341 6.341 0 0 0-6.334-6.334Z'
          />
          <path
            fill='#fff'
            d='m49.049 52.82-.534-.845a15.578 15.578 0 1 0-23.864-13.19h-1A16.577 16.577 0 1 1 49.049 52.82Z'
          />
          <path
            fill='#fff'
            d='M49.28 61.961H0V38.274h45.97L4.899 23.178l.345-.939 44.038 16.185v23.537Zm-48.28-1h47.28V39.274H1V60.96Z'
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

SvgConsumerElectronicsWhite64.displayName = 'SvgConsumerElectronicsWhite64'
export default SvgConsumerElectronicsWhite64
