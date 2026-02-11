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
const SvgImageGallery24 = forwardRef(function SvgImageGallery24(
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
        d='M0 11.5V21h19V2H0v9.5m18-5.578c0 2.328-.01 2.917-.05 2.892a76.906 76.906 0 0 1-1.241-.984 41.94 41.94 0 0 0-1.241-.972c-.036-.014-6.416 7.105-7.969 8.892l-.121.139-1.959-.979-1.959-.979-1.16.777a99.01 99.01 0 0 1-1.23.816c-.067.037-.07-.272-.07-6.243V3h17v2.922M21 3.5V4h2v15h-2v1h3V3h-3v.5M5.503 6.04a3.19 3.19 0 0 0-1.8 1.04c-.716.837-.897 2.02-.469 3.071a3.046 3.046 0 0 0 1.615 1.615 2.982 2.982 0 0 0 3.266-.651 2.982 2.982 0 0 0 .131-4.095c-.349-.396-.97-.781-1.49-.923-.265-.073-.986-.106-1.253-.057m.88 1.003c.802.147 1.456.829 1.584 1.652C8.153 9.894 7.209 11 6 11a2.016 2.016 0 0 1-1.967-1.695c-.1-.642.099-1.244.563-1.709.489-.488 1.102-.678 1.787-.553M16.784 9.17l1.215.97v4.93L18 20H1V16.773l1.266-.844 1.266-.843 2.043 1.021 2.042 1.022.122-.143c.279-.328 7.802-8.784 7.816-8.785.008-.001.561.435 1.229.969'
      />
    </svg>
  )
})

SvgImageGallery24.displayName = 'SvgImageGallery24'
export default SvgImageGallery24
