import React, { forwardRef, Ref } from 'react'
import { StandardProps } from '@toptal/picasso-shared'

const SIZE = 64

type ScaleType = 1 | 2
export interface Props extends StandardProps {
  scale?: ScaleType
  base?: number
}
const SvgConsumerElectronicsBlue64 = forwardRef(
  function SvgConsumerElectronicsBlue64(props: Props, ref: Ref<SVGSVGElement>) {
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
          d='M48.78 38.773v6.483a10.733 10.733 0 1 0-19.29-6.483h19.29ZM12.286 57.39a6.834 6.834 0 1 0 0-13.67 6.834 6.834 0 0 0 0 13.67ZM36.995 57.39a6.834 6.834 0 1 0 0-13.67 6.834 6.834 0 0 0 0 13.67Z'
          fill='#183A9E'
        />
        <path
          d='M64 61.96H48.78v-1H63V3.04H17.453v35.735h-1V2.039H64V61.96Z'
          fill='#204ECF'
        />
        <path
          d='M63.5 15.586H16.953v1H63.5v-1ZM12.286 57.89a7.334 7.334 0 1 1 7.334-7.335 7.342 7.342 0 0 1-7.334 7.334Zm0-13.67a6.334 6.334 0 1 0 6.334 6.335 6.34 6.34 0 0 0-6.334-6.334ZM36.995 57.89a7.335 7.335 0 1 1 7.334-7.335 7.342 7.342 0 0 1-7.334 7.334Zm0-13.67a6.334 6.334 0 1 0 6.334 6.335 6.34 6.34 0 0 0-6.334-6.334Z'
          fill='#204ECF'
        />
        <path
          d='m49.048 52.82-.533-.845a15.577 15.577 0 1 0-23.865-13.19h-1A16.577 16.577 0 1 1 49.048 52.82Z'
          fill='#204ECF'
        />
        <path
          d='M49.28 61.961H0V38.274h45.97L4.899 23.178l.345-.939L49.28 38.424v23.537Zm-48.28-1h47.28V39.274H1V60.96Z'
          fill='#204ECF'
        />
      </svg>
    )
  }
)

SvgConsumerElectronicsBlue64.displayName = 'SvgConsumerElectronicsBlue64'
export default SvgConsumerElectronicsBlue64
