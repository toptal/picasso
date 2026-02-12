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
const SvgAvailabilityUnavailable16 = forwardRef(
  function SvgAvailabilityUnavailable16(props: Props, ref: Ref<SVGSVGElement>) {
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
          d='M7.467.017a8.028 8.028 0 0 0-5.859 3.176C.799 4.26.296 5.477.073 6.906c-.082.523-.082 1.665 0 2.188.342 2.194 1.403 3.995 3.122 5.299 1.062.806 2.286 1.312 3.711 1.534.523.082 1.665.082 2.188 0 1.944-.303 3.596-1.179 4.836-2.565 1.1-1.229 1.735-2.587 1.997-4.268.082-.523.082-1.665 0-2.188-.222-1.425-.728-2.649-1.534-3.711A7.994 7.994 0 0 0 9 .066 12.585 12.585 0 0 0 7.467.017M9.04 1.078a7.067 7.067 0 0 1 2.898 1.14c.327.225.621.456.621.489.001.035-9.817 9.853-9.852 9.852-.033 0-.264-.294-.489-.621a7.05 7.05 0 0 1-1.144-2.925c-.036-.237-.047-.467-.047-1.013 0-.807.032-1.084.2-1.747a7.006 7.006 0 0 1 5.026-5.026c.22-.056.544-.121.72-.144l.4-.054c.203-.028 1.401.008 1.667.049m4.427 2.551a7.09 7.09 0 0 1 1.459 3.358c.068.442.067 1.59-.002 2.04a7.016 7.016 0 0 1-5.487 5.823c-.637.136-1.585.184-2.197.111a7.176 7.176 0 0 1-2.413-.723 5.994 5.994 0 0 1-1.011-.636c-.373-.28-.376-.282-.376-.312 0-.033 9.821-9.85 9.853-9.849.015 0 .093.085.174.188'
        />
      </svg>
    )
  }
)

SvgAvailabilityUnavailable16.displayName = 'SvgAvailabilityUnavailable16'
export default SvgAvailabilityUnavailable16
