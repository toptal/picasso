import type { Ref } from 'react'
import React, { forwardRef } from 'react'
import type { StandardProps } from '@toptal/picasso-shared'

const SIZE = 64

type ScaleType = 1 | 2
export interface Props extends StandardProps {
  scale?: ScaleType
  base?: number
}
const SvgPeopleReferralInviteEmptyStateWhite64 = forwardRef(
  function SvgPeopleReferralInviteEmptyStateWhite64(
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
            d='M17.376 21.796c5.523 0 10-4.477 10-10s-4.477-10-10-10-10 4.477-10 10 4.477 10 10 10ZM13 40.2H9l8-7.2 6.02 5.416c5.164-4.48 3.624-15.04-5.12-15.4a20.434 20.434 0 0 0-.7-.016c-9.388 0-17 7.788-17 17.396H13V40.2Zm33.8-2.696c-9.388 0-17 7.744-17 17.296h17.168c11.184 0 11.708-16.824.536-17.284a20.423 20.423 0 0 0-.7-.016l-.004.004Z'
            opacity={0.3}
          />
          <path
            stroke='#fff'
            strokeMiterlimit={10}
            d='M29.8 54.7c0-9.552 7.612-17.296 17-17.296s17 7.744 17 17.296'
          />
          <path
            fill='#231F20'
            d='M47.012 36.168c5.51 0 9.976-4.473 9.976-9.992 0-5.518-4.466-9.992-9.976-9.992-5.51 0-9.976 4.474-9.976 9.992 0 5.519 4.466 9.992 9.976 9.992Z'
            opacity={0.3}
          />
          <path
            stroke='#fff'
            strokeMiterlimit={10}
            d='M47.012 36.168c5.51 0 9.976-4.473 9.976-9.992 0-5.518-4.466-9.992-9.976-9.992-5.51 0-9.976 4.474-9.976 9.992 0 5.519 4.466 9.992 9.976 9.992ZM.2 40.396C.2 30.788 7.812 23 17.2 23s17 7.788 17 17.396m-16.824-18.6c5.523 0 10-4.477 10-10s-4.477-10-10-10-10 4.477-10 10 4.477 10 10 10Z'
          />
          <path
            stroke='#fff'
            strokeMiterlimit={10}
            d='M34.492 62.392c-7.808-1.492-13.448-8.284-13.448-16.188l-.04-6.004h4l-8-7.2-8 7.2h4l.04 7.116c0 9.104 7.42 16.484 16.576 16.484h12.248l-7.376-1.408Z'
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

SvgPeopleReferralInviteEmptyStateWhite64.displayName =
  'SvgPeopleReferralInviteEmptyStateWhite64'
export default SvgPeopleReferralInviteEmptyStateWhite64
