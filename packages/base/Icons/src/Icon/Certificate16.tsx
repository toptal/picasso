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
const SvgCertificate16 = forwardRef(function SvgCertificate16(
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
        'fill-current inline-block text-inherit h-[1em] align-[-.125em]',
        classes?.root,
        className,
        getColorClass(color)
      )}
      style={svgStyle}
      ref={ref}
      data-testid={testId}
    >
      <path d='M14 10.663a3.486 3.486 0 0 1-1.5.337c-.537 0-1.045-.12-1.5-.337v3.165l1.5-.45 1.5.45v-3.165Zm1-.714v5.223l-2.5-.75-2.5.75V9.949a3.5 3.5 0 1 1 5 0ZM1 16H0V0h13v3h-1V1H1v14h8v1H1Zm11.5-6a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z' />
    </svg>
  )
})

SvgCertificate16.displayName = 'SvgCertificate16'
export default SvgCertificate16
