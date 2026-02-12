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
const SvgShoppingBasket16 = forwardRef(function SvgShoppingBasket16(
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
        d='M7.752.028a4.014 4.014 0 0 0-3.445 3.173 7.728 7.728 0 0 0-.057.296c0 .009-.43.017-.956.017-.915.001-.965.004-1.142.064-.482.164-.812.49-.98.967C1.115 4.705 0 13.278 0 13.551c0 1.086.791 2.092 1.868 2.374.206.054.35.055 6.362.055 6.117 0 6.151 0 6.36-.058a2.49 2.49 0 0 0 1.846-2.379c0-.223-.138-1.354-.555-4.547-.304-2.338-.574-4.32-.598-4.405-.128-.445-.459-.805-.918-.997-.15-.063-.192-.066-1.16-.08l-1.003-.015-.064-.297A3.98 3.98 0 0 0 10.627.811 4.622 4.622 0 0 0 9.52.218c-.5-.171-1.268-.253-1.768-.19m1.069 1.039c.896.172 1.698.797 2.102 1.638.122.255.24.62.24.744v.064H8.217c-2.134 0-2.947-.008-2.947-.031 0-.164.188-.681.353-.97.638-1.121 1.906-1.694 3.198-1.445M4.222 5.532c0 .587.012 1.07.028 1.128a.564.564 0 0 0 .292.308.51.51 0 0 0 .601-.209l.07-.12V4.505h6.007l.001 1.041c0 .952.005 1.051.053 1.155a.486.486 0 0 0 .874.047l.078-.132.009-1.056.009-1.055h.846c.528 0 .876.011.926.03.111.042.257.19.291.294.038.115 1.135 8.537 1.134 8.709-.002.671-.522 1.292-1.204 1.436-.294.062-11.742.063-12.035.001a1.467 1.467 0 0 1-1.036-.808c-.186-.378-.193-.51-.076-1.42.451-3.519 1.013-7.794 1.035-7.877a.467.467 0 0 1 .267-.311c.104-.048.2-.053.973-.053l.857-.001v1.027'
      />
    </svg>
  )
})

SvgShoppingBasket16.displayName = 'SvgShoppingBasket16'
export default SvgShoppingBasket16
