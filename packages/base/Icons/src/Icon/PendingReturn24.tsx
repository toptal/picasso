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
const SvgPendingReturn24 = forwardRef(function SvgPendingReturn24(
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
        d='M9.56.043a9.875 9.875 0 0 0-7.325 4.375C1.447 5.598.899 7.061.674 8.58c-.071.481-.071 2.046 0 2.52.265 1.775.905 3.323 1.938 4.694.547.724 1.439 1.579 2.228 2.135.665.468 1.678.971 2.52 1.253l.34.113-1.555.511c-.855.281-1.565.521-1.578.534-.042.041.277.947.327.929.025-.01 1.081-.355 2.346-.767 1.265-.412 2.312-.761 2.326-.776.019-.018-1.268-4.049-1.505-4.714-.012-.033-.144-.005-.449.095a3.762 3.762 0 0 0-.468.176c-.021.019.169.664.454 1.538.27.827.483 1.511.475 1.52-.042.041-1.035-.334-1.533-.58a8.768 8.768 0 0 1-2.826-2.197C1.019 12.345.897 7.839 3.413 4.483c.561-.748 1.481-1.586 2.347-2.139a9.95 9.95 0 0 1 1.88-.881 8.844 8.844 0 0 1 6.66.435c.939.46 1.639.961 2.38 1.702 1.492 1.492 2.372 3.38 2.563 5.5a9.542 9.542 0 0 1-.152 2.546l-.031.147-.65-.378c-.582-.338-.66-.373-.74-.33-.215.115-5.305 3.052-5.44 3.139l-.15.097.01 3.25.01 3.249 2.756 1.59C17.031 23.665 17.641 24 17.75 24c.109 0 .719-.335 2.894-1.59l2.756-1.59V14.293l-1.713-.988-1.714-.987.072-.329c.177-.809.214-1.183.212-2.169-.002-.802-.017-1.045-.091-1.48-.289-1.694-.89-3.108-1.891-4.448-.376-.502-1.382-1.51-1.883-1.884C14.405.523 11.948-.183 9.56.043m.17 6.787.01 3.55 2.73.01 2.73.011V9.4h-4.44V3.28H9.72l.01 3.55m10.064 6.536c1.114.641 2.041 1.178 2.059 1.194.033.029-1.427.893-1.509.893-.053 0-4.104-2.342-4.104-2.373 0-.024 1.442-.87 1.494-.876.019-.002.946.521 2.06 1.162m-2.543 1.477c1.105.639 2.024 1.177 2.041 1.194.018.017-.321.234-.753.482-.679.391-.796.445-.872.408-.354-.174-3.998-2.315-3.995-2.347.006-.045 1.44-.892 1.519-.897.029-.002.956.52 2.06 1.16m5.099 5.419c-.027.025-.905.536-1.95 1.136a545.913 545.913 0 0 0-2.03 1.17l-.131.079.011-2.406.01-2.406 2.06-1.188 2.06-1.187.01 2.378c.008 1.871 0 2.388-.04 2.424m-7.13-3.594 2 1.156.01 2.388c.006 1.313-.001 2.388-.016 2.388-.014 0-.941-.527-2.059-1.17l-2.034-1.17v-2.394c-.001-1.9.009-2.39.049-2.374.027.011.95.541 2.05 1.176'
      />
    </svg>
  )
})

SvgPendingReturn24.displayName = 'SvgPendingReturn24'
export default SvgPendingReturn24
