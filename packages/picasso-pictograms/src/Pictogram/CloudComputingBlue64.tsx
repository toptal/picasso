import React, { forwardRef, Ref } from 'react'
import { StandardProps } from '@toptal/picasso-shared'

const SIZE = 64

type ScaleType = 1 | 2
export interface Props extends StandardProps {
  scale?: ScaleType
  base?: number
}
const SvgCloudComputingBlue64 = forwardRef(function SvgCloudComputingBlue64(
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
      viewBox='0 0 70 64'
      fill='none'
      className={className}
      style={svgStyle}
      ref={ref}
      data-testid={testId}
    >
      <g clipPath='url(#a)'>
        <path
          opacity={0.15}
          d='M24.075 37.245H2.641a11.6 11.6 0 0 0 9.48 4.916h11.954v-4.916ZM45.936 37.245v4.916h11.766a11.6 11.6 0 0 0 9.48-4.916H45.936ZM34.906 46.907a4.746 4.746 0 1 0 0-9.493 4.746 4.746 0 0 0 0 9.493Z'
          fill='#183A9E'
        />
        <path
          d='M46.343 53.573H23.52V30.748h22.824v22.825Zm-21.824-1h20.824V31.748H24.52v20.825Z'
          fill='#204ECF'
        />
        <path
          d='M29.975 20.82h-1v10.428h1V20.821ZM40.887 20.82h-1v10.428h1V20.821ZM29.975 53.073h-1V63.5h1V53.073ZM40.887 53.073h-1V63.5h1V53.073ZM56.27 36.204H45.843v1H56.27v-1ZM56.27 47.117H45.843v1H56.27v-1ZM24.019 36.204H13.59v1H24.02v-1ZM24.019 47.117H13.59v1H24.02v-1Z'
          fill='#204ECF'
        />
        <path
          d='M57.701 42.66h-1.43v-1h1.418a11.117 11.117 0 0 0 .925-22.197l-.48-.04.02-.48c.012-.255.02-.51.02-.767a17.179 17.179 0 0 0-32.97-6.755l-.195.453-.455-.188a8.742 8.742 0 0 0-12.022 7.28l-.042.451-.452.004a11.12 11.12 0 0 0 .084 22.24h1.43v1h-1.43a12.12 12.12 0 0 1-.536-24.229 9.745 9.745 0 0 1 12.893-7.844 18.178 18.178 0 0 1 34.69 7.926 12.117 12.117 0 0 1-1.468 24.147Z'
          fill='#204ECF'
        />
      </g>
      <defs>
        <clipPath id='a'>
          <path fill='#fff' d='M0 0h69.823v64H0z' />
        </clipPath>
      </defs>
    </svg>
  )
})

SvgCloudComputingBlue64.displayName = 'SvgCloudComputingBlue64'
export default SvgCloudComputingBlue64
