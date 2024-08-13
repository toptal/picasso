import type { Ref } from 'react'
import React, { forwardRef } from 'react'
import { twMerge } from '@toptal/picasso-tailwind-merge'
import type { StandardProps } from '@toptal/picasso-shared'
import { kebabToCamelCase } from '@toptal/picasso-utils'

import { classes } from './styles'
const BASE_SIZE = 24

type ScaleType = 1 | 2 | 3 | 4
export interface Props extends StandardProps {
  scale?: ScaleType
  color?: string
  base?: number
}
const SvgEyeHidden24 = forwardRef(function SvgEyeHidden24(
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
  const classNames = ['PicassoSvgEyeHidden24', classes.root]
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
      viewBox='0 0 24 24'
      className={twMerge(...classNames)}
      style={svgStyle}
      ref={ref}
      data-testid={testId}
    >
      <path d='m21.5 1.793.707.707L2.5 22.207l-.707-.707L21.5 1.793Zm-2.143 4.97C20.976 8.057 22.524 9.803 24 12c-3.582 5.333-7.582 8-12 8-1.647 0-3.236-.37-4.766-1.112l.754-.753a9.795 9.795 0 0 0 3.717.86L12 19c3.845 0 7.395-2.241 10.668-6.833l.117-.167-.117-.167c-1.297-1.82-2.637-3.27-4.022-4.357l.711-.712ZM12 4c1.647 0 3.236.37 4.767 1.112l-.755.753a9.795 9.795 0 0 0-3.717-.86L12 5C8.155 5 4.605 7.241 1.332 11.833L1.214 12l.118.167c1.297 1.82 2.637 3.27 4.023 4.358l-.711.712C3.024 15.945 1.477 14.199 0 12c3.582-5.333 7.582-8 12-8Zm4.435 5.688a5 5 0 0 1-6.746 6.746l.75-.75a4 4 0 0 0 5.246-5.244l.75-.752ZM12 7c.834 0 1.621.204 2.313.566l-.751.75a4 4 0 0 0-5.245 5.245l-.751.752A5 5 0 0 1 12 7Z' />
    </svg>
  )
})

SvgEyeHidden24.displayName = 'SvgEyeHidden24'
export default SvgEyeHidden24
