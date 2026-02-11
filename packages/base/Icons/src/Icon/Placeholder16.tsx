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
const SvgPlaceholder16 = forwardRef(function SvgPlaceholder16(
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
        d='M.987.507v.506H0v2.002l.5-.008L1 3l.007-.993.007-.993.993-.007L3 1l.007-.5.008-.5H.987v.507M5.013.493v.494h1.974V0H5.013v.493m4 0v.494h1.974V0H9.013v.493m4 0v.494h1.974V0h-1.974v.493m2 1.507v.987H16V1.013h-.987V2m-5.4 2.937c-.645.082-1.201.395-1.567.884-.25.334-.412.668-.526 1.086-.104.379-.12.538-.119 1.146.002.513.01.639.06.869.213.987.625 1.612 1.27 1.929.339.167.557.218 1.002.234.8.03 1.334-.167 1.802-.665.376-.4.539-.867.511-1.459-.045-.923-.59-1.559-1.493-1.746a2.507 2.507 0 0 0-.959.01 2.161 2.161 0 0 0-1.001.6 1.102 1.102 0 0 1-.151.148c-.058 0 .027-.711.115-.966.211-.608.658-1.046 1.161-1.138a1.726 1.726 0 0 1 1.389.361.768.768 0 0 0 .158.113c.04-.045.449-.73.452-.757.005-.052-.313-.297-.526-.404-.46-.232-1.009-.317-1.578-.245M0 6v.987h.987V5.013H0V6m4.575-.117-.852.864.292.3c.16.165.299.303.308.307.009.005.234-.216.5-.489l.484-.498v4.62h1.066V5.013l-.473.004-.473.003-.852.863M15.013 6v.987H16V5.013h-.987V6m-4.918 2.082c.379.069.723.326.838.625.086.226.089.586.005.771-.228.507-.715.753-1.346.681a1.19 1.19 0 0 1-.612-.244c-.228-.181-.465-.654-.515-1.027-.017-.126-.014-.133.109-.27.395-.44.96-.638 1.521-.536M0 10v.987h.987V9.013H0V10m15.013 0v.987H16V9.013h-.987V10M0 14v.987h.987v-1.974H0V14m15.013 0v.987H16v-1.974h-.987V14m-14 1.507V16h1.974v-.987H1.013v.494m4 0V16h1.974v-.987H5.013v.494m4 0V16h1.974v-.987H9.013v.494m4 0V16h1.974v-.987h-1.974v.494'
      />
    </svg>
  )
})

SvgPlaceholder16.displayName = 'SvgPlaceholder16'
export default SvgPlaceholder16
