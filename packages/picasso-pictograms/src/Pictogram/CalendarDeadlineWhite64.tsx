import React, { forwardRef, Ref } from 'react'
import { StandardProps } from '@toptal/picasso-shared'

const SIZE = 64

type ScaleType = 1 | 2
export interface Props extends StandardProps {
  scale?: ScaleType
  base?: number
}
const SvgCalendarDeadlineWhite64 = forwardRef(
  function SvgCalendarDeadlineWhite64(props: Props, ref: Ref<SVGSVGElement>) {
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
            opacity={0.3}
            d='M29.14 22h-7.728v7.73h7.729V22ZM42.588 22h-7.729v7.73h7.729V22ZM56.035 22h-7.728v7.73h7.728V22ZM15.693 35.448H7.965v7.729h7.728v-7.729ZM29.14 35.448h-7.728v7.729h7.729v-7.729ZM42.588 35.448h-7.729v7.729h7.729v-7.729ZM56.035 35.448h-7.728v7.729h7.728v-7.729ZM15.693 48.895H7.965v7.73h7.728v-7.73ZM29.14 48.895h-7.728v7.73h7.729v-7.73ZM42.588 48.895h-7.729v7.73h7.729v-7.73Z'
            fill='#231F20'
          />
          <path
            d='M60.688 64H3.312A3.316 3.316 0 0 1 0 60.687V8a3.316 3.316 0 0 1 3.313-3.313h57.374A3.316 3.316 0 0 1 64 8v52.688A3.315 3.315 0 0 1 60.687 64ZM3.312 5.687A2.315 2.315 0 0 0 1 8v52.688A2.315 2.315 0 0 0 3.313 63h57.374A2.315 2.315 0 0 0 63 60.687V8a2.315 2.315 0 0 0-2.313-2.313H3.313Z'
            fill='#fff'
          />
          <path
            d='M63.5 14.586H.5v1h63v-1ZM43.088 43.677h-8.729v-8.729h8.729v8.729Zm-7.729-1h6.729v-6.729h-6.729v6.729ZM16.164 0h-1v10.375h1V0ZM48.836 0h-1v10.375h1V0Z'
            fill='#fff'
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

SvgCalendarDeadlineWhite64.displayName = 'SvgCalendarDeadlineWhite64'
export default SvgCalendarDeadlineWhite64
