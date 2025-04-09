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
const SvgDesignerPencil24 = forwardRef(function SvgDesignerPencil24(
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
        d='M11.922 1.232 11.5.569l-.422.663-7 11-.215.338.283.283v.001l.005.005.022.022.087.093c.076.084.187.21.322.374.269.329.63.81.99 1.41C6.294 15.962 7 17.622 7 19.5V24h1v-4h7v4h1v-4.5c0-1.877.705-3.537 1.429-4.743.36-.6.72-1.08.99-1.409a9.238 9.238 0 0 1 .409-.467l.02-.022.005-.005.284-.284-.215-.338-7-11Zm4.65 13.01c-.716 1.192-1.446 2.847-1.557 4.758h-7.03c-.111-1.911-.841-3.566-1.556-4.757a12.982 12.982 0 0 0-1.301-1.798L11 3.217v6.833a2.5 2.5 0 1 0 1 0V3.217l5.872 9.228a12.982 12.982 0 0 0-1.3 1.798ZM11.5 11a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Z'
        clipRule='evenodd'
      />
    </svg>
  )
})

SvgDesignerPencil24.displayName = 'SvgDesignerPencil24'
export default SvgDesignerPencil24
