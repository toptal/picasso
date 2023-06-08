import type { Ref } from 'react'
import React, { forwardRef } from 'react'
import type { StandardProps } from '@toptal/picasso-shared'

const SIZE = 64

type ScaleType = 1 | 2
export interface Props extends StandardProps {
  scale?: ScaleType
  base?: number
}
const SvgBuildingBlocksWhite64 = forwardRef(function SvgBuildingBlocksWhite64(
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
          d='M54.575 54.274H.5V63.5h54.075v-9.226ZM54.575 36.462H.5v9.013h54.075v-9.013ZM36.55 18.525H.5v8.925h36.05v-8.925ZM63.5 9.425H45.475v9.1H63.5v-9.1Z'
          opacity={0.3}
        />
        <path
          fill='#fff'
          d='M19.025 64H0V44.975h19.025V64ZM1 63h17.025V45.975H1V63Z'
        />
        <path
          fill='#fff'
          d='M37.05 64H18.025V44.975H37.05V64Zm-18.025-1H36.05V45.975H19.025V63Z'
        />
        <path
          fill='#fff'
          d='M55.075 64H36.05V44.975h19.025V64ZM37.05 63h17.025V45.975H37.05V63ZM19.025 45.975H0V26.95h19.025v19.025ZM1 44.975h17.025V27.95H1v17.025Z'
        />
        <path
          fill='#fff'
          d='M37.05 45.975H18.025V26.95H37.05v19.025Zm-18.025-1H36.05V27.95H19.025v17.025Z'
        />
        <path
          fill='#fff'
          d='M55.075 45.975H36.05V26.95h19.025v19.025Zm-18.025-1h17.025V27.95H37.05v17.025ZM19.025 27.95H0V8.925h19.025V27.95ZM1 26.95h17.025V9.925H1V26.95Z'
        />
        <path
          fill='#fff'
          d='M37.05 27.95H18.025V8.925H37.05V27.95Zm-18.025-1H36.05V9.925H19.025V26.95ZM64 19.025H44.975V0H64v19.025Zm-18.025-1H63V1H45.975v17.025Z'
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

SvgBuildingBlocksWhite64.displayName = 'SvgBuildingBlocksWhite64'
export default SvgBuildingBlocksWhite64
