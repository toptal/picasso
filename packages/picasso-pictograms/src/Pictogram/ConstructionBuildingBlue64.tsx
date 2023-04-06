import type { Ref } from 'react'
import React, { forwardRef } from 'react'
import type { StandardProps } from '@toptal/picasso-shared'

const SIZE = 64

type ScaleType = 1 | 2
export interface Props extends StandardProps {
  scale?: ScaleType
  base?: number
}
const SvgConstructionBuildingBlue64 = forwardRef(
  function SvgConstructionBuildingBlue64(
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
            d='M58.069 47.107v-9.871H45.5v9.871H9.499l.001 8.197h-9V63.5h63V47.107h-5.431Z'
            fill='#183A9E'
          />
          <path
            d='M19 64H0v-9.196h19V64ZM1 63h17v-7.196H1V63Z'
            fill='#204ECF'
          />
          <path
            d='M37 64H18v-9.196h19V64Zm-18-1h17v-7.196H19V63Z'
            fill='#204ECF'
          />
          <path
            d='M55 64H36v-9.196h19V64Zm-18-1h17v-7.196H37V63Z'
            fill='#204ECF'
          />
          <path
            d='M64 64H54v-9.196h10V64Zm-9-1h8v-7.196h-8V63ZM28 55.804H9v-9.197h19v9.197Zm-18-1h17v-7.197H10v7.197Z'
            fill='#204ECF'
          />
          <path
            d='M46 55.804H27v-9.197h19v9.197Zm-18-1h17v-7.197H28v7.197Z'
            fill='#204ECF'
          />
          <path
            d='M64 55.804H45v-9.197h19v9.197Zm-18-1h17v-7.197H46v7.197Z'
            fill='#204ECF'
          />
          <path d='M46 .5h-1v48.055h1V.5Z' fill='#204ECF' />
          <path
            d='M58.57 47.107h-1V1H45.578L8.875 12.813v7.705h-.5a4.986 4.986 0 1 0 4.987 4.986h1a5.986 5.986 0 1 1-6.487-5.965v-7.455L45.5 0h13.07v47.107Z'
            fill='#204ECF'
          />
          <path d='M58.07 11.948H8.375v1H58.07v-1Z' fill='#204ECF' />
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

SvgConstructionBuildingBlue64.displayName = 'SvgConstructionBuildingBlue64'
export default SvgConstructionBuildingBlue64
