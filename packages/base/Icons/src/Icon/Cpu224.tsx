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
const SvgCpu224 = forwardRef(function SvgCpu224(
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
        d='M11.002.045C6.966.377 3.318 2.78 1.401 6.371a12.277 12.277 0 0 0-1.386 5.054L-.012 12h1l.028-.51c.188-3.505 1.936-6.625 4.804-8.578a10.96 10.96 0 0 1 8.033-1.749c2.256.383 4.262 1.427 5.909 3.075.539.538 1.233 1.373 1.397 1.68C21.203 6 21.2 6 20.101 6H19v1h4V3h-.999l-.01 1.169-.011 1.169-.197-.279c-1.385-1.96-3.452-3.53-5.723-4.347a12.237 12.237 0 0 0-5.058-.667M10 6v1H7v3H5v1h2v2H5v1h2v3h3v2h1v-2h2v2h1v-2h3v-3h2v-1h-2v-2h2v-1h-2V7h-3V5h-1v2h-2V5h-1v1m6 6v4H8V8h8v4m6.984.51c-.154 2.879-1.318 5.432-3.384 7.423-1.994 1.92-4.515 2.972-7.32 3.053A10.758 10.758 0 0 1 5.9 21.14a10.446 10.446 0 0 1-1.826-1.532c-.407-.422-1.104-1.285-1.233-1.526C2.797 18 2.8 18 3.899 18H5v-1H1v4h1v-2.373l.207.297c.336.482.844 1.081 1.316 1.553 1.851 1.852 4.144 3.002 6.797 3.409.487.075.751.089 1.64.091 1.106.002 1.405-.024 2.324-.201 3.228-.62 6.098-2.584 7.869-5.382a12.101 12.101 0 0 0 1.832-5.819l.027-.575h-1l-.028.51'
      />
    </svg>
  )
})

SvgCpu224.displayName = 'SvgCpu224'
export default SvgCpu224
