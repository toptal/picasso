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
const SvgCurrencyNote24 = forwardRef(function SvgCurrencyNote24(
  props: Props,
  ref: Ref<SVGSVGElement>
) {
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
        d='M0 12v7h24V5H0v7m4-5.884c0 .309-.132.801-.32 1.189-.326.671-.945 1.248-1.605 1.493-.277.103-.724.2-.925.201L1 9V6h3v.116m15 .068c0 .287.15.953.298 1.318a4.114 4.114 0 0 0 2.2 2.2c.365.148 1.031.298 1.318.298H23v3.989l-.31.027a4.046 4.046 0 0 0-3.14 1.964c-.291.487-.55 1.351-.55 1.836V18H5v-.184c0-.287-.15-.953-.298-1.318-.27-.672-.837-1.381-1.417-1.775a4.242 4.242 0 0 0-1.975-.707L1 13.989V10h.184c.287 0 .953-.15 1.318-.298a4.114 4.114 0 0 0 2.2-2.2C4.85 7.137 5 6.471 5 6.184V6h14v.184M23 7.5V9h-.142c-.224 0-.713-.113-1.008-.233-.645-.263-1.214-.807-1.529-1.464-.209-.436-.262-.617-.304-1.033L19.989 6H23v1.5m-11.567.54c-.59.094-1.212.34-1.702.672-.776.528-1.337 1.325-1.601 2.277-.096.348-.108.46-.108 1.011 0 .553.012.663.11 1.017a4.046 4.046 0 0 0 2.388 2.698c1.814.722 3.942-.005 4.924-1.682 1.059-1.809.541-4.155-1.175-5.321a4.76 4.76 0 0 0-1.311-.592c-.386-.094-1.175-.136-1.525-.08m1.323 1.057c.337.092.839.35 1.117.574C14.554 10.219 15 11.14 15 12c0 .781-.359 1.603-.948 2.173-1.083 1.047-2.829 1.102-3.972.124-.456-.39-.866-1.05-1.005-1.617-.069-.282-.07-1.075-.001-1.36.079-.326.414-.99.621-1.232a3.169 3.169 0 0 1 1.808-1.048c.267-.049.988-.016 1.253.057m-11.19 5.965c.228.043.466.126.752.265.367.178.464.248.786.569.321.322.391.419.569.786.195.401.327.888.327 1.202V18H1v-3h.116c.063 0 .266.028.45.062M23 16.5V18h-3.011l.028-.27c.042-.419.095-.597.312-1.048.177-.37.243-.461.566-.782.276-.275.443-.403.685-.528.468-.241.861-.354 1.27-.367L23 15v1.5'
      />
    </svg>
  )
})

SvgCurrencyNote24.displayName = 'SvgCurrencyNote24'
export default SvgCurrencyNote24
