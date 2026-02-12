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
const SvgReturned16 = forwardRef(function SvgReturned16(
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
        d='M5.32 1.581 2.68 3.107l-.007 3.08-.007 3.081 2.667 1.54 2.666 1.54 2.667-1.537 2.667-1.536V3.107l-2.65-1.527C9.226.74 8.017.054 7.997.054c-.021 0-1.225.688-2.677 1.527m4.585.706c1.036.597 1.887 1.098 1.89 1.111.007.036-1.345.815-1.401.808C10.346 4.2 6.615 2.022 6.615 2c-.001-.018 1.338-.795 1.375-.798.017-.001.878.487 1.915 1.085m-2.39 1.406c1.028.602 1.87 1.1 1.87 1.107.002.018-1.351.8-1.384.8-.026 0-3.758-2.148-3.796-2.185-.027-.026 1.338-.826 1.398-.82.024.003.884.497 1.912 1.098m4.832 2.785v2.211l-1.434.826-1.92 1.107-.487.281.007-2.217.007-2.218 1.907-1.1c1.048-.605 1.909-1.1 1.913-1.101.004 0 .007.995.007 2.211M5.6 5.381l1.88 1.087.007 2.217.007 2.216-1.901-1.097-1.9-1.098L3.687 6.5c-.004-1.214.002-2.206.013-2.206s.866.49 1.9 1.087m-2.087 7.386-1.06 1.06 1.075 1.075 1.076 1.075.342-.364.343-.363-.464-.465-.464-.465h8.466v-.987H4.361l.473-.473.473-.474-.341-.34c-.187-.186-.352-.339-.366-.339-.015 0-.504.477-1.087 1.06'
      />
    </svg>
  )
})

SvgReturned16.displayName = 'SvgReturned16'
export default SvgReturned16
