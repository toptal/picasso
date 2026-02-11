import type { Ref } from 'react'
import React, { forwardRef } from 'react'
import type { StandardProps } from '@toptal/picasso-shared'

const SIZE = 64

type ScaleType = 1 | 2
export interface Props extends StandardProps {
  scale?: ScaleType
  base?: number
}
const SvgCalendarDateAvailableWhite64 = forwardRef(
  function SvgCalendarDateAvailableWhite64(
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
            fill='#000'
            d='m36 47 3-3 4 4 9-9.13L55 42 43 54l-7-7Z'
            opacity={0.3}
          />
          <path
            stroke='#fff'
            strokeMiterlimit={10}
            d='m36 47 3-3 4 4 9-9.13L55 42 43 54l-7-7Z'
          />
          <path
            fill='#000'
            d='M27.68 45.35c0 3.99 1.33 7.68 3.56 10.65H9.93l20.19-20.29s-2.44 3.49-2.44 9.64ZM53.5 6H47v6h-4V6H14v6h-4V6H3.5A2.5 2.5 0 0 0 1 8.5V18h55V8.5A2.5 2.5 0 0 0 53.5 6Z'
            opacity={0.3}
          />
          <path
            stroke='#fff'
            strokeMiterlimit={10}
            d='M31 56.5H3.47A2.97 2.97 0 0 1 .5 53.53V8.47A2.97 2.97 0 0 1 3.47 5.5H10M47 5.5h6.53a2.97 2.97 0 0 1 2.97 2.97V31M14 5.5h29'
          />
          <path
            fill='#fff'
            d='M13 1v10h-2V1h2Zm1-1h-4v12h4V0ZM46 1v10h-2V1h2Zm1-1h-4v12h4V0Z'
          />
          <path
            stroke='#fff'
            strokeMiterlimit={10}
            d='M45.5 63.5c9.941 0 18-8.059 18-18s-8.059-18-18-18-18 8.059-18 18 8.059 18 18 18Z'
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

SvgCalendarDateAvailableWhite64.displayName = 'SvgCalendarDateAvailableWhite64'
export default SvgCalendarDateAvailableWhite64
