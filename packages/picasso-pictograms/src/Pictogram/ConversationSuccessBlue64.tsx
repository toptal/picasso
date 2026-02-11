import type { Ref } from 'react'
import React, { forwardRef } from 'react'
import type { StandardProps } from '@toptal/picasso-shared'

const SIZE = 64

type ScaleType = 1 | 2
export interface Props extends StandardProps {
  scale?: ScaleType
  base?: number
}
const SvgConversationSuccessBlue64 = forwardRef(
  function SvgConversationSuccessBlue64(props: Props, ref: Ref<SVGSVGElement>) {
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
            fill='#183A9C'
            d='M55 53H4.5l-.09-2.05L6 50h49v3Z'
            opacity={0.15}
          />
          <path
            stroke='#204ECD'
            strokeMiterlimit={10}
            d='M4.5 45V8.5c0-1.1.9-2 2-2h51c1.1 0 2 .9 2 2V24M59.5 30v25.5c0 1.1-.9 2-2 2h-51c-1.1 0-2-.9-2-2V50'
          />
          <path
            stroke='#204ECD'
            strokeMiterlimit={10}
            d='M23.88 34.5H9.5v10.33l-7 4.67h52v-15H40.06M40.17 29.5H61.5l-7-4.67V14.5h-45v15h14.36'
          />
          <path
            fill='#183A9C'
            d='M40.5 32c0 .34-.02.67-.05 1H59.5v-2.1L58 30H40.29c.14.65.21 1.31.21 2ZM23.5 32c0-.69.08-1.35.21-2H9v3h14.55c-.03-.33-.05-.66-.05-1Z'
            opacity={0.15}
          />
          <path
            stroke='#204ECD'
            strokeMiterlimit={10}
            d='M32 40.5a8.5 8.5 0 1 0 0-17 8.5 8.5 0 0 0 0 17Z'
          />
          <path
            stroke='#204ECD'
            strokeMiterlimit={10}
            d='m37 29-6.5 6.5L28 33'
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

SvgConversationSuccessBlue64.displayName = 'SvgConversationSuccessBlue64'
export default SvgConversationSuccessBlue64
