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
const SvgReferralDashboard24 = forwardRef(function SvgReferralDashboard24(
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
  const classNames = ['PicassoSvgReferralDashboard24', classes.root]
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
      <path d='M2.894 16.14a10.015 10.015 0 0 0 7.317 5.7l-.178.985a11.016 11.016 0 0 1-8.05-6.271l.911-.415ZM17.5 9a4.5 4.5 0 0 1 2.168 8.444 5.5 5.5 0 0 1 3.328 4.835L23 22.5h-1a4.5 4.5 0 0 0-8.995-.212L13 22.5h-1a5.501 5.501 0 0 1 3.333-5.057A4.5 4.5 0 0 1 17.5 9Zm0 1a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Zm-11-9a4.5 4.5 0 0 1 2.168 8.444 5.5 5.5 0 0 1 3.328 4.835L12 14.5h-1a4.5 4.5 0 0 0-8.995-.212L2 14.5H1a5.501 5.501 0 0 1 3.333-5.057A4.5 4.5 0 0 1 6.5 1ZM12 1c5.073 0 9.344 3.434 10.615 8.105l-.965.264C20.496 5.123 16.612 2 12 2V1ZM6.5 2a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Z' />
    </svg>
  )
})

SvgReferralDashboard24.displayName = 'SvgReferralDashboard24'
export default SvgReferralDashboard24
