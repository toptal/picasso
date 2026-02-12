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
const SvgAvailabilityUnavailableMinor24 = forwardRef(
  function SvgAvailabilityUnavailableMinor24(
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
          d='M11.32 3.025c-2.183.2-4.045 1.046-5.574 2.534-.794.772-1.344 1.521-1.805 2.46-.66 1.342-.92 2.467-.92 3.981 0 1.514.26 2.639.92 3.981.46.937 1.008 1.684 1.805 2.462a8.949 8.949 0 0 0 11.599.788c.558-.412 1.474-1.328 1.886-1.886a8.977 8.977 0 0 0 0-10.69c-.39-.528-1.308-1.452-1.831-1.842a9.001 9.001 0 0 0-4.1-1.714c-.393-.06-1.627-.107-1.98-.074M13.229 4.1c1.379.212 2.896.903 3.883 1.769l.172.151-5.638 5.635-5.637 5.636-.251-.316c-2.293-2.876-2.338-6.879-.11-9.828a9.71 9.71 0 0 1 .71-.791c1.315-1.319 2.971-2.11 4.842-2.314.456-.05 1.525-.019 2.029.058m5.153 3.107a7.925 7.925 0 0 1 1.518 3.576 7.998 7.998 0 0 1-4.4 8.401 7.928 7.928 0 0 1-8.494-.957l-.294-.239 5.632-5.632c4.511-4.511 5.643-5.623 5.687-5.587.03.025.188.222.351.438'
        />
      </svg>
    )
  }
)

SvgAvailabilityUnavailableMinor24.displayName =
  'SvgAvailabilityUnavailableMinor24'
export default SvgAvailabilityUnavailableMinor24
