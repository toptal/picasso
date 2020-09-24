import React, { forwardRef, Ref } from 'react'
import cx from 'classnames'
import { withStyles } from '@material-ui/core/styles'
import { StandardProps } from '@toptal/picasso-shared'

import kebabToCamelCase from '../utils/kebab-to-camel-case'
import styles from './styles'
const BASE_SIZE = 16

type ScaleType = 1 | 2 | 3 | 4
export interface Props extends StandardProps {
  scale?: ScaleType
  color?: string
  base?: number
}
const SvgCalendarReminder16 = forwardRef(function SvgCalendarReminder16(
  props: Props,
  ref: Ref<SVGSVGElement>
) {
  const {
    classes: availableClasses,
    className,
    style = {},
    color,
    scale,
    base
  } = props
  const classes = [availableClasses.root, className]
  const scaledSize = base || BASE_SIZE * Math.ceil(scale || 1)
  const colorClassName = kebabToCamelCase(`${color}`)

  if (availableClasses[colorClassName]) {
    classes.push(availableClasses[colorClassName])
  }

  const svgStyle = {
    minWidth: `${scaledSize}px`,
    minHeight: `${scaledSize}px`,
    ...style
  }

  return (
    <svg
      viewBox='0 0 16 16'
      className={cx(...classes)}
      style={svgStyle}
      ref={ref}
    >
      <path d='M8 1.041V0h1v1.073A5 5 0 0113.271 6.9l-.955 5.416c-.038.218.187.54.402.579l-.174.984L1.718 11.97l.17-.985c.226.038.541-.183.58-.405l.955-5.417A5.002 5.002 0 018 1.042zm3.331 11.1l.956-5.416a4 4 0 00-7.879-1.39l-.955 5.417c-.03.17-.094.33-.184.476l8.074 1.423a1.345 1.345 0 01-.012-.51zm-5.358 1.472l.985.174a1 1 0 101.97.347l.985.174a2 2 0 11-3.94-.695zM1.251 3.7l.843.538a6.977 6.977 0 00-.988 2.546 6.977 6.977 0 00.058 2.731l-.976.217a7.977 7.977 0 01-.066-3.121 7.977 7.977 0 011.13-2.91zm13.498 8.6l-.843-.538c.49-.768.826-1.629.988-2.546a6.977 6.977 0 00-.058-2.731l.976-.217a7.977 7.977 0 01.066 3.121 7.977 7.977 0 01-1.13 2.91z' />
    </svg>
  )
})

SvgCalendarReminder16.displayName = 'SvgCalendarReminder16'
export default withStyles(styles)(SvgCalendarReminder16)
