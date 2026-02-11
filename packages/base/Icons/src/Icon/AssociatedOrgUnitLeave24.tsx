import type { Ref } from 'react'
import React, { forwardRef } from 'react'
import type { StandardProps } from '@toptal/picasso-shared'
import { twMerge } from '@toptal/picasso-tailwind-merge'

import { getColorClass } from './styles'

const BASE_SIZE = 24

type ScaleType = 1 | 2 | 3 | 4
export interface Props extends StandardProps {
  scale?: ScaleType
  color?: string
  base?: number
  classes?: {
    root?: string
  }
}
const SvgAssociatedOrgUnitLeave24 = forwardRef(
  function SvgAssociatedOrgUnitLeave24(props: Props, ref: Ref<SVGSVGElement>) {
    const {
      classes,
      className,
      style = {},
      color,
      scale,
      base,
      'data-testid': testId,
    } = props
    const scaledSize = base || BASE_SIZE * Math.ceil(scale || 1)
    const svgStyle = {
      minWidth: `${scaledSize}px`,
      minHeight: `${scaledSize}px`,
      ...style,
    }

    return (
      <svg
        fill='none'
        viewBox='0 0 24 24'
        className={twMerge(
          'fill-current inline-block text-inherit h-[1em] align-[-.125em]',
          classes?.root,
          className,
          getColorClass(color)
        )}
        style={svgStyle}
        ref={ref}
        data-testid={testId}
      >
        <path
          fillRule='evenodd'
          d='M10.78 2.026c-2.601.211-4.906 1.262-6.699 3.055C2.447 6.715 1.46 8.696 1.093 11.08c-.099.646-.099 2.194 0 2.84.367 2.384 1.354 4.365 2.988 5.999 1.633 1.633 3.614 2.62 5.999 2.988.623.096 2.224.097 2.852 0 1.684-.257 3.193-.844 4.508-1.753.428-.295.48-.336.48-.373 0-.023-.422-.591-.558-.751-.014-.016-.15.063-.304.175-1.171.857-2.651 1.458-4.19 1.702-.629.1-2.11.099-2.728-.001-2.048-.332-3.781-1.18-5.194-2.545-1.604-1.548-2.565-3.45-2.871-5.681-.068-.49-.068-1.87 0-2.36a9.42 9.42 0 0 1 .983-3.153C4.936 4.482 9.023 2.442 13.12 3.144c1.477.253 2.794.825 4.154 1.805.059.042.105 0 .357-.328.159-.207.289-.391.288-.409 0-.017-.158-.142-.35-.276a10.45 10.45 0 0 0-5.229-1.894 12.064 12.064 0 0 0-1.56-.016m7.37 6.124-.35.35 1.75 1.75L21.3 12H10v1h11.3l-1.751 1.751-1.75 1.75.351.349.351.349 2.349-2.349 2.35-2.35-2.35-2.35L18.5 7.8l-.35.35'
        />
      </svg>
    )
  }
)

SvgAssociatedOrgUnitLeave24.displayName = 'SvgAssociatedOrgUnitLeave24'
export default SvgAssociatedOrgUnitLeave24
