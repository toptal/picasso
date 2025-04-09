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
const SvgBankWire24 = forwardRef(function SvgBankWire24(
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
      viewBox='0 0 32 32'
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
      <path d='M2 26h28v4H2v-4Zm1 1v2h26v-2H3ZM2 8l14-6 14 6v3H2V8Zm1 .66V10h26V8.66L16 3.087 3 8.659ZM4 12h6v13H4V12Zm1 1v11h4V13H5Zm8-1h6v13h-6V12Zm1 1v11h4V13h-4Zm8-1h6v13h-6V12Zm1 1v11h4V13h-4Z' />
    </svg>
  )
})

SvgBankWire24.displayName = 'SvgBankWire24'
export default SvgBankWire24
