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
const SvgPendingReturn16 = forwardRef(function SvgPendingReturn16(
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
        d='M6.32.136C4.646.304 3.006 1.196 1.938 2.52.912 3.792.386 5.449.505 7.034c.122 1.633.759 3.034 1.894 4.167a6.393 6.393 0 0 0 2.088 1.413.535.535 0 0 1 .153.078 11.57 11.57 0 0 1-.746.255c-.411.132-.746.252-.747.267 0 .033.286.895.304.913.015.014 3.164-1.006 3.199-1.036.021-.019-.981-3.157-1.024-3.206-.011-.013-.229.046-.485.129l-.466.151.265.813c.145.447.259.819.252.825-.02.02-.412-.144-.716-.299a5.51 5.51 0 0 1-2.955-5.428 5.497 5.497 0 0 1 2.688-4.212C5.688.982 7.573.863 9.176 1.552c.61.262 1.152.625 1.647 1.101a5.445 5.445 0 0 1 1.674 4.174c-.014.348-.056.714-.084.742a2.823 2.823 0 0 1-.362-.192l-.351-.203-1.883 1.083A188.403 188.403 0 0 0 7.9 9.367c-.026.02-.033.494-.033 2.208v2.181l.073.052a455.53 455.53 0 0 0 3.706 2.136c.054.028.244-.076 1.967-1.069l1.907-1.101-.001-2.2-.001-2.201-1.067-.613-1.093-.628c-.015-.009-.004-.118.027-.267.088-.428.118-.765.116-1.305a6.193 6.193 0 0 0-.661-2.813C11.851 1.724 9.85.338 7.627.135A8.769 8.769 0 0 0 6.32.136m.053 4.623v2.388h3.68V6.133H7.387L7.38 4.26l-.007-1.873-.5-.008-.5-.007v2.387m6.467 4.227c.616.355 1.129.654 1.14.664.011.011-.123.101-.297.2l-.318.179-1.151-.665-1.151-.666.262-.152c.144-.084.286-.167.315-.186.029-.019.059-.031.067-.027l1.133.653m-1.638.948a30.8 30.8 0 0 1 1.137.673c.003.011-.139.102-.317.203-.311.178-.325.183-.392.143l-1.15-.66c-.594-.341-1.084-.623-1.088-.627a8.496 8.496 0 0 1 .664-.385 50.1 50.1 0 0 1 1.146.653m-.981 1.359.977.56.001 1.342.001 1.342-.14-.08a1071.9 1071.9 0 0 1-1.153-.664l-1.014-.583-.007-1.34-.006-1.341.181.102 1.16.662m4.263 1.914c-.014.013-.53.316-1.147.673l-1.124.649v-2.677l1.14-.658 1.14-.657.007 1.323c.004.745-.003 1.334-.016 1.347'
      />
    </svg>
  )
})

SvgPendingReturn16.displayName = 'SvgPendingReturn16'
export default SvgPendingReturn16
