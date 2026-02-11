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
const SvgRecognize16 = forwardRef(function SvgRecognize16(
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
        d='M4.467.031a5.041 5.041 0 0 0-3.453 1.956A4.754 4.754 0 0 0 .281 3.36a4.978 4.978 0 0 0 1.184 5.169c.142.142.32.305.396.363L2 8.998V16l1.486-.991A56.395 56.395 0 0 1 5 14.018c.015 0 .696.446 1.514.991L8 16V8.998l.139-.106c.076-.058.254-.221.396-.363A5.001 5.001 0 0 0 10 4.995a5.11 5.11 0 0 0-.707-2.555A5.013 5.013 0 0 0 4.467.031m1.375 1.058c.351.082.623.179.945.34 1.091.543 1.867 1.554 2.137 2.784.071.326.071 1.248 0 1.574-.286 1.305-1.149 2.37-2.336 2.882A3.826 3.826 0 0 1 5 8.993a3.897 3.897 0 0 1-2.842-1.189 4.074 4.074 0 0 1-1.082-2.017c-.071-.326-.071-1.248 0-1.574A4.074 4.074 0 0 1 2.997 1.54a4.402 4.402 0 0 1 1.416-.499c.279-.043 1.167-.013 1.429.048m7.145 8.924v1h-2V12h2v2H14v-2h2v-.987h-2v-2h-1.013v1m-9.614-.29a4.946 4.946 0 0 0 3.254 0l.313-.111c.044-.017.047.101.047 2.238 0 1.241-.006 2.257-.014 2.257-.007 0-.448-.29-.98-.645A24.242 24.242 0 0 0 5 12.818c-.015 0-.462.29-.993.644-.532.355-.973.645-.98.645-.008 0-.014-1.016-.014-2.257 0-2.137.003-2.255.047-2.238l.313.111'
      />
    </svg>
  )
})

SvgRecognize16.displayName = 'SvgRecognize16'
export default SvgRecognize16
