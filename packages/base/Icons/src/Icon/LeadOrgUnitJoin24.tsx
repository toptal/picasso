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
const SvgLeadOrgUnitJoin24 = forwardRef(function SvgLeadOrgUnitJoin24(
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
  const classNames = ['PicassoSvgLeadOrgUnitJoin24', classes.root]
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
      fill='none'
      viewBox='0 0 24 24'
      className={twMerge(...classNames)}
      style={svgStyle}
      ref={ref}
      data-testid={testId}
    >
      <path d='m13 1 9.96 5.75v11.5L13 24l-7.135-4.119.574-.825L13 22.844l8.959-5.172V7.327L13 2.155 6.438 5.943l-.573-.824L13 1ZM9.5 7.793l4.707 4.707L9.5 17.207l-.707-.707 3.5-3.5H1v-1h11.293l-3.5-3.5.707-.707Z' />
    </svg>
  )
})

SvgLeadOrgUnitJoin24.displayName = 'SvgLeadOrgUnitJoin24'
export default SvgLeadOrgUnitJoin24
