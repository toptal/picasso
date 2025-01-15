import type { Ref } from 'react'
import React, { forwardRef } from 'react'
import type { StandardProps } from '@toptal/picasso-shared'

const SIZE = 64

type ScaleType = 1 | 2
export interface Props extends StandardProps {
  scale?: ScaleType
  base?: number
}
const SvgScanHeatmapSiteResearchTestBlue64 = forwardRef(
  function SvgScanHeatmapSiteResearchTestBlue64(
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
        viewBox='0 0 64 65'
        className={className}
        style={svgStyle}
        ref={ref}
        data-testid={testId}
      >
        <g clipPath='url(#a)'>
          <path
            fill='#183A9C'
            d='M31.5 61.533a6 6 0 1 0 0-12 6 6 0 0 0 0 12Zm23.5-37.5H22v8h33v-8Z'
            opacity={0.15}
          />
          <path
            fill='#183A9C'
            d='M20 50.033v-5h31.17l1.19-3H20v-5h34.35l1.19-3H20v-12h37v8.34l5.5-13.84H.5L6 30.353v-8.32h11v28h-3.16l2.19 5.5a19.18 19.18 0 0 1 6.08-5.5H20Z'
            opacity={0.15}
          />
          <path
            fill='#183A9C'
            d='M15 24.033H8v11.34l5.04 12.66H15v-24Zm25.89 26a19.18 19.18 0 0 1 6.08 5.5H47l2.19-5.5h-8.3Zm-18.89-10h31.16l.4-1H22v1Zm28.38 7H22v1h5.19c1.38-.32 2.83-.5 4.31-.5 1.48 0 2.92.18 4.31.5h14.17l.4-1Z'
            opacity={0.15}
          />
          <path
            stroke='#204ECD'
            strokeMiterlimit={10}
            d='M12 55.533H2.5c-1.1 0-2-.9-2-2v-43c0-1.1.9-2 2-2h58c1.1 0 2 .9 2 2v43c0 1.1-.9 2-2 2H51m-50.5-39h62m-59-4h2m1.5 0h2m1.5 0h2'
          />
          <path
            stroke='#204ECD'
            strokeMiterlimit={10}
            d='M31.5 47.533c-6.39 0-12.03 3.16-15.47 8 3.44 4.84 9.08 8 15.47 8 6.39 0 12.03-3.16 15.47-8-3.44-4.84-9.08-8-15.47-8Z'
          />
          <path
            stroke='#204ECD'
            strokeMiterlimit={10}
            d='M31.5 61.533a6 6 0 1 0 0-12 6 6 0 0 0 0 12Z'
          />
          <path
            stroke='#204ECD'
            strokeMiterlimit={10}
            d='m29 56.033 1.5 1.5 3.5-3.5'
          />
        </g>
        <defs>
          <clipPath id='a'>
            <path fill='#fff' d='M0 .033h64v64H0z' />
          </clipPath>
        </defs>
      </svg>
    )
  }
)

SvgScanHeatmapSiteResearchTestBlue64.displayName =
  'SvgScanHeatmapSiteResearchTestBlue64'
export default SvgScanHeatmapSiteResearchTestBlue64
