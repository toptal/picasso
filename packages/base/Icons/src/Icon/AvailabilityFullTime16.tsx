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
const SvgAvailabilityFullTime16 = forwardRef(function SvgAvailabilityFullTime16(
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
        d='M7 .016c-1.111.11-1.852.303-2.703.707A7.52 7.52 0 0 0 .188 5.829a8.03 8.03 0 0 0-.164 2.276c.274 3.079 2.287 5.599 5.229 6.547.76.245 1.825.39 2.514.343L8 14.979v-.992l-.553-.002c-1.052-.003-1.857-.193-2.82-.664a6.334 6.334 0 0 1-2.546-2.245A6.493 6.493 0 0 1 1.08 8.507c-.06-.377-.082-1.269-.041-1.671A6.554 6.554 0 0 1 2.45 3.414a6.533 6.533 0 0 1 4.386-2.375c.402-.041 1.294-.019 1.671.041a6.493 6.493 0 0 1 2.569 1.001 6.505 6.505 0 0 1 1.929 1.967c.185.294.483.902.606 1.236.262.715.415 1.674.382 2.403L13.978 8h1.001l.016-.233c.02-.289-.018-.962-.075-1.354-.188-1.275-.691-2.453-1.504-3.519-.258-.34-.897-.985-1.246-1.26A7.537 7.537 0 0 0 8.464.066C8.162.025 7.227-.007 7 .016m-.013 4.491v2.506H4V8h4V2H6.987v2.507m4.309 5.149c-.427.101-.79.516-.939 1.077-.07.261-.07.962-.001 1.214.161.586.507.967.98 1.079.294.069.565.038.851-.099.299-.143.574-.535.697-.994.081-.303.082-.896.001-1.194-.199-.733-.638-1.117-1.268-1.11a2.1 2.1 0 0 0-.321.027m-3.303 1.081-.686 1.057v.446h1.598l.008.38.007.38.287.008.286.007v-.775h.454v-.507h-.454V9.68h-.814l-.686 1.057m5.507.603.007 1.66.26.008.26.007v-1.714l.085-.079a.76.76 0 0 1 .541-.22c.21-.001.331.048.407.164.041.063.048.171.06.953l.013.881.262.008.261.007-.008-1.007c-.008-.974-.01-1.012-.066-1.115a.725.725 0 0 0-.302-.296c-.074-.04-.153-.05-.387-.05-.273 0-.305.005-.47.083a1.44 1.44 0 0 0-.286.183l-.11.1V9.68h-.534l.007 1.66m-1.576-1.123c.273.151.397.455.416 1.018.024.696-.144 1.129-.488 1.26a.75.75 0 0 1-.533-.032c-.298-.154-.47-.67-.429-1.29.036-.563.222-.912.54-1.014a.782.782 0 0 1 .494.058m-3.017.756v.76H8.41c-.398 0-.493-.007-.482-.035.015-.038.961-1.484.972-1.484.004-.001.007.341.007.759'
      />
    </svg>
  )
})

SvgAvailabilityFullTime16.displayName = 'SvgAvailabilityFullTime16'
export default SvgAvailabilityFullTime16
