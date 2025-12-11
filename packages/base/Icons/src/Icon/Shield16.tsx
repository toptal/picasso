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
const SvgShield16 = forwardRef(function SvgShield16(
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
      viewBox='0 0 16 16'
      className={twMerge(
        'stroke-current inline-block text-inherit h-[1em] align-[-.125em]',
        classes?.root,
        className,
        getColorClass(color)
      )}
      style={svgStyle}
      ref={ref}
      data-testid={testId}
    >
      <path fill-rule="evenodd" clip-rule="evenodd" d="M13.6053 1.31129L7.75847 0.0519744C7.5574 0.00618285 7.35353 0.00611281 7.15246 0.0517642L1.3964 1.27093L1 1.35489V1.76008V7.86008C1 11.0943 2.95283 14.0213 5.9607 15.3286L5.96139 15.3289L7.30139 15.9089L7.5 15.9949L7.69861 15.9089L9.03861 15.3289L9.0393 15.3286C12.0472 14.0213 14 11.0943 14 7.86008V1.80008V1.3963L13.6053 1.31129ZM7.37243 1.02727C7.42845 1.01435 7.48155 1.01435 7.53757 1.02727L7.53756 1.02733L7.54472 1.02887L13 2.20385V7.86008C13 10.6858 11.293 13.2586 8.64109 14.4113L8.6407 14.4115L7.5 14.9053L6.3593 14.4115L6.35891 14.4113C3.707 13.2586 2 10.6858 2 7.86008V2.16527L7.3636 1.02923L7.36362 1.02931L7.37243 1.02727ZM6.85355 9.85355L10.8536 5.85355L10.1464 5.14645L6.5 8.79289L4.85355 7.14645L4.14645 7.85355L6.14645 9.85355L6.5 10.2071L6.85355 9.85355Z" />
    </svg>
  )
})

SvgShield16.displayName = 'SvgShield16'
export default SvgShield16
