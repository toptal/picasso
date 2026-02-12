import type { Ref } from 'react'
import React, { forwardRef } from 'react'
import type { StandardProps } from '@toptal/picasso-shared'
import { twMerge } from '@toptal/picasso-tailwind-merge'

import { getColorClass } from './styles'

const BASE_SIZE = 16

type ScaleType = 1 | 2 | 3 | 4
export interface Props extends StandardProps {
  scale?: ScaleType
  color?: string
  base?: number
  classes?: {
    root?: string
  }
}
const SvgAvailabilityUnavailableMinor16 = forwardRef(
  function SvgAvailabilityUnavailableMinor16(
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
        viewBox='0 0 16 16'
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
          d='M7.547 2.016a6.035 6.035 0 0 0-2.2.612C3.088 3.735 1.749 6.185 2.04 8.675a6.012 6.012 0 0 0 5.285 5.285c2.497.292 4.955-1.058 6.062-3.329 1.328-2.727.437-5.96-2.107-7.648a6.101 6.101 0 0 0-2.4-.915 9.645 9.645 0 0 0-1.333-.052m1.428 1.087c.418.089.803.224 1.187.415.283.14.731.421.911.57l.073.06-3.501 3.5-3.5 3.5-.137-.181A5.061 5.061 0 0 1 3.1 8.962c-.066-.309-.072-.384-.072-.962-.001-.551.006-.664.061-.933.432-2.143 2.115-3.729 4.271-4.026a7.64 7.64 0 0 1 .733-.015c.478.008.608.019.882.077m3.188 2.177c.347.516.6 1.118.737 1.758.067.312.072.38.072.975-.001.592-.006.666-.072.975-.331 1.551-1.31 2.815-2.713 3.504a4.931 4.931 0 0 1-5.141-.491l-.195-.146 3.501-3.5 3.5-3.501.061.073c.034.04.146.199.25.353'
        />
      </svg>
    )
  }
)

SvgAvailabilityUnavailableMinor16.displayName =
  'SvgAvailabilityUnavailableMinor16'
export default SvgAvailabilityUnavailableMinor16
