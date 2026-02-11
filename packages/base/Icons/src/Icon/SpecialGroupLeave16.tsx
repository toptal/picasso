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
const SvgSpecialGroupLeave16 = forwardRef(function SvgSpecialGroupLeave16(
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
        d='M6.828 2.873a122.304 122.304 0 0 1-1.184 2.37c-.017.017-1.171.195-2.564.396s-2.566.374-2.606.383c-.068.017.018.106 1.513 1.565.872.85 1.726 1.68 1.897 1.843l.311.297-.446 2.605a138.842 138.842 0 0 0-.436 2.617c.006.006 1.063-.542 2.349-1.218L8 12.502l1.03.542c.567.299 1.04.546 1.051.551.018.007-.489-1.373-.512-1.394a47.18 47.18 0 0 0-1.568-.814c-.016 0-.774.391-1.684.869-.909.479-1.66.863-1.668.856-.011-.011.568-3.474.615-3.677.007-.03-.419-.463-1.349-1.369a71.296 71.296 0 0 1-1.349-1.334c.008-.009 3.675-.545 3.723-.545.011 0 .397-.762.857-1.694C7.606 3.562 7.99 2.8 8 2.8c.009 0 .265.501.567 1.112.483.978.553 1.105.574 1.047l.241-.644.217-.579-.791-1.601A54.546 54.546 0 0 0 8 .533c-.01 0-.537 1.053-1.172 2.34m4.305 2.274-.346.347 1.253 1.253L13.293 8H6v1.013h7.266l-1.239 1.24-1.24 1.24.36.36.36.36 1.853-1.853 1.853-1.853-1.853-1.854A173.629 173.629 0 0 0 11.493 4.8a6.68 6.68 0 0 0-.36.347'
      />
    </svg>
  )
})

SvgSpecialGroupLeave16.displayName = 'SvgSpecialGroupLeave16'
export default SvgSpecialGroupLeave16
