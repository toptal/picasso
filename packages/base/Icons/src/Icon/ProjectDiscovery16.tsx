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
const SvgProjectDiscovery16 = forwardRef(function SvgProjectDiscovery16(
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
  const classNames = ['PicassoSvgProjectDiscovery16', classes.root]
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
      viewBox='0 0 16 16'
      className={twMerge(...classNames)}
      style={svgStyle}
      ref={ref}
      data-testid={testId}
    >
      <path
        fillRule='evenodd'
        d='M8.402.03A7.046 7.046 0 0 0 4.8 1.409c-.404.299-1.092.987-1.391 1.391-.836 1.128-1.284 2.343-1.388 3.769-.067.909.089 1.969.42 2.861a7.12 7.12 0 0 0 1.154 2.006l.12.142-1.784 1.784-1.784 1.785.353.353.353.353 1.785-1.784 1.784-1.784.142.12c.874.738 2.071 1.285 3.253 1.487a6.99 6.99 0 0 0 5.383-1.301c.402-.299 1.092-.989 1.391-1.391a6.987 6.987 0 0 0 0-8.4c-.299-.402-.989-1.092-1.391-1.391A7.03 7.03 0 0 0 8.402.03M9.84 1.058a6.023 6.023 0 0 1 3.74 2.062c.196.233.562.749.597.841.014.034-.486.039-4.054.039h-4.07v4.107c0 2.467-.009 4.106-.024 4.106-.051 0-.666-.428-.909-.633a6.037 6.037 0 0 1-2.067-3.753 7.261 7.261 0 0 1 0-1.654A6.012 6.012 0 0 1 7.947 1.09a6.295 6.295 0 0 1 1.893-.032m4.892 4.149a5.9 5.9 0 0 1 .259 1.513L15 7l-1.993.007-1.994.007V8h3.894v.066c0 .127-.19.803-.311 1.107a7.982 7.982 0 0 1-.255.567l-.133.26H9.013v.987h2.227c1.225 0 2.227.01 2.227.022 0 .036-.471.482-.707.67a6.074 6.074 0 0 1-2.933 1.268 7.261 7.261 0 0 1-1.654 0c-.322-.046-.982-.202-1.08-.254-.052-.028-.053-.07-.053-3.849 0-2.102.008-3.83.018-3.84.01-.009 1.725-.017 3.812-.017h3.795l.067.22'
      />
    </svg>
  )
})

SvgProjectDiscovery16.displayName = 'SvgProjectDiscovery16'
export default SvgProjectDiscovery16
