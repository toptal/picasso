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
const SvgCalendarReminder24 = forwardRef(function SvgCalendarReminder24(
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
  const classNames = ['PicassoSvgCalendarReminder24', classes.root]
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
      <path d='M12 2.037V0h1v2.105a8.5 8.5 0 0 1 7.305 9.91l-1.302 7.385a1 1 0 0 0 .81 1.159l-.173.984L.93 18.244l.173-.985a1 1 0 0 0 1.159-.811l1.302-7.386A8.502 8.502 0 0 1 12 2.037Zm6.018 17.19 1.302-7.387A7.5 7.5 0 1 0 4.548 9.236l-1.302 7.386a1.99 1.99 0 0 1-.437.938l15.299 2.698a1.99 1.99 0 0 1-.09-1.032Zm-8.486 1.825.086-.492.985.174-.087.492a1.5 1.5 0 1 0 2.955.521l.087-.492.984.173-.086.493a2.5 2.5 0 0 1-4.924-.869ZM1.877 5.58l.843.538a10.965 10.965 0 0 0-1.553 4.001 10.965 10.965 0 0 0 .09 4.291l-.975.217a11.965 11.965 0 0 1-.1-4.681 11.965 11.965 0 0 1 1.695-4.366Zm20.246 12.899-.843-.538a10.965 10.965 0 0 0 1.553-4.002c.254-1.441.22-2.893-.09-4.29l.975-.218c.34 1.526.377 3.11.1 4.682a11.965 11.965 0 0 1-1.695 4.366Z' />
    </svg>
  )
})

SvgCalendarReminder24.displayName = 'SvgCalendarReminder24'
export default SvgCalendarReminder24
