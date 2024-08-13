import type { Ref } from 'react'
import React, { forwardRef } from 'react'
import { twMerge } from '@toptal/picasso-tailwind-merge'
import type { StandardProps } from '@toptal/picasso-shared'
import { kebabToCamelCase } from '@toptal/picasso-utils'

import { classes } from './styles'
const BASE_SIZE = 16

type ScaleType = 1 | 2 | 3 | 4
export interface Props extends StandardProps {
  scale?: ScaleType
  color?: string
  base?: number
}
const SvgSlack16 = forwardRef(function SvgSlack16(
  props: Props,
  ref: Ref<SVGSVGElement>
) {
  const {
    className,
    style = {},
    color,
    scale,
    base,
    'data-testid': testId,
  } = props
  const classNames = ['PicassoSvgSlack16', classes.root]
  const scaledSize = base || BASE_SIZE * Math.ceil(scale || 1)
  const colorClassName = kebabToCamelCase(`${color}`)

  if (classes[colorClassName]) {
    classNames.push(classes[colorClassName])
  }
  if (className) {
    classNames.push(className)
  }

  const svgStyle = {
    minWidth: `${scaledSize}px`,
    minHeight: `${scaledSize}px`,
    ...style,
  }

  return (
    <svg
      viewBox='0 0 16 16'
      className={twMerge(...classNames)}
      style={svgStyle}
      ref={ref}
      data-testid={testId}
    >
      <path d='M3.361 10.11c0 .926-.755 1.681-1.68 1.681-.925 0-1.681-.755-1.681-1.68C0 9.186.756 8.43 1.68 8.43h1.681v1.68Zm.848 0c0-.924.755-1.68 1.68-1.68.925 0 1.681.756 1.681 1.68v4.21c0 .924-.756 1.68-1.68 1.68-.926 0-1.681-.756-1.681-1.68v-4.21Zm1.68-6.749c-.925 0-1.68-.755-1.68-1.68C4.209.756 4.964 0 5.889 0 6.814 0 7.57.756 7.57 1.68v1.681H5.89Zm0 .848c.925 0 1.681.755 1.681 1.68 0 .925-.756 1.681-1.68 1.681H1.68C.757 7.57 0 6.814 0 5.89c0-.926.756-1.681 1.68-1.681h4.21Zm6.75 1.68c0-.925.755-1.68 1.68-1.68.925 0 1.681.755 1.681 1.68 0 .925-.756 1.681-1.68 1.681h-1.681V5.89Zm-.848 0c0 .925-.755 1.681-1.68 1.681-.925 0-1.681-.756-1.681-1.68V1.68C8.43.757 9.186 0 10.11 0c.926 0 1.681.756 1.681 1.68v4.21Zm-1.68 6.75c.925 0 1.68.755 1.68 1.68 0 .925-.755 1.681-1.68 1.681-.925 0-1.681-.756-1.681-1.68v-1.681h1.68Zm0-.848c-.925 0-1.681-.755-1.681-1.68 0-.925.756-1.681 1.68-1.681h4.21c.924 0 1.68.756 1.68 1.68 0 .926-.756 1.681-1.68 1.681h-4.21Z' />
    </svg>
  )
})

SvgSlack16.displayName = 'SvgSlack16'
export default SvgSlack16
