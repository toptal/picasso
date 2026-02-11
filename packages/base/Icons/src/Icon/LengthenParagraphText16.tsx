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
const SvgLengthenParagraphText16 = forwardRef(
  function SvgLengthenParagraphText16(props: Props, ref: Ref<SVGSVGElement>) {
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
          d='M6.573 1.733 5.16 3.146l.347.347.346.347 1.073-1.073L8 1.694l1.074 1.073 1.073 1.073.346-.347.347-.347-1.413-1.413C8.649.956 8.007.32 8 .32c-.007 0-.649.636-1.427 1.413M2 6.493v.494h12V6H2v.493m0 3.014V10h12v-.987H2v.494m3.507 3-.347.347 1.42 1.419L8 15.693l1.42-1.42 1.42-1.419-.347-.347-.346-.347-1.073 1.073L8 14.306l-1.074-1.073-1.073-1.073-.346.347'
        />
      </svg>
    )
  }
)

SvgLengthenParagraphText16.displayName = 'SvgLengthenParagraphText16'
export default SvgLengthenParagraphText16
